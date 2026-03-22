import { z } from "zod";

const resourceSchema = z.record(z.number());
// [
//     {
//         "TruckID": "T1",
//         "AvailableResources": ("food": 250, "water": 300, "TravelTimeToArea": ("A1": 5, "A2": 3)
//     },
// {
//         "TruckID": "T2",
//         "AvailableResources": "medicine": 60),
//     "TravelTimeToArea": ("A1": 4, "A2": 2)
// }
// ]
const truckSchema = z.object({
    TruckID: z.string(),
    AvailableResources: z.record(z.string(), z.number()),
    TravelTimeToArea: z.record(z.string(), z.number()),
});

const requestSchema = z.array(truckSchema);
class TrucksInterfaceRouter {
    static addTruck(req, res, next) {

        const result = requestSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                error: result.error.issues
            });
        }

        next();
    }
}

export default TrucksInterfaceRouter;
