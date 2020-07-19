import express from 'express';
const router = express.Router();

import ActivitiesController from '../controllers/ActivitiesController';
const controller = new ActivitiesController();

// GET when adding quantity to stock, retrieve stock holding information by Id
router.get('/activity/buy/:id', controller.getHoldingInfoById);

// GET when selling stock, retrieve stock holding information by Id
router.get('/activity/sell/:id', controller.getHoldingInfoById);

// POST after submitting changes to add quantity to stock, update user's holding information by Id
router.post('/activity/buy/:id', controller.updateHoldingInfoById);

// POST after submitting changes to sell stock, update user's holding information by Id
router.post('/activity/sell/:id', controller.updateHoldingInfoById);

// POST upload user CSV file
router.post('/upload', controller.uploadCSV);

// TODO: remove this router later
// route for testing IEX API calls
router.get("/iex", (req, res) => {
    controller.iex(req, res)
});

export default router