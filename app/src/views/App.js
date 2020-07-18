import React from 'react';
import HomePage from './components/HomePage';
import Login from './components/Auth/Login';
import { Switch, Route } from "react-router-dom";
import LoginProvider from './context/LoginContext';


const App = () => {
    return (
        <LoginProvider>
            <Switch>
                <Route exact path="/" render={() => <HomePage />}/>
                <Route path="/login" render={() => <Login />}/>
            </Switch>
        </LoginProvider>
    );
}

export default App;

