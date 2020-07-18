// just a placeholder for activities controller

import User from '../models/UserModel'

// import iex api wrapper
import ActivitiesHelper from './helpers/ActivitiesHelper'
import { quote, iexSymbols } from 'iexcloud_api_wrapper'
const helper = new ActivitiesHelper()

export default class AuthController {
    // buy, sell, ytd, mtd, custom, pie
    async buy(req, res) {
        // try {
        //     const username = req.body.username;
        //     const password = req.body.password;

        //     const user = await User.query()
        //                     .where('username', username)
        //                     .where('password', password)

        //     if(user.length > 0) { 
        //         res.json(user[0]) 
        //     } else {
        //         res.sendStatus(403)
        //     }
        // } catch(err) {
        //     res.sendStatus(400)
        // }
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


