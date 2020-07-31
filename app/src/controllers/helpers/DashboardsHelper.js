import { quote, iexSymbols } from 'iexcloud_api_wrapper'
import moment from 'moment'

export default class ActivitiesHelper {
    indexActivitiesByDate(activities) {
        return new Promise((resolve, reject) => {
            let indexedData = {}

            for (let a of activities) {
                let date = moment(a.date).format('YYYY-MM-DD')
                let quantity = (a.action == 'buy') ? a.quantity : a.quantity * (-1)
                const data = {
                    symbol: a.symbol,
                    price: parseFloat(a.price).toFixed(2),
                    quantity: quantity
                }

                if (!indexedData[date]) {
                    indexedData[date] = []
                }
                indexedData[date].push(data)
            }
            resolve(indexedData)
        })
    }

    indexHistoricalPricesByDate(priceData) {
        return new Promise((resolve, reject) => {
            let indexedData = {}

            for (let p of priceData) {
                let date = moment(p.date).format('YYYY-MM-DD')

                indexedData[date] = {
                    symbol: p.symbol,
                    price: parseFloat(p.close).toFixed(2),
                }
            }
            resolve(indexedData)
        })
    }

    generatePerformanceData(priceDataList, activitiesData) {
        return new Promise((resolve, reject) => {
            const startDate = moment.min(Object.keys(activitiesData).map(d => moment(d))).format('YYYY-MM-DD');
            const endDate = moment().format('YYYY-MM-DD');

            let quantity = {};
            let latest_price = {};
            let cumulative_return = 1;
            let prev_value = 0;
            let curr_value = 0;
            let book_value = 0;
            let gain = 0
            // TODO: implement cash feature
            // current simplification assumes cash position = stocks sold by users
            let cash = 0
            let performanceData = [];
            let d = startDate

            while (!(moment(d).isSame(moment(endDate)))) {
                if (this.isWeekend(d)) {
                    d = this.incrementDate(d)
                    continue;
                }
                // extract all symbols required for calculation
                let symbols = Object.keys(quantity)

                // calculate current market value of all investments
                for (let p of priceDataList) {
                    if (p[d]) {
                        let data = p[d]
                        if (quantity[data.symbol]) {
                            curr_value += quantity[data.symbol] * data.price
                            this.removeElement(symbols, data.symbol)
                            latest_price[data.symbol] = data.price
                        }
                    }
                }

                // calculate market value for all investment not traded on the day of
                // calculate using latest known closing price
                for (let s of symbols) {
                    // skip update if latest price is unknown
                    if (latest_price[s]) {
                        curr_value += quantity[s] * latest_price[s]
                    }
                }

                // calculate return compared to yesterday's price
                if (prev_value == 0) {
                    cumulative_return = 0
                } else {
                    gain += (parseFloat(curr_value) - prev_value)
                    cumulative_return = gain / (book_value + cash) * 100
                }

                performanceData.push({
                    x: d,
                    y: cumulative_return
                })

                if (activitiesData[d]) {
                    for (let a of activitiesData[d]) {
                        if (!quantity[a.symbol]) {
                            quantity[a.symbol] = 0
                        }
                        if (a.quantity < 0) {
                            cash += a.quantity * a.price
                        }
                        quantity[a.symbol] += a.quantity
                        // remove symbol, quantity if <= 0
                        if (quantity[a.symbol] <= 0) {
                            delete quantity[a.symbol]
                        }
                        let new_activity = parseFloat(a.quantity) * a.price
                        book_value += new_activity
                        curr_value += new_activity
                    }
                }
                prev_value = curr_value
                curr_value = 0
                d = this.incrementDate(d)
            }

            resolve(performanceData);
        })
    }

    async generateSymbolPerformanceData(indexedPriceData) {
        return new Promise((resolve, reject) => {
            // Get all date keys from data
            let dates = Object.keys(indexedPriceData).map(d => moment(d).format('YYYY-MM-DD'));

            // For each date, create a datapoint consisting of date and price
            let performanceData = dates.map(date => {
                return {
                    x: date,
                    y: indexedPriceData[date].price
                }
            }) 
            resolve(performanceData);
        })
    }

    groupActivitiesBySymbol(activities, priceData) {
        return new Promise((resolve, reject) => {
            let indexedData = {}

            for (let a of activities) {
                let symbol = a.symbol
                let prevClosingPrice = priceData[symbol]
                let quantity = (a.action == 'buy') ? a.quantity : a.quantity * (-1)

                let marketValue = parseFloat(prevClosingPrice) * quantity
                let bookValue = parseFloat(a.price) * parseFloat(quantity) + parseFloat(a.commission)

                if (!indexedData[symbol]) {
                    indexedData[symbol] = {
                        quantity: quantity,
                        prevClosingPrice: prevClosingPrice,
                        marketValue: marketValue,
                        bookValue: bookValue,
                    }
                } else {
                    indexedData[symbol].quantity += parseFloat(quantity)
                    indexedData[symbol].marketValue += parseFloat(marketValue)
                    indexedData[symbol].bookValue += parseFloat(bookValue)
                }

                marketValue = indexedData[symbol].marketValue
                bookValue = indexedData[symbol].bookValue
                indexedData[symbol].unrealizedGain = `${marketValue - bookValue}`
                indexedData[symbol].unrealizedPercentage = `${((marketValue - bookValue) / bookValue) * 100}%`
            }
            resolve(indexedData)
        })
    }

    removeSoldStocks(indexedData) {
        return new Promise((resolve, reject) => {
            for (let key in indexedData) {
                if (indexedData[key].quantity <= 0) {
                    delete indexedData[key]
                }
            }
            resolve()
        })
    }

    findSymbols(activities) {
        return new Promise((resolve, reject) => {
            let symbols = new Set()

            for (let a of activities) {
                symbols.add(a.symbol)
            }

            resolve(symbols)
        })
    }

    removeElement(array, element) {
        const index = array.indexOf(element);
        index > - 1 ? array.splice(index, 1) : array
    }

    isWeekend(d) {
        const date = new Date(d)
        return ((date.getDay() >= 6) || (date.getDay() <= 0) ? true : false)
    }

    incrementDate(d) {
        return moment(d).add(1, 'day').format('YYYY-MM-DD')
    }


}