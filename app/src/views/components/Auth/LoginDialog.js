import React, { useState, useContext } from 'react'
import { useHistory } from "react-router-dom";
import Axios from 'axios'
import { TextField, IconButton } from "@material-ui/core";
import { UserContext } from './UserStore';
import AppDialog from '../AppDialog';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useSnackbar } from 'notistack';
import getResErrorMessage from '../../helpers/ErrorHelper';

export default ({ open, onClose }) => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useContext(UserContext);
    const [showPassword, setShowPassword] = useState(false);
    const history = useHistory();

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
            closeSnackbar(); // Close on success
            history.push('/dashboard');
        }).catch((err) => {
            enqueueSnackbar(getResErrorMessage(err), {variant: 'error'});
        }).then(() => {
            // Reset fields
            setEmail('');
            setPassword('');
        })
    }

    return (
        <AppDialog open={open} onClose={onClose} title={"Login"} buttonClick={handleLogin} buttonText={"Login"} >
            <TextField variant="outlined" fullWidth margin="dense" value={email} onChange={e => setEmail(e.target.value)} label="Email"/>
            <TextField variant="outlined" fullWidth margin="dense" value={password} onChange={e => setPassword(e.target.value)} label="Password"
                type={showPassword ? 'text' : 'password'} InputProps={{ endAdornment: <IconButton onClick={() => setShowPassword(!showPassword)}>{showPassword ? <Visibility fontSize="small" /> : <VisibilityOff fontSize="small"/>}</IconButton>}}
            />
        </AppDialog>
    )
}