import Activity from '../models/ActivityModel'
import Symbol from '../models/SymbolModel'
import DashboardsHelper from './helpers/DashboardsHelper'
import ActivitiesHelper from './helpers/ActivitiesHelper'
import { history, quote, iexSymbols } from 'iexcloud_api_wrapper'
const helper = new DashboardsHelper()
const activitiesHelper = new ActivitiesHelper()

export default class DashboardsController {
    // GET /performance
    async getPerformanceData(req, res) {
        try {
            const user_id = req.params.user_id;
            const activities = await Activity.query().select('symbol', 'date', 'price', 'quantity', 'action').where('user_id', user_id);

            // Avoid additional logic if no activities found
            if(activities.length === 0) {
                console.error("No activities found for user");
                res.json([]);
                return;
            }

            const activitiesByDate = await helper.indexActivitiesByDate(activities)
            const symbols = await helper.findSymbols(activities)
            const priceDataList = []
            
            for (let s of symbols){
                let priceData = await history(s, {chartByDay: true, period:'1m', closeOnly: true})
                let indexedPriceData = await helper.indexHistoricalPricesByDate(priceData)
                priceDataList.push(indexedPriceData)
            }
            const performanceData = await helper.generatePerformanceData(priceDataList, activitiesByDate)
            res.json(performanceData);

        } catch(err) {
            console.error(err)
            res.status(400).send({message: err.message})
        }
    }
    
    // Get the 30 day performance data of an individual symbol
    async getSymbolData(req, res) {
        try{
            const symbol = req.params.symbol;

            // update cache if outdated
            let latestCachedDate = (await Symbol.query().max('date as date'))[0].date
            if (await activitiesHelper.retrieveNewData(latestCachedDate)){
                const retrievedSymbols = await iexSymbols()
                const symbolsCache = await activitiesHelper.processAPISymbols(retrievedSymbols)

                if (symbolsCache){
                    latestCachedDate = symbolsCache.date 
                    await Symbol.query().insert(symbolsCache)
                }
            }
            const allSymbols = (await Symbol.query().select('symbols').where('date', latestCachedDate))[0].symbols;

            // If symbol is valid, return performance data for it
            if (await activitiesHelper.validateSymbol(symbol, allSymbols)) {
                // Get data for symbol
                let priceData = await history(symbol, {chartByDay: true, period:'1m', closeOnly: true})
                let indexedPriceData = await helper.indexHistoricalPricesByDate(priceData)
                // Extract datapoints for front end
                let symbolPerformanceData = await helper.generateSymbolPerformanceData(indexedPriceData);
                res.send(symbolPerformanceData);
            } else {
                res.status(422).send({message: activitiesHelper.getInvalidSymbolMessage()})
            }
        } catch(err) {
            res.status(400).send({message: err.message});
        }
    } 

    // GET /holdings
    async getHoldingsData(req, res) {
        try {
            const user_id = req.params.user_id;
            const activities = await Activity.query().select('symbol', 'date', 'price', 'quantity', 'action', 'commission').where('user_id', user_id);
            
            // Avoid additional logic if no activities found
            if(activities.length === 0) {
                console.error("No activities found for user");
                res.json([]);
                return;
            }

            const symbols = await helper.findSymbols(activities)

            let priceData = {}

            for (let s of symbols) {
                let quoteData = await quote(s)
                priceData[s] = quoteData.previousClose
            }

            const holdingsInfo = await helper.groupActivitiesBySymbol(activities, priceData)
            helper.removeSoldStocks(holdingsInfo)
            res.json(holdingsInfo);

        } catch(err) {
            console.error(err)
            res.status(400).send({message: err.message})
        }
    }
}
