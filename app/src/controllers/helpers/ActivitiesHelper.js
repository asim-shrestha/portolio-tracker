export default class ActivitiesHelper { 
    getInvalidSymbolMessage = () => 'The symbol you entered is invalid. Please check the symbol, and try again.';

    validateSymbol(symbol, iexSymbols) {
        return new Promise((resolve, reject) => {
            resolve(iexSymbols.find(element => element.symbol == symbol) ? true : false)
        })
    }

}