import moment from 'moment'
import Activity from '../models/ActivityModel'
import Symbol from '../models/SymbolModel'
import ActivitiesHelper from './helpers/ActivitiesHelper'
import DashboardsHelper from './helpers/DashboardsHelper'
import { iexSymbols } from 'iexcloud_api_wrapper'
const helper = new ActivitiesHelper()
const dashboardHelper = new DashboardsHelper()

export default class ActivitiesController {
    // insert stock holding info (after purchase)
    async insertNewActivity(req, res) {
        try {

            if (moment(req.body.date).isAfter(moment()) || dashboardHelper.isWeekend(req.body.date)){
                res.status(422).send({message: helper.getInvalidDateMessage()});
            } else {
                req.body.symbol = req.body.symbol.toUpperCase(); // Capitalize symbol name
                const quantity = req.body.quantity
                const action = req.body.action
                const user_id = req.body.user_id
                const symbol = req.body.symbol
                let validQuantity = true
    
                // update cache if outdated
                let latestCachedDate = (await Symbol.query().max('date as date'))[0].date
                if (await helper.retrieveNewData(latestCachedDate)){
                    const retrievedSymbols = await iexSymbols()
                    const symbolsCache = await helper.processAPISymbols(retrievedSymbols)
    
                    if (symbolsCache){
                        latestCachedDate = symbolsCache.date 
                        await Symbol.query().insert(symbolsCache)
                    }
                }
                const symbols =  (await Symbol.query().select('symbols').where('date', latestCachedDate))[0].symbols;
    
                // check if selling quantity is greater than bought
                if (action == 'sell') {
                    const quantityResult = await Activity.query()
                                            .sum("quantity")
                                            .where("symbol", symbol)
                                            .where("user_id", user_id)
                    
                    const availableQuantity = quantityResult[0].sum
    
                    if (availableQuantity < quantity ) {
                        validQuantity = false
                    }
                }
    
                if (await helper.validateSymbol(symbol, symbols) && validQuantity) {
                    const newActivity = await Activity.query().insert(req.body);
                    res.json(newActivity);
                } else if (!validQuantity) {
                    res.status(422).send({message: helper.getInvalidQuantityMessage()});
                } else {
                    res.status(422).send({message: helper.getInvalidSymbolMessage()});
                }
            }    
        } catch(err) {
            console.error(err)
            res.sendStatus(400).send({message: err.message});
        }
    }

    // Upload user's csv file
    async uploadCSV(req, res) {
        try {
            const { data, map } = req.body
            const user = req.user
            const { symbol, price, quantity, date } = map

            // Check symbols
            let safeToInsert = false
            const symbolsList = await iexSymbols()
            for (let i = 1; i < data.length; i++) {
                data[i][symbol] = data[i][symbol].toUpperCase() // Capitalize symbol name
                const validSymbol = await helper.validateSymbol(data[i][symbol].toUpperCase(), symbolsList)
                if (!validSymbol) {
                    console.log('Bad symbol:', data[i][symbol])
                    res.status(422).send({ message: helper.getInvalidSymbolMessage() })
                    return
                }
                else {
                    safeToInsert = true
                }
            }

            if (safeToInsert) {
                for (let i = 1; i < data.length; i++) {
                    const insertRow = {
                        user_id: user.id,
                        quantity: parseInt(data[i][quantity]),
                        symbol: data[i][symbol],
                        price: parseFloat(data[i][price]),
                        date: data[i][date],
                        // TODO find out if this is ok
                        action: 'buy',
                        commission: 0
                    }
                    // Insert as new activity
                    await Activity.query().insert(insertRow)
                }
                res.send({ message: 'Successful upload' })
            }
        }
        catch (err) {
            console.error(err)
            res.sendStatus(400).send({message: err.message})
        }
    }
}