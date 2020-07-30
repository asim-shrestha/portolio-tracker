export default class ActivitiesHelper {
    getInvalidQuantityMessage = () => 'You are holding an insufficient position to cover your selling quantity. Please verify your order, and try again';
 
    getInvalidSymbolMessage = () => 'The symbol you entered is invalid. Please check the symbol, and try again.';

    validateSymbol(symbol, iexSymbols) {
        return new Promise((resolve, reject) => {
            resolve(iexSymbols.find(element => element.symbol == symbol) ? true : false)
        })
    }

}