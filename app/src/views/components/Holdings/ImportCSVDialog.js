import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import AppDialog from '../AppDialog';
import { readString } from 'react-papaparse';
import ImportCSVHeaderMatching from './ImportCSVHeaderMatching';
import ImportCSVUpload from './ImportCSVUpload';
import { useSnackbar } from 'notistack';
import getResErrorMessage from '../../helpers/ErrorHelper';

export default ({ open, onClose, resetHoldings }) => {
    const [parsedFile, setParsedFile] = useState([]);
    const [headers, setHeaders] = useState([]);                      // headers from file
    const [confirmHeaders, setConfirmHeaders] = useState(false);     // display header confirmation form
    const [symbol, setSymbol] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [date, setDate] = useState('');
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const uploadHandler = (event) => {
        // function to reset file when error is found
        const resetFile = () => {
            document.getElementById('CSVUpload').value = '';
        };

        // reading headers
        const reader = new FileReader();
        // file -> string
        reader.readAsText(event.target.files[0]);
        // read as a string
        reader.onload = (event) => {
            const fileContent = event.target.result;
            const results = readString(fileContent);     // papaparse
            let safeToContinue = true;

            // remove last line if empty
            if(results.data[results.data.length - 1][0] === ''){
                results.data.splice(-1)
            }

            // check for empty cells
            results.data.map(row => {
                if (row.indexOf('') !== -1) {
                    enqueueSnackbar('Please ensure your CSV file has no empty cells', { variant: "error" });
                    safeToContinue = false;
                    resetFile();
                }
            });

            // check for missing required columns
            if (results.data[0].length < 4) {
                enqueueSnackbar('Please ensure your CSV file has the required number of columns', { variant: "error" });
                safeToContinue = false;
                resetFile();
            }

            // check for duplicates in headers
            if (new Set(results.data[0]).size !== results.data[0].length) {
                enqueueSnackbar('Please ensure your CSV file does not contain duplicate column names', { variant: "error" });
                safeToContinue = false;
                resetFile();
            }

            if (safeToContinue) {
                setHeaders(results.data[0]);
                setSymbol(results.data[0][0] ? results.data[0][0] : '');
                setPrice(results.data[0][1] ? results.data[0][1] : '');
                setQuantity(results.data[0][2] ? results.data[0][2] : '');
                setDate(results.data[0][3] ? results.data[0][3] : '');
                setParsedFile(results.data);
                setConfirmHeaders(true);
                resetFile();
            }
        };

        reader.onerror = (event) => {
            enqueueSnackbar('Failed to read file\n\n' + reader.error, { variant: "error" });
            resetFile();
        };
    };

    const submitHandler = (event) => {
        event.preventDefault();

        if (parsedFile.length === 0) {
            enqueueSnackbar('No file uploaded', { variant: "error" });
        }
        // if headers are not yet mapped
        else if (!symbol || !price || !quantity || !date) {
            enqueueSnackbar('You must select a value for each field', { variant: "error" });
        }
        // duplicate matches
        else if (new Set([symbol, price, quantity, date]).size !== 4) {
            enqueueSnackbar('You cannot select the same column multiple times', { variant: "error" });
        }
        else {
            // mapping columns to columns found in csv file
            const map = {
                symbol: headers.indexOf(symbol),
                price: headers.indexOf(price),
                quantity: headers.indexOf(quantity),
                date: headers.indexOf(date),
            };

            const data = {
                data: parsedFile,
                map: map,
            };
            const token = localStorage.getItem('token');

            // sending to server
            Axios.post('/api/activity/upload', data, {
                headers: { Authorization: `JWT ${token}` }
            })
                .then(res => {
                    setParsedFile([])
                    setConfirmHeaders(false);
                    resetHoldings();
                    onClose();
                    enqueueSnackbar('CSV file was imported successfully!', { variant: 'success' });
                })
                .catch((err) => {
                    setParsedFile([])
                    setConfirmHeaders(false);
                    enqueueSnackbar("Error parsing CSV data. Please ensure all data within your CSV file is valid", { variant: 'error' });
                    // show which symbol is bad
                    if(err.response.data){
                        enqueueSnackbar(err.response.data.message, { variant: 'error' });
                    }
                    resetHoldings();
                    onClose();
                });
        }

    };

    return (
        <AppDialog open={open} onClose={onClose} title={"Import Holdings From CSV"} buttonClick={submitHandler} buttonText={"Import"}>

            {confirmHeaders ?
                // Matching column headers screen
                <ImportCSVHeaderMatching
                    headers={headers}
                    symbol={symbol} price={price} quantity={quantity} date={date}
                    setSymbol={setSymbol} setPrice={setPrice} setQuantity={setQuantity} setDate={setDate}
                />
                :
                // Upload screen
                <ImportCSVUpload uploadHandler={uploadHandler} />
            }
        </AppDialog>
    );
};