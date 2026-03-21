
import AssignmentService from "../services/assignment_service.js";

class AssignmentsController {
    static async processAssignments(req, res) {
        const result = await AssignmentService.processAssignments();
        res.send(result);
    }

    static async getAssignments(req, res) {
        const assignments = await AssignmentService.getAssignments();
        res.send(assignments);
    }
}

export default AssignmentsController;