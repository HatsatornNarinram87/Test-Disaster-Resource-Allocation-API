import express from 'express';
const router = express.Router();
const areaRouter = await import('./area_router');
const trucksRouter = await import('./trucks_router');
const assignmentRouter = await import('./assignment_router');
router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.use('/areas', areaRouter.default);
router.use('/trucks', trucksRouter.default);
router.use('/assignments', assignmentRouter.default);

export default router;