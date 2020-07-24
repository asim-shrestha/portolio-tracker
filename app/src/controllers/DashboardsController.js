import Activity from '../models/ActivityModel'
import DashboardsHelper from './helpers/DashboardsHelper'
import { history, quote } from 'iexcloud_api_wrapper'
const helper = new DashboardsHelper()

export default class DashboardsController {
    // GET /performance
    async getPerformanceData(req, res) {
        try {
            // TODO: extract user_id from findUser
            const user_id = 1;
            const activities = await Activity.query().select('symbol', 'date', 'price', 'quantity', 'action').where('user_id', user_id);
            const activitiesByDate = await helper.indexActivitiesByDate(activities)
            const symbols = await helper.findSymbols(activities)
            const priceDataList = []
            
            for (let s of symbols){
                let priceData = await history(s, {chartByDay: true, period:'1m', closeOnly: true})
                let indexedPriceData = await helper.indexHistoricalPricesByDate(priceData)
                priceDataList.push(indexedPriceData)
            }
            
            const returnData = await helper.generateReturnData(priceDataList, activitiesByDate)
            res.json(returnData);

        } catch(err) {
            console.error(err)
            res.sendStatus(400)
        }
    }

    // GET /holdings
    async getHoldingsData(req, res) {
        try {
            const user_id = req.params.user_id;
            const activities = await Activity.query().select('symbol', 'date', 'price', 'quantity', 'action', 'commission').where('user_id', user_id);
            const symbols = await helper.findSymbols(activities)

            let priceData = {}

            for (let s of symbols) {
                let quoteData = await quote(s)
                priceData[s] = quoteData.previousClose
            }

            const holdingsInfo = await helper.groupActivitiesBySymbol(activities, priceData)
            res.json(holdingsInfo);

        } catch(err) {
            console.error(err)
            res.sendStatus(400)
        }
    }
}
