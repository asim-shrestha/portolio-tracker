import React, { useState, useContext } from 'react'
import Axios from 'axios'
import TextField from '@material-ui/core/TextField';
import {UserContext} from '../Auth/UserStore';
import AppDialog from '../AppDialog';

export default ({open, onClose}) => {
    const [user, setUser] = useContext(UserContext);
    const [stock, setStock] = useState({
        symbol: '',
        price: '',
        quantity: '',
        date: '',
        commission: '',
        action: 'Buy',
    })

    const updateStock= (attribute, value) => {
        updatedStock = {...stock};
        updateStock[attribute] = value;
        setStock(updateStock);
    }

    return (
        <AppDialog open={open} onClose={onClose} title={"Add Individual Holding"} buttonClick={onClose} buttonText={"Add (Not Implemented)"}>
            <TextField variant="outlined" value={stock.symbol} onChange={e => updateStock('symbol', e.target.value)} fullWidth label="Symbol"/>
            <TextField variant="outlined" value={stock.price} onChange={e => updateStock('price', e.target.value)} fullWidth label="Price"/>
            <TextField variant="outlined" value={stock.quantity} onChange={e => updateStock('quantity', e.target.value)} fullWidth label="Quantity"/>
            <TextField variant="outlined" value={stock.date} onChange={e => updateStock('date', e.target.value)} fullWidth label="Date"/>
            <TextField variant="outlined" value={stock.commision} onChange={e => updateStock('commission', e.target.value)} fullWidth label="Commission"/>
            <TextField variant="outlined" value={stock.action} onChange={e => updateStock('action', e.target.value)} fullWidth label="Action"/>
        </AppDialog>
    )
}