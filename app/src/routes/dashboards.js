import express from 'express';
const router = express.Router();

import DashboardsController from '../controllers/DashboardsController';
const controller = new DashboardsController();

// GET display performance graph on dashboard
router.get('/performance', controller.getPriceData);

// GET display table containing all stocks owned by user
router.get('/holdings', controller.getHoldingsInfo);

export default router