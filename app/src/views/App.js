import React, {Component} from 'react';
import Home from './components/Home';
import Login from './components/Auth/Login';
import { Switch, Route, withRouter } from "react-router-dom";


class App extends Component {
    constructor(props){
        super(props);
    }    

    render() {
        return (
            <Switch>
                <Route exact path="/" render={() => <Home />}/>
                <Route path="/login" render={() => <Login />}/>
            </Switch>
        );
    }
}

export default withRouter(App);

