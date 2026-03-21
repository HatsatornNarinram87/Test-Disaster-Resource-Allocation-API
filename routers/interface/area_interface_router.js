import { z } from "zod";

const resourceSchema = z.record(z.number());

const areaSchema = z.object({
    AreaID: z.string(),
    UrgencyLevel: z.number().min(1).max(5),
    RequiredResources: resourceSchema,
    TimeConstraint: z.number()
});

const requestSchema = z.array(areaSchema);
class AreaInterfaceRouter {
    static addArea(req, res, next) {

        const result = requestSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                error: result.error.format()
            });
        }

        next();
    }
}

export default AreaInterfaceRouter;
