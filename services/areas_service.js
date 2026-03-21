import RedisModel from "../models/redis_model.js";

class AreasService {
    static async createAreas(req, res) {
        try {
            for (const area of req.body) {
                await RedisModel.connect();
                await RedisModel.insert("area", area);
                await RedisModel.disconnect();
            }
            res.status(201).json({ message: "Areas created successfully" });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default AreasService;