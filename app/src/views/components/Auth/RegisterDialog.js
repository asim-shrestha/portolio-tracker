import React from 'react';
import axios from 'axios'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const RegisterDialog = ({open, onClose}) => {
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = () => {
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
        <div>
            <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Register</DialogTitle>
                <DialogContent>
                    <TextField variant="outlined" fullWidth placeholder="First name" onChange={e => setFirstName(e.target.value)} />
                    <TextField variant="outlined" fullWidth placeholder="Last name" onChange={e => setLastName(e.target.value)} />
                    <TextField variant="outlined" fullWidth placeholder="Email" onChange={e => setEmail(e.target.value)} />
                    <TextField variant="outlined" fullWidth placeholder="Password" onChange={e => setPassword(e.target.value)} />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
                    <Button variant="contained" color="primary" onClick={onClose}>Cancel</Button>          
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default RegisterDialog;
