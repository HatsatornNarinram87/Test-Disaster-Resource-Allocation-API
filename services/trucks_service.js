import RedisModel from "../models/redis_model.js";

class TrucksService {
    static async addTruck(req, res) {
        try {
            for (const truck of req.body) {
                await RedisModel.connect();
                await RedisModel.insert("trucks", truck);
                await RedisModel.disconnect();
            }
            res.status(201).json({ message: "Trucks created successfully" });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static getTrucks() {
        return [];
    }
}

export default TrucksService;