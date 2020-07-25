import express from 'express';

const router = express.Router(); 

import ActivitiesController from '../controllers/ActivitiesController';
const controller = new ActivitiesController();

import { body, validationResult } from 'express-validator';

// POST after submitting changes to add quantity to stock, update user's holding information by Id
router.post('/activity/order', [
    body('user_id').isInt().not().isEmpty(),
    body('date').isLength({ min:8, max:10 }),
    body('price').isDecimal(),
    body('commission').isDecimal(),
    body('quantity').isInt(),
    body('symbol').isLength({ min:1, max:255 }),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    else{
        controller.insertNewActivity(req, res);
    }
});


// POST upload user CSV file
import multer from 'multer';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const upload = multer({storage: storage}).single('file')
router.post('/upload', upload, controller.uploadCSV);

// TODO: remove this router later
// route for testing IEX API calls
router.get("/iex", (req, res) => {
    controller.iex(req, res)
});

export default router