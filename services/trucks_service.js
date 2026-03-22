import { RedisModel } from "../models/redis_model.js";

class TrucksService {
    static async addTruck(body) {
        try {

            await RedisModel.insert("trucks", body);

            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    static getTrucks() {
        return [];
    }
}

export default TrucksService;