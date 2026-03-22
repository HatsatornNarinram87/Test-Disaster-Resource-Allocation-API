import AreasService from "../services/areas_service.js";

class AreasController {
    static addArea(req, res) {
        try {
            // insert area to redis
            const result = AreasService.createAreas(req.body);
            if (result.success) {
                res.json({ message: "Areas created successfully" });
            } else {
                res.json({ error: result.error });
            }
        } catch (error) {
            res.json({ error: error.message });
        }
    }
}

export default AreasController;