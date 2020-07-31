import Axios from 'axios';
import DashboardsHelper from '../helpers/DashboardsHelper'
const helper = new DashboardsHelper()


export default class ActivitiesHelper {
    getInvalidQuantityMessage = () => 'You are holding an insufficient position to cover your selling quantity. Please verify your order, and try again';
 
    getInvalidSymbolMessage = () => 'The symbol you entered is invalid. Please check the symbol, and try again.';

    getInternalSymbolsCache() {
        return new Promise((resolve, reject) => {
            Axios.get('127.0.0.1:8080/api/caches/symbols').then((res) => {
                console.log("axios result: ", res)
                resolve(res)
            }).catch((err) => {
                console.error(err);
            });
        })
    }
    
    validateSymbol(symbol, iexSymbols) {
        return new Promise((resolve, reject) => {
            resolve(iexSymbols.find(element => element == symbol) ? true : false)
        })
    }

}