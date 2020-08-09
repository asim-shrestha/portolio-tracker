import React, { useState, useContext } from 'react';
import { useSnackbar } from 'notistack';
import getResErrorMessage from '../../helpers/ErrorHelper';
import Axios from 'axios';
import TextField from '@material-ui/core/TextField';
import { UserContext } from '../Auth/UserStore';
import AppDialog from '../AppDialog';
import MenuItem from '@material-ui/core/MenuItem';

// Dialog that deals with updating user holdings
// If a symbolValue, dateValue, or actionValue is supplied, then the option to set these fields are not given
export default ({ open, onClose, title, buttonText, symbolValue, dateValue, actionValue, snackBarText, resetHoldings }) => {
    const [user, setUser] = useContext(UserContext);
    const [symbol, setSymbol] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [date, setDate] = useState('');
    const [commission, setCommission] = useState('');
    const [action, setAction] = useState('buy'); // Default to buy

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const handleButtonClick = () => {
        const token = localStorage.getItem('token');
        Axios.post('/api/activity/order', {
            user_id: user.id,
            quantity: parseInt(quantity),
            action: actionValue || action,
            symbol: symbolValue || symbol,
            price: parseFloat(price),
            date: dateValue || String(date),
            commission: parseFloat(commission)
        }, {
            headers: {
                'Authorization': `JWT ${token}`
            }
        }).then(() => {
            onClose();
            resetHoldings();
            closeSnackbar(); // Close on success
            enqueueSnackbar(snackBarText || 'Holding successfully added!', { variant: 'success' });
        }).catch((err) => {
            enqueueSnackbar(getResErrorMessage(err), { variant: 'error' });
        });

    };

    return (
        <AppDialog open={open} onClose={() => onClose()} title={title} buttonClick={() => handleButtonClick()} buttonText={buttonText}>
            {
                // If default date is not provided, give date option
                (!symbolValue) ?
                    <TextField variant="outlined" margin="dense" fullWidth onChange={e => setSymbol(e.target.value)} label="Symbol" /> :
                    <></>
            }
            <TextField variant="outlined" margin="dense" fullWidth onChange={e => setPrice(e.target.value)} label="Price" />
            <TextField variant="outlined" margin="dense" fullWidth onChange={e => setQuantity(e.target.value)} label="Quantity" />
            {
                // If default date is not provided, give date option
                (!dateValue) ?
                    <TextField variant="outlined" margin="dense" fullWidth onChange={e => setDate(e.target.value)} label="Date" type="date" defaultValue="" InputLabelProps={{ shrink: true }} /> :
                    <></>
            }
            <TextField variant="outlined" margin="dense" fullWidth onChange={e => setCommission(e.target.value)} label="Commission" />
            {
                // If default action is not provided, give action option
                (!actionValue) ?
                    <TextField variant="outlined" margin="dense" fullWidth onChange={e => setAction(e.target.value)} label="Action" value={action} select>
                        <MenuItem value={'buy'}>Buy</MenuItem>
                        <MenuItem value={'sell'}>Sell</MenuItem>
                    </TextField> :
                    <></>
            }
        </AppDialog>
    );
};