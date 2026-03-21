import RedisModel from "../models/redis_model.js";
import assignTrucks from "../repositories/assignment_repo.js";

class AssignmentService {
    static async processAssignments() {
        await RedisModel.connect();
        const areas = await RedisModel.get("areas");
        const trucks = await RedisModel.get("trucks");
        await RedisModel.disconnect();
        try {
            assignTrucks(areas, trucks);
            return "Assignment processed successfully";

        } catch (error) {
            throw error;
        }
    }

    static async getAssignments() {
        await RedisModel.connect();
        const cached = await RedisModel.get("assignment");
        await RedisModel.disconnect();

        if (cached) return JSON.parse(cached);
        return [];
    }
    static async deleteAssignment(req, res) {
        try {
            await RedisModel.connect();
            await RedisModel.delete(`assignment`);
            await RedisModel.disconnect();
            res.status(200).json({ message: "Assignment deleted successfully" });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default AssignmentService;