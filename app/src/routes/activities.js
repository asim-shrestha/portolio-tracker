import express from 'express';
const router = express.Router();

import ActivitiesController from '../controllers/ActivitiesController';
const controller = new ActivitiesController();

// POST after submitting changes to add quantity to stock, update user's holding information by Id
router.post('/activity/order', controller.insertNewActivity);

// POST upload user CSV file
router.post('/upload', controller.uploadCSV);

// TODO: remove this router later
// route for testing IEX API calls
router.get("/iex", (req, res) => {
    controller.iex(req, res)
});

export default router