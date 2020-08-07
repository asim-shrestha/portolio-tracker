import express from 'express';
import NewsController from '../controllers/NewsController';

const router = express.Router(); 
const controller = new NewsController();

// Get news with optional query parameter
// TODO add passport authentication
router.get('/news/:query?', controller.getNews);


export default router;