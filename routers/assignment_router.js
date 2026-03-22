import express from 'express';
import AssignmentsController from '../controllers/assignments_controller.js';

const router = express.Router();

router.post('/', AssignmentsController.processAssignments);
router.get('/', AssignmentsController.getAssignments);
router.delete('/', AssignmentsController.deleteAssignment);

export default router;