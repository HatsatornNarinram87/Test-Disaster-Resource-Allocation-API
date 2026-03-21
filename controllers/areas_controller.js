import AreasService from "../services/areas_service.js";

class AreasController {
    static addArea(req, res) {
        try {
            // insert area to redis
            AreasService.createAreas(req, res);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default AreasController;