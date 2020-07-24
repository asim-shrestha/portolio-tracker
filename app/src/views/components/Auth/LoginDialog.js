import React, { useState, useContext } from 'react'
import Axios from 'axios'
import { TextField, IconButton } from "@material-ui/core";
import { UserContext } from './UserStore';
import AppDialog from '../AppDialog';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

export default ({ open, onClose }) => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [user, setUser] = useContext(UserContext);
    const [show, setShow] = useState(false);

    const handleLogin = () => {
        // Check for errors
        if (!email) { setEmailError(true); }
        if (!password) { setPasswordError(true); }
        if (!email || !password) { return; }

        // Attempt login
        Axios.post('/auth/login', {
            email: email,
            password: password
        }).then(res => {
            // Save token
            localStorage.setItem('token', res.data.token)
            setUser(res.data.user);
        }).catch((err) => {
            alert(err);
        }).then(() => {
            // Reset fields
            setEmail('');
            setPassword('');
            setEmailError(false);
            setPasswordError(false);
            onClose();
        })
    }

    return (
        <AppDialog open={open} onClose={onClose} title={"Login"} buttonClick={handleLogin} buttonText={"Login"} >
            <TextField variant="outlined" fullWidth margin="dense" value={email} onChange={e => setEmail(e.target.value)} error={emailError} required label="Email"/>
            <TextField variant="outlined" fullWidth margin="dense" value={password} onChange={e => setPassword(e.target.value)} error={passwordError} required label="Password"
                type={show ? 'text' : 'password'} InputProps={{ endAdornment: <IconButton onClick={() => setShow(!show)}>{show ? <Visibility fontSize="small" /> : <VisibilityOff fontSize="small"/>}</IconButton>}}
            />
        </AppDialog>
    )
}