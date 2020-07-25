import Activity from '../models/ActivityModel'
import ActivitiesHelper from './helpers/ActivitiesHelper'
import { iexSymbols } from 'iexcloud_api_wrapper'
import csv from 'csv-parser'
import fs from 'fs'
import { header } from 'express-validator'

const helper = new ActivitiesHelper()


export default class ActivitiesController {
    // POST /activity/buy
    // POST /activity/buy/:id
    // POST /activity/sell/:id
    // insert stock holding info (after purchase)
    async insertNewActivity(req, res) {
        try {
            const symbols = await iexSymbols()
            if (await helper.validateSymbol(req.body.symbol, symbols)) {
                const newActivity = await Activity.query().insert(req.body)
                res.json(newActivity);
            } else {
                res.status(422).send({
                    message: 'The symbol you entered is invalid. Please check the symbol, and try again.'
                })
            }

        } catch (err) {
            res.sendStatus(400)
        }
    }

    // POST /upload
    // upload user's csv file
    async uploadCSV(req, res) {
        console.log("uploadCSV", req.file);
        const rows = []

        fs.createReadStream(req.file.path)
            .pipe(csv())
            .on('headers', (headers) => { console.log(headers) })
            .on('data', (data) => { rows.push(data) })
            .on('end', () => {
                // console.log(rows)
                fs.unlink(req.file.path, () => {
                    console.log('file deleted')
                })
                res.send({ data: rows });
            })
    }
}