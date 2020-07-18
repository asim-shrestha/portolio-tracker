import React from 'react';
import Authenticator from './components/Auth/Authenticator';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import Login from './components/Auth/Login';
import { Switch, Route } from "react-router-dom";
import {UserProvider} from './components/Auth/UserStore';


const App = () => {
    return (
        <UserProvider>
            <Authenticator/>
            <Navbar/>
            <Switch>
                <Route exact path="/" render={() => <HomePage />}/>
                <Route path="/login" render={() => <Login />}/>
            </Switch>
        </UserProvider>
    );
}

export default App;

