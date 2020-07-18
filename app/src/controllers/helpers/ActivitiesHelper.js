import { quote, iexSymbols } from 'iexcloud_api_wrapper'

export default class ActivitiesHelper { 
    validateSymbol(symbol, iexSymbols) {
        return new Promise((resolve, reject) => {
            resolve(iexSymbols.find(element => element.symbol == symbol) ? true : false)
        })
    }
}