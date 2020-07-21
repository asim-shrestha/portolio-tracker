import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
    tableHeader: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    }
}));

const HoldingsTable = (props) => {
    const classes = useStyles(props);

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.tableHeader} >Symbol</TableCell>
                        <TableCell className={classes.tableHeader} align="right">Quantity</TableCell>
                        <TableCell className={classes.tableHeader} align="right">Book Value</TableCell>
                        <TableCell className={classes.tableHeader} align="right">Market Value</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.data.map((row) => (
                        <TableRow key={row.symbol}>
                            <TableCell component="th" scope="row"><b>{row.symbol}</b></TableCell>
                            <TableCell align="right">{row.quantity}</TableCell>
                            <TableCell align="right">{row.bookValue}</TableCell>
                            <TableCell align="right">{row.marketValue}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default HoldingsTable;