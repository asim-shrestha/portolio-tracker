import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import SpinnerHoldingsTableRow from './SpinnerHoldingsTableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    tableHeader: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
}));

// Format currency related strings to include commas and only two decimal places
const currencyFormat = (n) => {
    return n.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

// Table to display user holdings data
const HoldingsTable = ({ data, loadData}) => {

    const handleDelete = (symbol) => {
        const token = localStorage.getItem('token')
        axios.delete('/api/delete', {
            data: {
                symbol: symbol
            },
            headers: {
                Authorization: `JWT ${token}`
            }
        })
            .then(() => {
                loadData()
            })
    }

    const classes = useStyles();
    
    let tableRows = <></>
    if(data) {
        tableRows = data.map((stock) => (
            <TableRow key={stock.symbol}>
                <TableCell>
                    <IconButton onClick={() => { handleDelete(stock.symbol) }}><DeleteForeverIcon /></IconButton>
                </TableCell>
                <TableCell component="th" scope="row"><b>{stock.symbol}</b></TableCell>
                <TableCell align="right">{parseInt(stock.quantity).toLocaleString()}</TableCell>
                <TableCell align="right">{currencyFormat(parseFloat(stock.bookValue))}</TableCell>
                <TableCell align="right">{currencyFormat(parseFloat(stock.marketValue))}</TableCell>
                <TableCell align="right">{currencyFormat(parseFloat(stock.unrealizedGain)) + " (" + parseFloat(stock.unrealizedPercentage).toFixed(2) + "%)"}</TableCell>
            </TableRow>
        ))
    } else {
        tableRows = <SpinnerHoldingsTableRow/>;
    }

    const noHoldingsMessage = <Paper><Typography variant="h5" align="center">You currently have no holdings.</Typography></Paper>;

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.tableHeader} padding='checkbox' />
                        <TableCell className={classes.tableHeader} >Symbol</TableCell>
                        <TableCell className={classes.tableHeader} align="right">Quantity</TableCell>
                        <TableCell className={classes.tableHeader} align="right">Book Value ($)</TableCell>
                        <TableCell className={classes.tableHeader} align="right">Market Value ($)</TableCell>
                        <TableCell className={classes.tableHeader} align="right">Unrealized Gain ($)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableRows}
                </TableBody>
            </Table>
            {
                // Display a no holdings message if the user has no holdings
                (data && data.length == 0) ? noHoldingsMessage : <></>
            }
        </TableContainer>
    );
}

export default HoldingsTable;