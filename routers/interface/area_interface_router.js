import { z } from "zod";


const areaSchema = z.object({
    AreaID: z.string(),
    UrgencyLevel: z.number().min(1).max(5),
    RequiredResources: z.record(z.string(), z.number()),
    TimeConstraint: z.number()
});

const requestSchema = z.array(areaSchema);
class AreaInterfaceRouter {
    static addArea(req, res, next) {
        try {
            console.log("req.body", JSON.stringify(req.body, null, 2));
            const result = requestSchema.safeParse(req.body);

            if (!result.success) {
                return res.status(400).json({
                    error: result.error.issues
                });
            }

            next();
        } catch (error) {
            return res.status(500).json({
                error: error.message
            });
        }
    }
}

export default AreaInterfaceRouter;
