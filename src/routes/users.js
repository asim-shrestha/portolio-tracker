import express from 'express';
const router = express.Router();

import UserController from '../controllers/UserController';
const controller = new UserController();

import { body, validationResult } from 'express-validator';

router.post("/create", [
    body('username').trim().isAscii(),
    body('password').trim().isAscii(),
    body('first_name').trim().isAscii(),
    body('last_name').trim().isAscii(),
    body('email').trim().isAscii(),
    body('phone').trim().isAscii(),
    body('*').escape()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    controller.create(req, res)
});

router.post("/edit", [
    body('username').trim().isAscii(),
    body('password').trim().isAscii(),
    body('first_name').trim().isAscii(),
    body('last_name').trim().isAscii(),
    body('email').trim().isAscii(),
    body('phone').trim().isAscii(),
    body('*').escape()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    controller.create(req, res)
});

router.post("/delete", [
    body('username').trim().isAscii(),
    body('password').trim().isAscii(),
    body('first_name').trim().isAscii(),
    body('last_name').trim().isAscii(),
    body('email').trim().isAscii(),
    body('phone').trim().isAscii(),
    body('*').escape()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    controller.create(req, res)
});

export default router