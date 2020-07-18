import express from 'express';
const router = express.Router();

import ActivitiesController from '../controllers/ActivitiesController';
const controller = new ActivitiesController();

import { body, validationResult } from 'express-validator';

router.post("/buy", [
    body('user_id').trim().isAscii(),
    body('date').trim().isAscii(),
    body('price').trim().isAscii(),
    body('quantity').trim().isAscii(),
    body('commission').trim().isAscii(),
    body('symbol').trim().isAscii(),
    body('*').escape()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    controller.buy(req, res)
});

router.post("/sell", [
    body('user_id').trim().isAscii(),
    body('date').trim().isAscii(),
    body('price').trim().isAscii(),
    body('quantity').trim().isAscii(),
    body('commission').trim().isAscii(),
    body('symbol').trim().isAscii(),
    body('*').escape()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    controller.sell(req, res)
});

router.post("/ytd", [
    body('user_id').trim().isAscii(),
    body('date').trim().isAscii(),
    body('price').trim().isAscii(),
    body('quantity').trim().isAscii(),
    body('commission').trim().isAscii(),
    body('symbol').trim().isAscii(),
    body('*').escape()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    controller.ytd(req, res)
});

router.post("/mtd", [
    body('user_id').trim().isAscii(),
    body('date').trim().isAscii(),
    body('price').trim().isAscii(),
    body('quantity').trim().isAscii(),
    body('commission').trim().isAscii(),
    body('symbol').trim().isAscii(),
    body('*').escape()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    controller.mtd(req, res)
});

router.post("/custom", [
    body('user_id').trim().isAscii(),
    body('date').trim().isAscii(),
    body('price').trim().isAscii(),
    body('quantity').trim().isAscii(),
    body('commission').trim().isAscii(),
    body('symbol').trim().isAscii(),
    body('*').escape()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    controller.custom(req, res)
});

router.post("/pie", [
    body('user_id').trim().isAscii(),
    body('date').trim().isAscii(),
    body('price').trim().isAscii(),
    body('quantity').trim().isAscii(),
    body('commission').trim().isAscii(),
    body('symbol').trim().isAscii(),
    body('*').escape()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    controller.pie(req, res)
});

// TODO: remove this router later
// route for testing IEX API calls
router.get("/iex", (req, res) => {
    controller.iex(req, res)
});

export default router