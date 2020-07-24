import React, { useState } from 'react'
import axios from 'axios'
import AppDialog from '../AppDialog';
import {TextField,IconButton} from "@material-ui/core";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const RegisterDialog = ({open, onClose}) => {
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [show, setShow] = useState(false);

    const handleRegister = () => {
        axios.post('/auth/register', {
            email: email,
            password: password,
            first_name: firstName,
            last_name: lastName,
        }).then(res => {
            alert(res.data.message);
        }).catch((err) => {
            alert(err);
        })
        onClose();
    }

    return (
        <AppDialog open={open} onClose={onClose} title={"Register"} buttonClick={handleRegister} buttonText={"Register"}>
            <TextField variant="outlined" fullWidth placeholder="First name" onChange={e => setFirstName(e.target.value)} />
            <TextField variant="outlined" fullWidth placeholder="Last name" onChange={e => setLastName(e.target.value)} />
            <TextField variant="outlined" fullWidth placeholder="Email" onChange={e => setEmail(e.target.value)} />
            <TextField variant="outlined" fullWidth placeholder="Password" onChange={e => setPassword(e.target.value)} 
                type={show?'text':'password'} InputProps={{endAdornment:<IconButton onClick={()=>setShow(!show)}>{show?<Visibility />:<VisibilityOff />}</IconButton>}}/>
        </AppDialog>
    );
}

export default RegisterDialog;
