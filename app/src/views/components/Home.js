import React, { Component } from 'react';
// import Typography from '@material-ui/core/Typography';
import homeStyles from '../../../public/style/homeStyles';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";
import { Typography, Button, ButtonGroup } from '@material-ui/core';
import DrawLine from './Draw/DrawLine';
import DrawPie from './Draw/DrawPie';

class Home extends Component {
    constructor(props){
        super(props);
    }    
    render(){
        return (
            <Typography variant="h1" color="secondary" align="center">
                <br /><br />
                <div>{"Welcome to "}</div>
                <div>{"Portfolio Tracker"}</div>
                <ButtonGroup color="secondary" aria-label="outlined primary button group">
                    <Button onClick={()=>{loginHandler;}}> Login </Button>
                    <Button onClick={()=>{createHandler;}}> Create Account </Button>
                </ButtonGroup>
                <div>
                <DrawLine />
                <DrawPie />
                </div>
            </Typography>
        );
    }

}

export default withRouter(withStyles(homeStyles)(Home))
