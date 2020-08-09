import * as dotenv from "dotenv";
import Axios from 'axios';

const API_KEY = process.env.NEWSAPI_API_KEY;
const BASE_URL = 'http://newsapi.org/v2';
const SOURCES_URI = 'sources=' + ['axios', 'bloomberg', 'MarketWatch', 'techcrunch', 'the-wall-street-journal', "the-washington-post"].join(',');

export default class NewsController {
    // GET /news/:query?
    async getNews(req, res) {
        try {
            const queryUri = req.params.query ? 'q=' + encodeURIComponent(req.params.query) + '&': '';
            const result = await Axios.get(BASE_URL+ '/everything?' + queryUri + 'language=en&' + SOURCES_URI + '&apiKey=' + API_KEY)
            res.status(200).send(result.data);
        } catch(err) {
            console.error(err)
            res.status(400).send({message: err.message})
        }
    }
}
