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

    return (
        <AppDialog open={open} onClose={onClose} title={"Register"} buttonClick={handleRegister} buttonText={"Register"}>
            <TextField variant="outlined" fullWidth placeholder="First name" onChange={e => setFirstName(e.target.value)}/>
            <TextField variant="outlined" fullWidth placeholder="Last name" onChange={e => setLastName(e.target.value)}/>
            <TextField variant="outlined" fullWidth placeholder="Email" onChange={e => setEmail(e.target.value)}/>
            <TextField variant="outlined" fullWidth placeholder="Password" onChange={e => setPassword(e.target.value)} 
                type={show?'text':'password'} InputProps={{endAdornment:<IconButton onClick={()=>setShow(!show)}>{show?<Visibility />:<VisibilityOff />}</IconButton>}}
               />
        </AppDialog>
    );
}

export default RegisterDialog;
