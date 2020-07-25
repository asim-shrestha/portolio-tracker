import React from 'react';
import Authenticator from './components/Auth/Authenticator';
import Navbar from './components/NavBar';
import HomePage from './components/HomePage';
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProvider } from './components/Auth/UserStore';
import { makeStyles } from '@material-ui/core/styles';
import DashboardPage from './components/DashboardPage';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(15),
        marginLeft: theme.spacing(25),
        marginRight: theme.spacing(25),
        marginBottom: theme.spacing(15),
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
                    <Route exact path="/dashboard" render={() => <DashboardPage />} />
                    <Route exact path="/" render={() => <HomePage />} />
                    <Route render={() => <Redirect to="/" />} />
                </Switch>
            </div>
        </UserProvider>
    );
}

export default App;

