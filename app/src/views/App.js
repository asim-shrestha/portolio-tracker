import React from 'react';
import Authenticator from './components/Auth/Authenticator';
import Navbar from './components/NavBar';
import HomePage from './components/HomePage';
import { Switch, Route } from "react-router-dom";
import { UserProvider } from './components/Auth/UserStore';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(10),
        display: 'flex',
        flexDirection: 'column',
    },
}));

const App = () => {
    const classes = useStyles();
    return (
        <UserProvider>
            <Authenticator />
            <Navbar />
            <div className={classes.root}>
                <Switch>
                    <Route exact path="/" render={() => <HomePage />} />
                </Switch>
            </div>
        </UserProvider>
    );
}

export default App;

