import express from 'express';
import passport from 'passport'
const router = express.Router();

import DashboardsController from '../controllers/DashboardsController';
const controller = new DashboardsController();

// GET display performance graph on dashboard
router.get('/performance/:user_id', passport.authenticate('jwt', { session: false }), controller.getPerformanceData);

// GET performance of individual symbol
router.get('/symbol/:symbol', controller.getSymbolData);

// GET display table containing all stocks owned by user
router.get('/holdings/:user_id', passport.authenticate('jwt', { session: false }), controller.getHoldingsData);

export default router