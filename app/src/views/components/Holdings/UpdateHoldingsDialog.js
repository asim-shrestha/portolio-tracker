import React, { useState, useContext } from 'react'
import { useSnackbar } from 'notistack';
import getResErrorMessage from '../../helpers/ErrorHelper';
import Axios from 'axios'
import TextField from '@material-ui/core/TextField';
import {UserContext} from '../Auth/UserStore';
import AppDialog from '../AppDialog';
import MenuItem from '@material-ui/core/MenuItem';

// If date or action is supplied, the option to change it is not available.
export default ({open, onClose, title, buttonClick, buttonText, dateValue, actionValue}) => {
    const [user, setUser] = useContext(UserContext);
    const [symbol, setSymbol] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [date, setDate] = useState(dateValue || '');
    const [commission, setCommission] = useState('');
    const [action, setAction] = useState(actionValue || '');

    const buildHolding = () => {
        return {
            user_id:user.id,
            quantity:parseInt(quantity),
            action:actionValue || action,
            symbol:symbol,
            price:parseFloat(price),
            date:dateValue || String(date),
            commission: parseFloat(commission)
        }
    }
    return (
        <AppDialog open={open} onClose={() => {onClose(); setAction('');}} title={title} buttonClick={() => buttonClick(buildHolding())} buttonText={buttonText}>
            <TextField variant="outlined" margin="dense" fullWidth onChange={e => setSymbol(e.target.value)} label="Symbol"/>
            <TextField variant="outlined" margin="dense" fullWidth onChange={e => setPrice(e.target.value)} label="Price"/>
            <TextField variant="outlined" margin="dense" fullWidth onChange={e => setQuantity(e.target.value)} label="Quantity"/>
            {
                // If default date is not provided, give date option
                (!dateValue) ?
                <TextField variant="outlined" margin="dense" fullWidth onChange={e => setDate(e.target.value)} label="Date" type="date" defaultValue="" InputLabelProps={{shrink: true}} /> :
                <></>
            }
            <TextField variant="outlined" margin="dense" fullWidth onChange={e => setCommission(e.target.value)} label="Commission"/>
            {
                // If default action is not provided, give action option
                (!actionValue) ?
                <TextField variant="outlined" margin="dense" fullWidth onChange={e => setAction(e.target.value)} label="Action" value={action} select>
                    <MenuItem value={''} disabled>Actions:</MenuItem>
                    <MenuItem value={'buy'}>Buy</MenuItem>
                    <MenuItem value={'sell'}>Sell</MenuItem>
                </TextField> :
                <></>
            }
        </AppDialog>
    )
}