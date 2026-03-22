import express from 'express';
const router = express.Router();
import areaRouter from './area_router.js';
import trucksRouter from './trucks_router.js';
import assignmentRouter from './assignment_router.js';

router.use('/areas', areaRouter);
router.use('/trucks', trucksRouter);
router.use('/assignments', assignmentRouter);

export default router;