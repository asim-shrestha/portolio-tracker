import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import AppDialog from '../AppDialog';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import { readString } from 'react-papaparse'
import ImportCSVHeaderMatching from './ImportCSVHeaderMatching';
import ImportCSVUpload from './ImportCSVUpload'

export default ({ open, onClose }) => {
    const [fileParsed, setFileParsed] = useState([])
    const [headers, setHeaders] = useState([])                      // headers from file
    const [confirmHeaders, setConfirmHeaders] = useState(false)     // display header confirmation form
    const [symbol, setSymbol] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [date, setDate] = useState('');

    const uploadHandler = (event) => {

        // function to reset file when error is found
        const resetFile = () => {
            document.getElementById('CSVUpload').value = ''
        }

        // reading headers
        const reader = new FileReader()
        // file -> string
        reader.readAsText(event.target.files[0])
        // read as a string
        reader.onload = (event) => {
            const fileContent = event.target.result
            const results = readString(fileContent)     // papaparse
            let safeToContinue = true
            // check for empty cells
            results.data.map(row => {
                if (row.indexOf('') !== -1) {
                    alert('Empty cells detected')
                    safeToContinue = false
                    resetFile()
                    // reload page after to remove uploaded file
                    // location.reload()
                }
            })

            // check for duplicates in headers
            if (new Set(results.data[0]).size !== results.data[0].length) {
                alert('Duplicate column names detected')
                safeToContinue = false
                resetFile()
            }
            
            if (safeToContinue) {
                setHeaders(results.data[0])
                setFileParsed(results.data)
                setConfirmHeaders(true)
            }
        }

        reader.onerror = (event) => {
            alert('Failed to read file\n\n' + reader.error)
            resetFile()
        }
    }

    const submitHandler = (event) => {
        event.preventDefault()

        if (fileParsed.length === 0) {
            alert('No file uploaded')
        }
        // if headers are not yet mapped
        else if (!symbol || !price || !quantity || !date) {
            alert('Columns not matched')
        }
        // duplicate
        else if (new Set([symbol, price, quantity, date]).size !== 4) {
            alert('There are duplicate matches')
        }
        else {
            // mapping columns to columns found in csv file
            const map = {
                symbol: headers.indexOf(symbol),
                price: headers.indexOf(price),
                quantity: headers.indexOf(quantity),
                date: headers.indexOf(date),
            }

            const data = {
                data: fileParsed,
                map: map,
            }
            const token = localStorage.getItem('token')

            // sending to server
            Axios.post('/api/upload', data, {
                headers: { Authorization: `JWT ${token}` }
            })
                .then(res => {
                    console.log('Upload done', res.data.message)
                    location.reload()
                })
                .catch(error => {
                    console.log('error msg', error)
                    alert(error)
                    location.reload()
                })
        }

    }

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
    )
}