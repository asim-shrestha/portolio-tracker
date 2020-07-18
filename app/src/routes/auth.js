import express from 'express';
const router = express.Router();

import AuthController from '../controllers/AuthController';
const controller = new AuthController();

import { body, validationResult } from'express-validator';

router.post("/login", [
    body('username').trim().isAscii(),
    body('password').trim().isAscii(),
    body('*').escape()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    controller.login(req, res)
});

export default router