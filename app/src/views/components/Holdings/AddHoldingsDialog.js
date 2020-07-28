import React, { useState, useContext } from 'react'
import { useSnackbar } from 'notistack';
import getResErrorMessage from '../../helpers/ErrorHelper';
import Axios from 'axios'
import TextField from '@material-ui/core/TextField';
import {UserContext} from '../Auth/UserStore';
import UpdateHoldingsDialog from './UpdateHoldingsDialog';
import MenuItem from '@material-ui/core/MenuItem';

export default ({open, onClose, resetHoldings}) => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const onAdd = (holding) => {
        Axios.post('/api/activity/order', holding).then(() => {
            onClose();
            resetHoldings();
            closeSnackbar(); // Close on success
            enqueueSnackbar('Holding successfully added!', {variant: 'success'});
        }).catch((err) => {
            enqueueSnackbar(getResErrorMessage(err), {variant: 'error'});
        })
        
    }

    return (
        <UpdateHoldingsDialog
            open={open}
            onClose={() => {onClose();}}
            title={"Add Individual Holding"}
            buttonClick={onAdd}
            buttonText={"Add"}
        />
    )
}