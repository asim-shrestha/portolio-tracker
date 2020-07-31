import moment from 'moment'
import DashboardsHelper from '../helpers/DashboardsHelper'
const helper = new DashboardsHelper()

export default class CachesHelper {
    retrieveNewData(latestCachedDate) {
        return new Promise((resolve, reject) => {
            if (!latestCachedDate){
                resolve(true)
            }

            const latestCachedDay = moment(latestCachedDate).day()
            const today = moment().format('YYYY-MM-DD') 

            if(helper.isWeekend(today) && latestCachedDay == 5){
                resolve(false)
            } else if (moment(latestCachedDate).isSame(moment(today))) {
                resolve(false)
            }

            resolve(true)
        })
    }

    processAPISymbols(iexSymbols){
        return new Promise((resolve, reject) => {
            if(iexSymbols) {
                let symbols = []

                for (let row of iexSymbols) {
                    symbols.push(row.symbol)
                }

                resolve({
                    date: moment().format('YYYY-MM-DD'),
                    symbols: symbols
                }) 
            }
            resolve(false)
        })
    }
}