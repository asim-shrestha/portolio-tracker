import moment from 'moment';
import Activity from '../models/ActivityModel';
import Symbol from '../models/SymbolModel';
import ActivitiesHelper from './helpers/ActivitiesHelper';
import DashboardsHelper from './helpers/DashboardsHelper';
import { iexSymbols } from 'iexcloud_api_wrapper';
const helper = new ActivitiesHelper();
const dashboardsHelper = new DashboardsHelper();

export default class ActivitiesController {
    // insert stock holding info (after purchase)
    async insertNewActivity(req, res) {
        try {
            req.body.symbol = req.body.symbol.toUpperCase(); // Capitalize symbol name
            const activityDate = req.body.date;
            const quantity = req.body.quantity;
            const action = req.body.action;
            const user_id = req.body.user_id;
            const symbol = req.body.symbol;
            let validQuantity = true; 

            const aggregateQuantities = (await Activity.query().select('action').sum('quantity as quantity')
                                                        .where('date', '<=', activityDate)
                                                        .andWhere("symbol", symbol)
                                                        .andWhere("user_id", user_id)
                                                        .groupBy('action'));

            let availableQuantity = 0;

           for (let q of aggregateQuantities) {
               availableQuantity += parseInt(q.action == 'buy' ? (q.quantity) : (-1 * q.quantity))
           }


            if (moment(activityDate).isAfter(moment()) || dashboardsHelper.isWeekend(activityDate)) {
                res.status(422).send({ message: helper.getInvalidDateMessage() });
            } else if (action = 'sell' && (availableQuantity < quantity)) { 
                res.status(422).send({ message: helper.getInvalidSellQuantityMessage() });
            } else {
                // update cache if outdated
                let latestCachedDate = (await Symbol.query().max('date as date'))[0].date;
                if (await helper.retrieveNewData(latestCachedDate)) {
                    const retrievedSymbols = await iexSymbols();
                    const symbolsCache = await helper.processAPISymbols(retrievedSymbols);

                    if (symbolsCache) {
                        latestCachedDate = symbolsCache.date;
                        await Symbol.query().insert(symbolsCache);
                    }
                }
                const symbols = (await Symbol.query().select('symbols').where('date', latestCachedDate))[0].symbols;

                // check if selling quantity is greater than bought
                if (action == 'sell') {
                    const quantityResult = await Activity.query()
                        .sum("quantity")
                        .where("symbol", symbol)
                        .where("user_id", user_id);

                    const availableQuantity = quantityResult[0].sum;

                    if (availableQuantity < quantity) {
                        validQuantity = false;
                    }
                }

                if (await helper.validateSymbol(symbol, symbols) && validQuantity) {
                    const newActivity = await Activity.query().insert(req.body);
                    res.json(newActivity);
                } else if (!validQuantity) {
                    res.status(422).send({ message: helper.getInvalidQuantityMessage() });
                } else {
                    res.status(422).send({ message: helper.getInvalidSymbolMessage() });
                }
            }
        } catch (err) {
            console.error(err);
            res.sendStatus(400).send({ message: err.message });
        }
    }

    // Upload user's csv file
    async uploadCSV(req, res) {
        try {
            const { data, map } = req.body;
            const user = req.user;
            const { symbol, price, quantity, date } = map;

            // Check symbols
            // update cache if outdated
            let latestCachedDate = (await Symbol.query().max('date as date'))[0].date;
            if (await helper.retrieveNewData(latestCachedDate)) {
                const retrievedSymbols = await iexSymbols();
                const symbolsCache = await helper.processAPISymbols(retrievedSymbols);

                if (symbolsCache) {
                    latestCachedDate = symbolsCache.date;
                    await Symbol.query().insert(symbolsCache);
                }
            }
            const symbolsList = (await Symbol.query().select('symbols').where('date', latestCachedDate))[0].symbols;
            let safeToInsert = false;
            for (let i = 1; i < data.length; i++) {
                data[i][symbol] = data[i][symbol].toUpperCase(); // Capitalize symbol name
                const validSymbol = await helper.validateSymbol(data[i][symbol].toUpperCase(), symbolsList);
                if (!validSymbol) {
                    console.log('Bad symbol:', data[i][symbol]);
                    res.status(422).send({ message: helper.getInvalidSymbolMessage() });
                    return;
                }
                else {
                    safeToInsert = true;
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
                    };
                    // Insert as new activity
                    await Activity.query().insert(insertRow);
                }
                res.send({ message: 'Successful upload' });
            }
            else {
                res.status(400).send({ message: 'Failed to upload' });
            }
        }
        catch (err) {
            console.error(err);
            res.sendStatus(400).send({ message: err.message });
        }
    }

    async deleteStock(req, res) {
        try {
            if (req.user) {
                const result = await Activity.query().delete().where('symbol', req.body.symbol).andWhere('user_id', req.user.id);
                res.status(200).send({ delete: true, recordsDeleted: result });
            }
            else {
                res.sendStatus(403);
            }
        } catch (err) {
            console.error(err);
            res.sendStatus(400).send({ message: err.message });
        }
    }
}