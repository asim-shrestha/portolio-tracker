import Activity from '../models/ActivityModel'
import { quote, iexSymbols } from 'iexcloud_api_wrapper'

export default class DashboardsController {
    // GET /performance
    // display performance graph on dashboard
    async getPriceData(req, res) {
        try {
            res.send('NOT IMPLEMENTED: display performance graph on dashboard');
        } catch(err) {
            res.sendStatus(400)
        }
    }

    // GET /holdings
    // display table containing all stocks owned by user
    async getHoldingsInfo(req, res) {
        try {
            res.send('NOT IMPLEMENTED: display table containing all stocks owned by user');
        } catch(err) {
            res.sendStatus(400)
        }
    }
}
