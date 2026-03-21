

function canDeliver(truck, area) {
    try {
        const required = area.requiredResources;
        const available = truck.availableResources;

        for (const resource in required) {
            if (!available[resource] || available[resource] < required[resource]) {
                return false;
            }
        }

        return true;
    } catch (error) {
        throw error;
    }
}

async function assignTrucks(areas, trucks) {
    try {

        const result = [];
        const usedTrucks = [];

        // Sort areas by urgency (highest first)
        areas.sort((a, b) => b.urgency - a.urgency);

        for (const area of areas) {
            let assigned = false;

            for (const truck of trucks) {
                if (usedTrucks.includes(truck.id)) continue;

                if (
                    canDeliver(truck, area) &&
                    truck.travelTime[area.id] <= area.timeConstraint
                ) {
                    result.push({
                        areaId: area.id,
                        truckId: truck.id,
                        resourcesDelivered: area.requiredResources
                    });

                    usedTrucks.push(truck.id); // เก็บ id ลง array
                    assigned = true;
                    break;
                }
            }

            if (!assigned) {
                result.push({
                    areaId: area.id,
                    message: "No available truck"
                });
            }
        }
        result.sort((a, b) => a.areaId - b.areaId);
        await RedisModel.connect();
        await RedisModel.insert("assignment", result);
        await RedisModel.disconnect();
        return result;
    } catch (error) {
        throw error;
    }
}

export default {
    assignTrucks
}