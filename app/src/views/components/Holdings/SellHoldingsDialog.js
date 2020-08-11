import React from 'react';
import UpdateHoldingsDialog from './UpdateHoldingsDialog';
import Moment from 'moment';

export default ({ open, onClose, resetHoldings, symbol }) => {
    const dialogText = "Sell " + (symbol || '') + " Stock";
    const snackBarText = (symbol || '') + " successfully sold!";

    return (
        <UpdateHoldingsDialog
            open={open}
            onClose={() => { onClose(); }}
            title={dialogText}
            buttonText={dialogText}
            symbolValue={symbol}
            actionValue={"sell"}
            resetHoldings={resetHoldings}
            snackBarText={snackBarText}
        />
    );
};