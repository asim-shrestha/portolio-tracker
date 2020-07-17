import React from 'react';
import Home from './components/Home';
import Login from './components/Auth/Login';
import { Switch, Route } from "react-router-dom";


const App = () => {
    return (
        <Switch>
            <Route exact path="/" render={() => <Home />}/>
            <Route path="/login" render={() => <Login />}/>
        </Switch>
    );
}

export default App;