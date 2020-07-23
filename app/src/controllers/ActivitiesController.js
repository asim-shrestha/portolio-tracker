import Activity from '../models/ActivityModel'

export default class ActivitiesController {
    // POST /activity/buy
    // POST /activity/buy/:id
    // POST /activity/sell/:id
    // insert stock holding info (after purchase)
    async insertNewActivity(req, res) {
        // console.log("insertNewActivity");
        try {
            // TODO: remove req.body after form is correctly setup
            // req.body = {
            //     user_id: 1,
            //     quantity: 120,
            //     action:'buy',
            //     symbol:'AMZN',
            //     price: 3150.23,
            //     date:'2020-07-17',
            //     commission: 9.95
            // }
            
            const newActivity = await Activity.query().insert(req.body)
            res.json(newActivity);
        } catch(err) {
            res.sendStatus(400)
        }
    }

    // POST /upload
    // upload user's csv file
    async uploadCSV(req, res) {
        console.log("uploadCSV");

        try {
            res.send('NOT IMPLEMENTED: insert stock holding info (after purchase)');
        } catch(err) {
            res.sendStatus(400)
        }
    }
}