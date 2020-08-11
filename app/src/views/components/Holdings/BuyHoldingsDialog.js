import React from 'react';
import UpdateHoldingsDialog from './UpdateHoldingsDialog';
import Moment from 'moment';

export default ({ open, onClose, resetHoldings, symbol }) => {
    const dialogText = "Buy " + (symbol || '') + " Stock";
    const snackBarText = (symbol || '') + " successfully bought!";

    return (
        <UpdateHoldingsDialog
            open={open}
            onClose={() => { onClose(); }}
            title={dialogText}
            buttonText={dialogText}
            symbolValue={symbol}
            actionValue={"buy"}
            resetHoldings={resetHoldings}
            snackBarText={snackBarText}
        />
    );
};