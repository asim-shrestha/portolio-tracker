import React, { useState, useContext } from 'react'
import { useHistory } from "react-router-dom";
import Axios from 'axios'
import { TextField, IconButton } from "@material-ui/core";
import { UserContext } from './UserStore';
import AppDialog from '../AppDialog';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useSnackbar } from 'notistack';

export default ({ open, onClose }) => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useContext(UserContext);
    const [showPassword, setShowPassword] = useState(false);
    const history = useHistory();

    const enqueueErrorToSnackbar = (err) => {
        const status = err.response.status;
        if (status == 422) {
            // Loop through response and concatenate all the problematic values
            const badValues = err.response.data.errors.map((errValue) => {
                return errValue.param;
            }).join(", ");
    
            enqueueSnackbar("Invalid values: " + badValues, {variant: 'error'});
        } else {
            enqueueSnackbar(err.response.data, {variant: 'error'});
        }
    }

    const handleLogin = () => {
        // Attempt login
        Axios.post('/auth/login', {
            email: email,
            password: password
        }).then(res => {
            // Save token
            localStorage.setItem('token', res.data.token)
            setUser(res.data.user);
            onClose();
            closeSnackbar(); // Close errors on successful login
            history.push('/dashboard');
        }).catch((err) => {
            console.log(err.response);
            enqueueErrorToSnackbar(err);
        }).then(() => {
            // Reset fields
            setEmail('');
            setPassword('');
        })
    }

    return (
        <AppDialog open={open} onClose={onClose} title={"Login"} buttonClick={handleLogin} buttonText={"Login"} >
            <TextField variant="outlined" value={email} onChange={e => setEmail(e.target.value)} label="Email"/>
            <TextField variant="outlined" value={password} onChange={e => setPassword(e.target.value)} label="Password"
                type={showPassword ? 'text' : 'password'} InputProps={{ endAdornment: <IconButton onClick={() => setShowPassword(!showPassword)}>{showPassword ? <Visibility /> : <VisibilityOff />}</IconButton>}}
            />
        </AppDialog>
    )
}