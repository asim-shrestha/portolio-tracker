import React from 'react';
import Authenticator from './components/Auth/Authenticator';
import Navbar from './components/NavBar';
import HomePage from './components/HomePage';
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProvider } from './components/Auth/UserStore';
import { makeStyles } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import DashboardPage from './components/DashboardPage';
import NewsComponent from './components/NewsComponent';
import SymbolPage from './components/SymbolPage';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(15),
        marginBottom: theme.spacing(15),
        "@media (max-width: 1000px)": {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
        },
        "@media (min-width: 1000px)": {
            marginLeft: theme.spacing(25),
            marginRight: theme.spacing(25),
        },
    },
}));

const App = () => {
    const classes = useStyles();
    const notistackRef = React.createRef();

    // add action to all snackbars
    const onClickDismiss = key => () => {
        notistackRef.current.closeSnackbar(key);
    };
    return (
        <SnackbarProvider
            maxSnack={2}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            ref={notistackRef}
            action={(key) => (
                <Button onClick={onClickDismiss(key)}>
                    <CloseIcon color="secondary" />
                </Button>
            )}>
            <UserProvider>
                <Authenticator />
                <Navbar />
                <div className={classes.root}>
                    <Switch>
                        <Route path="/symbol" render={() => <SymbolPage />} />
                        <Route exact path="/news" render={() => <NewsComponent />} />
                        <Route exact path="/dashboard" render={() => <DashboardPage />} />
                        <Route exact path="/" render={() => <HomePage />} />
                        <Route render={() => <Redirect to="/" />} />
                    </Switch>
                </div>
            </UserProvider>
        </SnackbarProvider>
    );
};

export default App;

