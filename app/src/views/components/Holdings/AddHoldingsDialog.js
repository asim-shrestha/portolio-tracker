import React, { useState, useContext } from 'react'
import Axios from 'axios'
import TextField from '@material-ui/core/TextField';
import {UserContext} from '../Auth/UserStore';
import AppDialog from '../AppDialog';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export default ({open, onClose, resetHoldings}) => {

    const [user, setUser] = useContext(UserContext);
    const [symbol, setSymbol] = useState();
    const [price, setPrice] = useState();
    const [quantity, setQuantity] = useState();
    const [date, setDate] = useState();
    const [commission, setCommission] = useState();
    const [action, setAction] = useState();
    const actions = ['buy','sell'];

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
            console.log(res);
            onClose();
            resetHoldings();
        }).catch((err) => {
            alert(err);
        })
        
    }

    return (
        <AppDialog open={open} onClose={onClose} title={"Add Individual Holding"} buttonClick={onAdd} buttonText={"Add"}>
            <TextField variant="outlined" margin="dense" fullWidth onChange={e => setSymbol(e.target.value)} label="Symbol"/>
            <TextField variant="outlined" margin="dense" fullWidth onChange={e => setPrice(e.target.value)} label="Price"/>
            <TextField variant="outlined" margin="dense" fullWidth onChange={e => setQuantity(e.target.value)} label="Quantity"/>
            <TextField variant="outlined" margin="dense" fullWidth onChange={e => setDate(e.target.value)} label="Date" type="date" defaultValue="" InputLabelProps={{shrink: true}} />
            <TextField variant="outlined" margin="dense" fullWidth onChange={e => setCommission(e.target.value)} label="Commission"/>
            <TextField variant="outlined" margin="dense" fullWidth onChange={e => setAction(e.target.value)} label="Action" select>
                <MenuItem value={'buy'}>Buy</MenuItem>
                <MenuItem value={'sell'}>Sell</MenuItem>
            </TextField>
        </AppDialog>
    )
}