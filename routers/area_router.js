import express from 'express';
import AreasController from '../controllers/areas_controller.js';
import AreaInterfaceRouter from './interface/area_interface_router.js';

const router = express.Router();

router.post('/', AreaInterfaceRouter.addArea, AreasController.addArea);

export default router;