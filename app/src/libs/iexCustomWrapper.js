import * as dotenv from "dotenv";
import Axios from 'axios';

const baseURL = "https://cloud.iexapis.com/";
const sandboxURL = "https://sandbox.iexapis.com/";

const sk = process.env.IEXCLOUD_SECRET_KEY;
const pk = process.env.IEXCLOUD_PUBLIC_KEY;
const base_pk = process.env.IEXCLOUD_PUBLIC_KEY_PROD;
const apiversion = process.env.IEXCLOUD_API_VERSION;

// referenced from: https://github.com/schardtbc/iexcloud_api_wrapper
const prefix = (pk) => {
    return pk && pk[0] === "T" ? sandboxURL : baseURL;
};

// iex batch call reference: https://intercom.help/iexcloud/en/articles/2852094-how-do-i-query-multiple-symbols-or-data-types-in-one-api-call
// symbols: set
// types: string (single type)
// range: string
export const batchData = (symbols, type, range = false, sandbox = true) => {
    return new Promise((resolve, reject) => {
        const stockMarket = 'stock/market/';
        const batch = 'batch';
        const key = sandbox ? pk : base_pk;
        if (symbols && type) {
            Axios.get(`${prefix(key)}${apiversion}/${stockMarket}${batch}`, {
                params: {
                    types: type,
                    symbols: [...symbols].join(','),
                    ...range && { range: range },
                    token: key
                }
            }).then((res) => {
                resolve(res.data);
            }).catch((err) => {
                console.error(err);
            });
        } else {
            resolve({});
        }

    });
};

