import React from 'react'
import UpdateHoldingsDialog from './UpdateHoldingsDialog';

export default ({open, onClose, resetHoldings}) => {
    return (
        <UpdateHoldingsDialog
            open={open}
            onClose={() => {onClose();}}
            title={"Add Individual Holding"}
            buttonText={"Add"}
            resetHoldings={resetHoldings}
        />
    )
}