import { quote, iexSymbols } from 'iexcloud_api_wrapper'
import moment from 'moment'

export default class DashboardsHelper {
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

    indexHistoricalPricesByDate(chartData, symbol) {
        return new Promise((resolve, reject) => {
            let indexedData = {}

            for (let c of chartData) {
                let date = moment(c.date).format('YYYY-MM-DD')

                indexedData[date] = {
                    symbol: symbol,
                    price: parseFloat(c.close).toFixed(2),
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
            console.log(activitiesData)
            while (!(moment(d).isSame(moment(endDate)))) {
                if (this.isWeekend(d)) {
                    d = this.incrementDate(d)
                    continue;
                }
                // extract all symbols required for calculation
                let symbols = Object.keys(quantity)
                console.log(d, gain)
                // calculate current market value of all investments
                for (let p of priceDataList) {
                    if (p[d]) {
                        let data = p[d]
                        if (quantity[data.symbol]) {
                            curr_value += quantity[data.symbol] * data.price
                            this.removeElement(symbols, data.symbol)
                            latest_price[data.symbol] = data.price
                        }
                        console.log(d, data.symbol, quantity[data.symbol], data.price, curr_value)
                    }
                }

                // calculate market value for all investment not traded on the day of
                // calculate using latest known closing price
                for (let s of symbols) {
                    // skip update if latest price is unknown
                    if (latest_price[s]) {
                        curr_value += quantity[s] * latest_price[s]
                        console.log(s, quantity[s], latest_price[s], curr_value)
                    }
                }

                console.log(d, curr_value)

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
                let prevClosingPrice = priceData[symbol].price
                let quantity = (a.action == 'buy') ? a.quantity : a.quantity * (-1)

                let marketValue = parseFloat(prevClosingPrice) * quantity
                let bookValue = parseFloat(a.price) * parseFloat(quantity) + parseFloat(a.commission)

                if (!indexedData[symbol]) {
                    indexedData[symbol] = {
                        companyName: priceData[symbol].companyName,
                        quantity: quantity,
                        prevClosingPrice: prevClosingPrice,
                        marketValue: marketValue,
                        marketCap: this.categorizeMarketCap(priceData[symbol].marketCap),
                        country: priceData[symbol].country,
                        industry: priceData[symbol].industry,
                        sector: priceData[symbol].sector,
                        bookValue: bookValue
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

    isEmptyArray(array) {
        if (array.length < 1 || array == undefined) {
            return true
        }

        return false
    }

    incrementDate(d) {
        return moment(d).add(1, 'day').format('YYYY-MM-DD')
    }

    categorizeMarketCap(size) {
        const billion = 1000000000

        if (size < 0.3 * billion) {
            return 'micro-cap'
        } else if (size >= 0.3 * billion  && size < 2 * billion) {
            return 'small-cap'
        } else if (size >= 2 * billion && size < 10 * billion) {
            return 'mid-cap'
        } else if (size >= 10 * billion) {
            return 'large-cap'
        } else {
            return 'unknown'
        }
    }

}