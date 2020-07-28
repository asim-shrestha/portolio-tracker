import React from 'react'
import UpdateHoldingsDialog from './UpdateHoldingsDialog';
import moment from 'moment'

export default ({open, onClose, resetHoldings, symbol}) => {
    const dialogText = "Buy " + (symbol || '') + " stock";
    const snackBarText = (symbol || '') + " successfully bought!";

    return (
        <UpdateHoldingsDialog
            open={open}
            onClose={() => {onClose();}}
            title={dialogText}
            buttonText={dialogText}
            symbolValue={symbol}
            dateValue={moment(new Date()).format('YYYY-MM-DD')}
            actionValue={"buy"}
            resetHoldings={resetHoldings}
            snackBarText={snackBarText}
        />
    )
}