import Activity from '../models/ActivityModel'
import ActivitiesHelper from './helpers/ActivitiesHelper'
import { iexSymbols } from 'iexcloud_api_wrapper'
import { header } from 'express-validator'

const helper = new ActivitiesHelper()


export default class ActivitiesController {
    // POST /activity/buy
    // POST /activity/buy/:id
    // POST /activity/sell/:id
    // insert stock holding info (after purchase)
    async insertNewActivity(req, res) {
        try {
            const symbols = await iexSymbols();
            if (await helper.validateSymbol(req.body.symbol, symbols)) {
                const newActivity = await Activity.query().insert(req.body);
                res.json(newActivity);
            } else {
                res.status(422).send(helper.getInvalidSymbolMessage());
            }
            
        } catch(err) {
            res.sendStatus(400);
        }
    }

    // POST /upload
    // upload user's csv file
    async uploadCSV(req, res) {
        try {
            const { data, map } = req.body
            const user = req.user
            const { symbol, price, quantity, date } = map

            // check symbols
            let safeToInsert = false
            const symbolsList = await iexSymbols()
            for (let i = 1; i < data.length; i++) {
                const validSymbol = await helper.validateSymbol(data[i][symbol], symbolsList)
                if (!validSymbol) {
                    console.log('bad symbol:', data[i][symbol])
                    res.status(422).send({
                        message: 'CSV contained invalid symbols. Please check the symbols, and try again.'
                    })
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
                        // not sure about this below
                        action: 'buy',
                        commission: 0
                    }
                    // console.log(insertRow)
                    const newActivity = await Activity.query().insert(insertRow)
                    // console.log(newActivity)
                }
                res.send({ message: 'Successful upload' })
            }
        }
        catch (error) {
            console.log(error)
            res.sendStatus(400)
        }
    }
}