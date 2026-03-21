import express from 'express';
import AssignmentsController from '../controllers/assignments_controller.js';

const router = express.Router();

router.post('/assignments', AssignmentsController.processAssignments);
router.get('/assignments', AssignmentsController.getAssignments);

export default router;