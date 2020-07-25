import React, { useState } from 'react'
import Axios from 'axios'
import { useSnackbar } from 'notistack';
import AppDialog from '../AppDialog';
import {TextField,IconButton} from "@material-ui/core";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import getResErrorMessage from '../../helpers/ErrorHelper';

const RegisterDialog = ({open, onClose, openLogin}) => {

    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();


    const handleRegister = () => {
        Axios.post('/auth/register', {
            email: email,
            password: password,
            first_name: firstName,
            last_name: lastName,
        }).then(() => {
            onClose();
            openLogin();
            closeSnackbar(); // Close on success
            enqueueSnackbar('User successfully registered!', {variant: 'success'});
        }).catch((err) => {
            enqueueSnackbar(getResErrorMessage(err), {variant: 'error'});
        })
    }

    return (
        <AppDialog open={open} onClose={onClose} title={"Register"} buttonClick={handleRegister} buttonText={"Register"}>
            <TextField variant="outlined" fullWidth margin="dense" label="First name" onChange={e => setFirstName(e.target.value)}/>
            <TextField variant="outlined" fullWidth margin="dense" label="Last name" onChange={e => setLastName(e.target.value)}/>
            <TextField variant="outlined" fullWidth margin="dense" label="Email" onChange={e => setEmail(e.target.value)}/>
            <TextField variant="outlined" fullWidth margin="dense" label="Password" onChange={e => setPassword(e.target.value)} 
                type={showPassword?'text':'password'} InputProps={{endAdornment:<IconButton onClick={()=>setShowPassword(!showPassword)}>{showPassword?<Visibility fontSize="small" />:<VisibilityOff fontSize="small" />}</IconButton>}}
               />
        </AppDialog>
    );
}

export default RegisterDialog;
