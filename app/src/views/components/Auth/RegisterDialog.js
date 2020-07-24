import React, { useState, useContext } from 'react'
import Axios from 'axios'
import {UserContext} from './UserStore';

import AppDialog from '../AppDialog';
import {TextField,IconButton} from "@material-ui/core";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const RegisterDialog = ({open, onClose, openLogin}) => {
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [show, setShow] = useState(false);
    const [user, setUser] = useContext(UserContext);


    const handleRegister = () => {
        Axios.post('/auth/register', {
            email: email,
            password: password,
            first_name: firstName,
            last_name: lastName,
        }).then(res => {
            onClose();
            openLogin();
        }).catch((err) => {
            alert(err);
        })
        onClose();
    }

    const handleLogin = () => {
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

    const handleKey = (keycode) => {
        console.log(keycode);
        if (keycode==13) {
            handleRegister();
        }
    }

    return (
        <AppDialog open={open} onClose={onClose} title={"Register"} buttonClick={handleRegister} buttonText={"Register"}>
            <TextField variant="outlined" fullWidth placeholder="First name" onChange={e => setFirstName(e.target.value)} onKeyDown={e=>handleKey(e.keyCode)}/>
            <TextField variant="outlined" fullWidth placeholder="Last name" onChange={e => setLastName(e.target.value)} onKeyDown={e=>handleKey(e.keyCode)}/>
            <TextField variant="outlined" fullWidth placeholder="Email" onChange={e => setEmail(e.target.value)} onKeyDown={e=>handleKey(e.keyCode)}/>
            <TextField variant="outlined" fullWidth placeholder="Password" onChange={e => setPassword(e.target.value)} 
                type={show?'text':'password'} InputProps={{endAdornment:<IconButton onClick={()=>setShow(!show)}>{show?<Visibility />:<VisibilityOff />}</IconButton>}}
                onKeyDown={e=>handleKey(e.keyCode)}/>
        </AppDialog>
    );
}

export default RegisterDialog;
