import express from 'express';
const router = express.Router();

import AuthController from '../controllers/AuthController';
const controller = new AuthController();

import { body, validationResult } from 'express-validator';

router.post("/login", [
    body('email').trim().isAscii(),
    body('password').trim().isAscii(),
    body('*').escape()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("Login form validation failed");
        return res.status(422).json({ errors: errors.array() });
    }
    controller.login(req, res)
});

router.post('/register', [
    body('first_name').trim().isAscii(),
    body('last_name').trim().isAscii(),
    body('email').trim().isAscii(),
    body('password').trim().isAscii(),
    body('*').escape()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors)
        return res.status(422).json({ errors: errors.array() });
    }
    controller.register(req, res)
});

router.get('/findUser', (req, res) => {
    controller.findUser(req, res)
})

// only add to test deleting test users
if (!process.env.NODE_ENV) {

    router.delete('/deleteUser', (req, res) => {
        controller.deleteUser(req, res)
    })
}


export default router