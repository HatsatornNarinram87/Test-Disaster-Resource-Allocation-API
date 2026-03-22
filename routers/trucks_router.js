import express from 'express';
import TrucksController from '../controllers/trucks_controller.js';
import TrucksInterfaceRouter from './interface/trucks_interface_router.js';

const router = express.Router();

router.post('/', TrucksInterfaceRouter.addTruck, TrucksController.addTruck);

export default router;