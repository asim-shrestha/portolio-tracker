import React, { useState, useContext } from 'react'
import Axios from 'axios'
import TextField from '@material-ui/core/TextField';
import {UserContext} from '../Auth/UserStore';
import AppDialog from '../AppDialog';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export default ({open, onClose}) => {
    const [user, setUser] = useContext(UserContext);
    const [symbol, setSymbol] = useState();
    const [price, setPrice] = useState();
    const [quantity, setQuantity] = useState();
    const [date, setDate] = useState();
    const [commission, setCommission] = useState();
    const [action, setAction] = useState();

    // const updateStock= (attribute, value) => {
    //     updatedStock = {...stock};
    //     updateStock[attribute] = value;
    //     setStock(updateStock);
    // }

    const onAdd = () => {
        console.log(user.id);
        Axios.post('/api/activity/order', {
            user_id:user.id,
            // user_id:1,
            quantity:parseInt(quantity),
            action:action,
            symbol:symbol,
            price:parseFloat(price),
            date:date,
            commission: parseFloat(commission)
        }).then((res) => {
            console.log(res);
        }).catch((err) => {
            alert(err);
        })
    }

    return (
        <AppDialog open={open} onClose={onClose} title={"Add Individual Holding"} buttonClick={onAdd} buttonText={"Add (Somewhat Implemented)"}>
            <TextField variant="outlined" onChange={e => setSymbol(e.target.value)} fullWidth placeholder="Symbol"/>
            <TextField variant="outlined" onChange={e => setPrice(e.target.value)} fullWidth placeholder="Price"/>
            <TextField variant="outlined" onChange={e => setQuantity(e.target.value)} fullWidth placeholder="Quantity"/>
            <TextField variant="outlined" onChange={e => setDate(e.target.value)} fullWidth placeholder="Date"/>
            <TextField variant="outlined" onChange={e => setCommission(e.target.value)} fullWidth placeholder="Commission"/>
            <FormControl variant="outlined" fullWidth>
                <InputLabel >Action</InputLabel>
                <Select onChange={e => setAction(e.target.value)} >
                    <MenuItem value={'buy'}>Buy</MenuItem>
                    <MenuItem value={'sell'}>Sell</MenuItem>
                </Select>
            </FormControl>
        </AppDialog>
    )
}