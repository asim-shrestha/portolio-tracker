import express from 'express';
const router = express.Router();

import DashboardsController from '../controllers/DashboardsController';
const controller = new DashboardsController();

// GET display performance graph on dashboard
router.get('/performance/:user_id', controller.getPerformanceData);

// GET display table containing all stocks owned by user
router.get('/holdings/:user_id', controller.getHoldingsData);

export default router