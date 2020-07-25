import Activity from '../models/ActivityModel'
import ActivitiesHelper from './helpers/ActivitiesHelper'
import { iexSymbols } from 'iexcloud_api_wrapper'
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
        console.log("uploadCSV");

        try {
            res.send('NOT IMPLEMENTED: insert stock holding info (after purchase)');
        } catch(err) {
            res.sendStatus(400);
        }
    }
}