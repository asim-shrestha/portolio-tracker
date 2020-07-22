import React, { useState, useContext } from 'react'
import Axios from 'axios'
import TextField from '@material-ui/core/TextField';
import {UserContext} from './UserStore';
import AppDialog from '../AppDialog';

export default ({open, onClose}) => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [user, setUser] = useContext(UserContext);

    const handleLogin = () => {
        // Check for errors
        if(!email) {setEmailError(true);}
        if(!password) {setPasswordError(true);}
        if(!email || !password) { return; }
        
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
        <AppDialog open={open} onClose={onClose} title={"Login"} buttonClick={handleLogin} buttonText={"Login"}>
            <TextField variant="outlined" value={email} onChange={e => setEmail(e.target.value)} error={emailError} required label="Email"/>
            <TextField variant="outlined" value={password} onChange={e => setPassword(e.target.value)} error={passwordError} required label="Password"/>
        </AppDialog>
    )
}