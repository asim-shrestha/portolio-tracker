import express from 'express';
import passport from 'passport';
import NewsController from '../controllers/NewsController';

const router = express.Router();
const controller = new NewsController();

// Get news with optional query parameter
router.get('/news/:query?', passport.authenticate('jwt', { session: false }), controller.getNews);


export default router;