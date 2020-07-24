import express from 'express';

const router = express.Router();

import ActivitiesController from '../controllers/ActivitiesController';
const controller = new ActivitiesController();

const { body, validationResult } = require('express-validator');

// POST after submitting changes to add quantity to stock, update user's holding information by Id
router.post('/activity/order', [
    body('user_id').isInt().not().isEmpty(),
    // body('date').isDate().not().isEmpty(),
    // body('price').not().isEmpty(),
    // body('quantity').not().isEmpty(),
    // body('action').not().isEmpty(),
    // body('symbol').not().isEmpty(), 
], controller.insertNewActivity);
// cannot do a (req, res) => thing otherwise it wont post..


// POST upload user CSV file
router.post('/upload', controller.uploadCSV);

// TODO: remove this router later
// route for testing IEX API calls
router.get("/iex", (req, res) => {
    controller.iex(req, res)
});

export default router