import React, { Component } from 'react';
// import Typography from '@material-ui/core/Typography';
import homeStyles from '../../../public/style/homeStyles';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";
import { render } from 'react-dom';
import { TextField, Typography, Button, ButtonGroup } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Login from './Auth/Login';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }
}));

class Home extends Component {
    constructor(props){
        super(props);
    }    
    
    render(){
        const { classes } = this.props

        return (
                <Typography variant="h1" color="secondary" align="center">
                    <br /><br />
                    <div>{"Welcome to "}</div>
                    <div>{"Portfolio Tracker"}</div>
                <ButtonGroup color="secondary" aria-label="outlined primary button group">
                    <Button onClick={()=>{loginHandler;}}> Login </Button>
                    <Button onClick={()=>{createHandler;}}> Create Account </Button>
                </ButtonGroup>

                {/* <Login /> */}
            </Typography>
        );
    }

}

export default withRouter(withStyles(homeStyles)(Home))
