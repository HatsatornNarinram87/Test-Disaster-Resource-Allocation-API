import { RedisModel } from "../models/redis_model.js";

function canDeliver(truck, area) {
    const required = area.RequiredResources;
    const available = truck.AvailableResources;

    /*
    "RequiredResources": {
            "food": 200,
            "water": 300
        }
    */
    /*
    "AvailableResources": {
             "food": 250,
             "water": 300
         }
    */
    for (const key in required) {
        if (!available[key]) {
            return { ok: false, reason: "missing_resource" };
        }
        if (available[key] < required[key]) {
            return { ok: false, reason: "partial_resource" };
        }
    }

    return { ok: true };
}

export async function assignTrucks(areas, trucks) {
    const result = [];
    const usedTrucks = new Set();

    // sort by urgency
    areas.sort((a, b) => b.UrgencyLevel - a.UrgencyLevel);

    for (const area of areas) {
        let assigned = false;
        let hasResourceMatch = false;
        let hasTimeMatch = false;

        for (const truck of trucks) {
            if (usedTrucks.has(truck.TruckID)) continue;

            const deliveryCheck = canDeliver(truck, area);

            if (deliveryCheck.ok) {
                hasResourceMatch = true;

                const travelTime = truck.TravelTimeToArea?.[area.AreaID];

                if (
                    typeof travelTime === "number" &&
                    travelTime <= area.TimeConstraint
                ) {
                    hasTimeMatch = true;

                    result.push({
                        AreaID: area.AreaID,
                        TruckID: truck.TruckID,
                        ResourcesDelivered: area.RequiredResources,
                    });

                    usedTrucks.add(truck.TruckID);
                    assigned = true;
                    break;
                }
            }
        }

        if (!assigned) {
            let message = "No available truck";

            if (!hasResourceMatch) {
                message = "Insufficient resources";
            } else if (!hasTimeMatch) {
                message = "No truck can meet time constraint";
            }

            result.push({
                AreaID: area.AreaID,
                Message: message,
            });
        }
    }

    // sort output
    result.sort((a, b) => a.AreaID.localeCompare(b.AreaID));

    // cache in Redis 30 mins
    await RedisModel.insert(
        "assignments",
        JSON.stringify(result),
        "EX",
        1800
    );

    return result;
}