import { RedisModel } from "../models/redis_model.js";

class AreasService {
    static async createAreas(body) {
        try {

            await RedisModel.insert("areas", body);

            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
}

export default AreasService;