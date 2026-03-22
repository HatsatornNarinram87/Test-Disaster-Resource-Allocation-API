
import AssignmentService from "../services/assignment_service.js";

class AssignmentsController {
    static async processAssignments(req, res) {
        const result = await AssignmentService.processAssignments();
        console.log("Controller result:", result);
        res.send(result.result);
    }

    static async getAssignments(req, res) {
        const assignments = await AssignmentService.getAssignments();
        res.send(assignments);
    }
    static async deleteAssignment(req, res) {
        const result = await AssignmentService.deleteAssignment();
        res.send(result);
    }
}

export default AssignmentsController;