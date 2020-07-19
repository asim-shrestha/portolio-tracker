import React from 'react';
import Authenticator from './components/Auth/Authenticator';
import Navbar from './components/NavBar';
import HomePage from './components/HomePage';
import { Switch, Route } from "react-router-dom";
import {UserProvider} from './components/Auth/UserStore';


const App = () => {
    return (
        <UserProvider>
            <Authenticator/>
            <Navbar/>
            <Switch>
                <Route exact path="/" render={() => <HomePage />}/>
            </Switch>
        </UserProvider>
    );
}

export default App;

