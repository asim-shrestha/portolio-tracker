import Activity from '../models/ActivityModel'
import Company from '../models/CompanyModel'
import Symbol from '../models/SymbolModel'
import DashboardsHelper from './helpers/DashboardsHelper'
import ActivitiesHelper from './helpers/ActivitiesHelper'
import { batchData } from '../libs/iexCustomWrapper'
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
            
            const charts = await batchData(symbols, 'chart', '1y')

            for (let s of symbols){
                let chart = charts[s].chart
                let indexedPriceData = await helper.indexHistoricalPricesByDate(chart, s)
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
            // cache company data
            // TODO: recache data if certain amount of time has elapsed
            const missingCompanySymbols = []
            const companyData = {}
            let companySymbol

            // find symbols without companyData cached
            for (let s of symbols) {
                companySymbol = await Company.query().select('country', 'industry', 'sector').where('symbol', s)

                if (helper.isEmptyArray(companySymbol)) {
                    missingCompanySymbols.push(s)
                } else {
                    companyData[s] = {}
                    companyData[s].country = companySymbol[0].country
                    companyData[s].industry = companySymbol[0].industry
                    companyData[s].sector = companySymbol[0].sector
                }
            }

            const missingCompanyData = helper.isEmptyArray(missingCompanySymbols) ? [] : (await batchData(missingCompanySymbols, 'company', false, false))

            // cache missing symbols
            for (let s of missingCompanySymbols){
                companyData[s] = {}
                // symbol is not required for payload, but required for caching (i.e. db insertion)
                companyData[s].symbol = missingCompanyData[s].company.symbol
                companyData[s].country = missingCompanyData[s].company.country
                companyData[s].industry = missingCompanyData[s].company.industry
                companyData[s].sector = missingCompanyData[s].company.sector
                // cache data
                await Company.query().insert(companyData[s])
            }

            let priceData = {}
            const quoteData = await batchData(symbols, 'quote')

            for (let s of symbols) {
                priceData[s] = {}
                priceData[s].price = quoteData[s].quote.close
                priceData[s].companyName = quoteData[s].quote.companyName
                priceData[s].marketCap = quoteData[s].quote.marketCap
                priceData[s].country = companyData[s].country
                priceData[s].sector = companyData[s].sector
                priceData[s].industry = companyData[s].industry
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
