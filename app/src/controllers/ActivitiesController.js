import Activity from '../models/ActivityModel'
import ActivitiesHelper from './helpers/ActivitiesHelper'
import { iexSymbols } from 'iexcloud_api_wrapper'

const helper = new ActivitiesHelper()


export default class ActivitiesController {
    // insert stock holding info (after purchase)
    async insertNewActivity(req, res) {
        try {
            const symbols = await iexSymbols();
            req.body.symbol = req.body.symbol.toUpperCase() // Capitalize symbol name
            if (await helper.validateSymbol(req.body.symbol, symbols)) {
                const newActivity = await Activity.query().insert(req.body);
                res.json(newActivity);
            } else {
                res.status(422).send({message: helper.getInvalidSymbolMessage()});
            }
            
        } catch(err) {
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

    async delete(req, res){
        try{
            if (req.user) {
                const result = await Activity.query().delete().where('symbol', req.body.symbol).andWhere('user_id', req.user.id)
                res.status(200).send({ delete: true, recordsDeleted: result })
            }
            else {
                res.sendStatus(403)
            }
        } catch (err) {
            console.error(err)
            res.sendStatus(400).send({ message: err.message })
        }
    }
}