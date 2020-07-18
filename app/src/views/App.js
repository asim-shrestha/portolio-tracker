import React from 'react';
import HomePage from './components/HomePage';
import Login from './components/Auth/Login';
import { Switch, Route } from "react-router-dom";


const App = () => {
    return (
        <Switch>
            <Route exact path="/" render={() => <HomePage />}/>
            <Route path="/login" render={() => <Login />}/>
        </Switch>
    );
}

export default App;

