import { RedisModel } from "../models/redis_model.js";
import { assignTrucks } from "../repositories/assignment_repo.js";

class AssignmentService {
    static async processAssignments() {

        const areas = await RedisModel.get("areas");
        const trucks = await RedisModel.get("trucks");

        try {
            const result = await assignTrucks(areas, trucks);
            console.log("Assignment result:", result);
            return { success: true, result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    static async getAssignments() {

        const cached = await RedisModel.get("assignments");

        if (cached) {
            try {
                return cached;
            } catch (err) {
                console.error("JSON parse error:", err);
                return cached; // fallback
            }
        }
        return [];
    }
    static async deleteAssignment() {
        try {

            await RedisModel.delete(`assignments`);

            return { success: true };
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default AssignmentService;