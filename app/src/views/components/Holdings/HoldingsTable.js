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

const useStyles = makeStyles((theme) => ({
    tableHeader: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    }
}));

// Format currency related strings to include commas and only two decimal places
const currencyFormat = (n) => {
    return n.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

// Table to display user holdings data
const HoldingsTable = ({data}) => {
    const classes = useStyles();
    
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.tableHeader} >Symbol</TableCell>
                        <TableCell className={classes.tableHeader} align="right">Quantity</TableCell>
                        <TableCell className={classes.tableHeader} align="right">Book Value ($)</TableCell>
                        <TableCell className={classes.tableHeader} align="right">Market Value ($)</TableCell>
                        <TableCell className={classes.tableHeader} align="right">Unrealized Gain ($)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((stock) => (
                        <TableRow key={stock.symbol}>
                            <TableCell component="th" scope="row"><b>{stock.symbol}</b></TableCell>
                            <TableCell align="right">{parseInt(stock.quantity).toLocaleString()}</TableCell>
                            <TableCell align="right">{currencyFormat(parseFloat(stock.bookValue))}</TableCell>
                            <TableCell align="right">{currencyFormat(parseFloat(stock.marketValue))}</TableCell>
                            <TableCell align="right">{currencyFormat(parseFloat(stock.unrealizedGain)) + " (" + parseFloat(stock.unrealizedPercentage).toFixed(2) + "%)"}</TableCell>
                        </TableRow>
                    ))}
                    {
                        // Display a table row containing a spinner when data is being loaded
                        (!data || !data.length) ? <SpinnerHoldingsTableRow/>: <></>
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default HoldingsTable;