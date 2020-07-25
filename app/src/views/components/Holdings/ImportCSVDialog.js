import React, { useState, useContext, useEffect } from 'react'
import Axios from 'axios'
import TextField from '@material-ui/core/TextField';
import { UserContext } from '../Auth/UserStore';
import AppDialog from '../AppDialog';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import { readString } from 'react-papaparse'
import { header } from 'express-validator';

export default ({ open, onClose }) => {
    const [user, setUser] = useContext(UserContext);
    const [fileParsed, setFileParsed] = useState([])
    const [headers, setHeaders] = useState([])                      // headers from file
    const [confirmHeaders, setConfirmHeaders] = useState(false)     // display header confirmation form
    const [symbol, setSymbol] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [date, setDate] = useState('');

    const uploadHandler = (event) => {

        // reading headers
        const reader = new FileReader()
        // file -> string
        reader.readAsText(event.target.files[0])
        // read as a string
        reader.onload = (event) => {
            const fileContent = event.target.result
            const results = readString(fileContent)     // papaparse

            // check for empty cells
            results.data.map(row => {
                if (row.indexOf('') !== -1) {
                    alert('Empty cells detected')
                    // reload page after to remove uploaded file
                    location.reload()
                }
            })

            // no duplicates in headers
            if (new Set(results.data[0]).size === results.data[0].length) {
                setHeaders(results.data[0])
                setFileParsed(results.data)
                setConfirmHeaders(true)
            }
            else {
                alert('Duplicate column names detected')
                // reload page after to remove uploaded file
                location.reload()
            }
        }
        reader.onerror = (event) => {
            alert('Failed to read file\n\n' + reader.error)
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
                user: user,
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
                <div>
                    <Typography variant="h5" align="center" color="primary">Please match the following:</Typography>
                    <br />
                    <Grid container spacing={3}>
                        <Grid item xs={3}>
                            {/* empty for spacing purposes */}
                            <Typography align="left" color="primary"></Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <Typography align="center" color="primary">Columns found in CSV file</Typography>
                        </Grid>

                        <Grid item xs={3}>
                            <Typography variant="h6" align="left" color="primary">Symbol</Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <FormControl variant="outlined" fullWidth>
                                <Select onChange={e => setSymbol(e.target.value)} value={symbol}>
                                    {headers.map((element, i) => <MenuItem key={i} value={element}>{element}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={3}>
                            <Typography variant="h6" align="left" color="primary">Price</Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <FormControl variant="outlined" fullWidth>
                                <Select onChange={e => setPrice(e.target.value)} value={price}>
                                    {headers.map((element, i) => <MenuItem key={i} value={element}>{element}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={3}>
                            <Typography variant="h6" align="left" color="primary">Quantity</Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <FormControl variant="outlined" fullWidth>
                                <Select onChange={e => setQuantity(e.target.value)} value={quantity}>
                                    {headers.map((element, i) => <MenuItem key={i} value={element}>{element}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={3}>
                            <Typography variant="h6" align="left" color="primary">Date</Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <FormControl variant="outlined" fullWidth>
                                <Select onChange={e => setDate(e.target.value)} value={date}>
                                    {headers.map((element, i) => <MenuItem key={i} value={element}>{element}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>

                    </Grid>


                </div>
                :
                <div>
                    <Typography variant="h5" align="center" color="primary">
                        Upload a CSV file with the following columns:
                    </Typography>
                    <ul>
                        <li>Symbol (example: TSLA, AMZN)</li>
                        <li>Date (YYYY-MM-DD)</li>
                        <li>Price</li>
                        <li>Quantity</li>
                    </ul>

                    <form>
                        <input type="file" name="file" accept=".csv" onChange={uploadHandler} />
                    </form>
                </div>
            }
        </AppDialog>
    )
}