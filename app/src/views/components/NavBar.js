import React, {useState, useContext} from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import {UserContext} from './Auth/UserStore';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import LoginDialog from './Auth/LoginDialog';
import RegisterDialog from './Auth/RegisterDialog';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        paddingLeft: theme.spacing(20),
        paddingRight: theme.spacing(20),
    },
    title: {
        flexGrow: 1,
        paddingLeft: "0.5em"
    },
}));

const Navbar = () => {
    const [user, setUser] = useContext(UserContext);
    const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
    const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
    const history = useHistory();
    const classes = useStyles();

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('token');
        history.push('/')
    }

    // Display different buttons based on whether or not the user is logged in
    let buttons = []
    if(!user) {
        buttons = [
            <Button color="inherit" onClick={() => setIsLoginDialogOpen(true)} key={1}>Login</Button>,
            <Button color="inherit" onClick={() => setIsRegisterDialogOpen(true)} key={2}>Register</Button>
        ]
    } else {
        buttons = [<Button color="inherit" onClick={handleLogout} key={1}>Logout</Button>]
    }

    return (
        <>
            <AppBar position="static" className={classes.root}>
                <Toolbar>
                    <TrendingUpIcon/>
                    <Typography variant="h6" className={classes.title}>Trendline</Typography>
                    {buttons}
                </Toolbar>
            </AppBar>
            <LoginDialog open={isLoginDialogOpen} onClose={() => setIsLoginDialogOpen(false)}/>
            <RegisterDialog open={isRegisterDialogOpen} openLogin={() => setIsLoginDialogOpen(true)}  onClose={() => setIsRegisterDialogOpen(false)} />
        </>
    );
}

export default Navbar