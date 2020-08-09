import React from 'react';
import Axios from 'axios';
import AppDialog from '../AppDialog';
import { useSnackbar } from 'notistack';
import getResErrorMessage from '../../helpers/ErrorHelper';
import Typography from '@material-ui/core/Typography';

export default ({ open, onClose, resetHoldings, symbol }) => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const handleDelete = () => {
        const token = localStorage.getItem('token');
        Axios.delete('/api/activity/delete', {
            data: {
                symbol: symbol
            },
            headers: {
                Authorization: `JWT ${token}`
            }
        }).then(() => {
            resetHoldings();
            onClose();
        }).catch((err) => {
            enqueueSnackbar(getResErrorMessage(err), { variant: 'error' });
        });
    };

    return (
        <AppDialog open={open} onClose={onClose} title={"Delete " + symbol + " row"} buttonClick={handleDelete} buttonText={"Yes"} >
            <Typography>Are you sure you would like to delete your {symbol} holding information? You cannot undo this.</Typography>
        </AppDialog>
    );
};