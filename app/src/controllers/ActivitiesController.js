import Activity from '../models/ActivityModel'
import ActivitiesHelper from './helpers/ActivitiesHelper'
import { quote, iexSymbols } from 'iexcloud_api_wrapper'
const helper = new ActivitiesHelper()

export default class ActivitiesController {
    // GET /activity/buy/:id
    // GET /activity/sell/:id
    // retrieve stock holding information by Id
    async getHoldingInfoById(req, res) {
        try {
            res.send('NOT IMPLEMENTED: retrieve stock information by Id');
        } catch(err) {
            res.sendStatus(400)
        }
    }

    // POST /activity/buy/:id
    // POST /activity/sell/:id
    // update stock holding information by Id
    async updateHoldingInfoById(req, res) {
        try {
            res.send('NOT IMPLEMENTED: update stock holding information by Id');
        } catch(err) {
            res.sendStatus(400)
        }
    }

    // POST /activity/buy
    // insert stock holding info (after purchase)
    async insertNewHoldingInfo(req, res) {
        try {
            res.send('NOT IMPLEMENTED: insert stock holding info (after purchase)');
        } catch(err) {
            res.sendStatus(400)
        }
    }

    // POST /upload
    // upload user's csv file
    async uploadCSV(req, res) {
        try {
            res.send('NOT IMPLEMENTED: insert stock holding info (after purchase)');
        } catch(err) {
            res.sendStatus(400)
        }
    }

    // TODO: delete this route in the future
    // route for testing IEX wrapper
    async iex(res, req) {
        const symbol_1 = "TSLA"
        const symbol_2 = "TSLLLA"

        const symbols = await iexSymbols()
        // valid whether symbol is valid
        console.log(await helper.validateSymbol(symbol_1, symbols))
        console.log(await helper.validateSymbol(symbol_2, symbols))

        // retrieve price information based on ticker
        const quoteData = await quote(symbol_1)
        const last_closed_price = quoteData.previousClose
        console.log(last_closed_price)

    }
}