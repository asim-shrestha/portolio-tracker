import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import LoginDialog from './Auth/LoginDialog';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const Navbar = () => {
    const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
    const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);

    const classes = useStyles();

    return (
        <>
            <AppBar position="static" className={classes.root}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>Trendline</Typography>
                    <Button color="inherit" onClick={() => setIsLoginDialogOpen(true)}>Login</Button>
                    <Button color="inherit">Register</Button>
                </Toolbar>
            </AppBar>
            <LoginDialog open={isLoginDialogOpen} onClose={() => setIsLoginDialogOpen(false)}/>
        </>
    );
}

export default Navbar