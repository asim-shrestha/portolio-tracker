import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';

const SpinnerHoldingsTableRow = () => {
    return (
        <TableRow>
            <TableCell component="th" scope="row"/>
            <TableCell align="right"/>
            <TableCell align="right">
                <CircularProgress size={30} color="primary"/>
            </TableCell>
            <TableCell align="right"/>
            <TableCell align="right"/>
        </TableRow>
    )
}

export default SpinnerHoldingsTableRow;