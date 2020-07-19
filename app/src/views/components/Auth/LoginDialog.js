import React, { useState, useContext } from 'react'
import Axios from 'axios'
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import theme from '../../../../public/style/theme';
import {UserContext} from './UserStore';

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
            setUser({
                token: res.data.token,
                user: null
            });
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
        <Dialog open={open} onClose={onClose}>
            <DialogTitle style={{backgroundColor: theme.palette.primary.main, color: "white"}}>Login</DialogTitle>
            <DialogContent style={{marginTop: "1em"}}>
                <TextField variant="outlined" value={email} onChange={e => setEmail(e.target.value)} error={emailError} required label="Email"/>
                <TextField variant="outlined" value={password} onChange={e => setPassword(e.target.value)} error={passwordError} required label="Password"/>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={handleLogin}>Login</Button>
                <Button variant="contained" color="primary" onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}