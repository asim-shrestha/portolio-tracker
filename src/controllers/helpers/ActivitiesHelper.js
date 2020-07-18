import { quote, iexSymbols } from 'iexcloud_api_wrapper'

export default class ActivitiesHelper { 
    generateSymbols(iexSymbols) {
        let symbols = [];
        const length = iexSymbols.length;
        
        for (let i = 0; i < length; i++ ){
            symbols[i] = iexSymbols[i].symbol
        }
        return symbols
    }

    validateSymbol(sym, iexSymbols) {
        return new Promise((resolve, reject) => {
            const symbols = this.generateSymbols(iexSymbols)

            if (symbols.includes(sym)) {
                resolve(true)
            } else {
                resolve(false)
            }
        })
    }
}