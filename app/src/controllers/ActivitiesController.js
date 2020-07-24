import Activity from '../models/ActivityModel'

export default class ActivitiesController {
    // POST /activity/buy
    // POST /activity/buy/:id
    // POST /activity/sell/:id
    // insert stock holding info (after purchase)
    async insertNewActivity(req, res) {
        try {           
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