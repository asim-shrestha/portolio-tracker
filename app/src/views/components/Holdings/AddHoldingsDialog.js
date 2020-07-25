import React, { useState, useContext } from 'react'
import { useSnackbar } from 'notistack';
import getResErrorMessage from '../../helpers/ErrorHelper';
import Axios from 'axios'
import TextField from '@material-ui/core/TextField';
import {UserContext} from '../Auth/UserStore';
import AppDialog from '../AppDialog';
import MenuItem from '@material-ui/core/MenuItem';

export default ({open, onClose, resetHoldings}) => {

    const [user, setUser] = useContext(UserContext);
    const [symbol, setSymbol] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [date, setDate] = useState('');
    const [commission, setCommission] = useState('');
    const [action, setAction] = useState('');
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const onAdd = () => {
        Axios.post('/api/activity/order', {
            user_id:user.id,
            quantity:parseInt(quantity),
            action:action,
            symbol:symbol,
            price:parseFloat(price),
            date:String(date),
            commission: parseFloat(commission)
        }).then((res) => {
            onClose();
            setAction('');  // Reset action as select components must be tied to values
            resetHoldings();
            closeSnackbar(); // Close on success
            enqueueSnackbar('Holding successfully added!', {variant: 'success'});
        }).catch((err) => {
            enqueueSnackbar(getResErrorMessage(err), {variant: 'error'});
        })
        
    }

    return (
        <AppDialog open={open} onClose={() => {onClose(); setAction('');}} title={"Add Individual Holding"} buttonClick={onAdd} buttonText={"Add"}>
            <TextField variant="outlined" margin="dense" fullWidth onChange={e => setSymbol(e.target.value)} label="Symbol"/>
            <TextField variant="outlined" margin="dense" fullWidth onChange={e => setPrice(e.target.value)} label="Price"/>
            <TextField variant="outlined" margin="dense" fullWidth onChange={e => setQuantity(e.target.value)} label="Quantity"/>
            <TextField variant="outlined" margin="dense" fullWidth onChange={e => setDate(e.target.value)} label="Date" type="date" defaultValue="" InputLabelProps={{shrink: true}} />
            <TextField variant="outlined" margin="dense" fullWidth onChange={e => setCommission(e.target.value)} label="Commission"/>
            <TextField variant="outlined" margin="dense" fullWidth onChange={e => setAction(e.target.value)} label="Action" value={action} select>
                <MenuItem value={''} disabled>Actions:</MenuItem>
                <MenuItem value={'buy'}>Buy</MenuItem>
                <MenuItem value={'sell'}>Sell</MenuItem>
            </TextField>
        </AppDialog>
    )
}