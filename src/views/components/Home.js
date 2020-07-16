import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, ButtonGroup } from '@material-ui/core';
import Chart from './Chart';

const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    content: {
        margin: "3em"
    }
}));

const Home  = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography variant="h1" color="secondary" align="center">Welcome to</Typography>
            <Typography variant="h2" color="secondary" align="center">Portfolio Tracker!</Typography>
            <ButtonGroup color="secondary" className={classes.content}>
                <Button onClick={()=>{loginHandler;}}> Login </Button>
                <Button onClick={()=>{createHandler;}}> Create Account </Button>
            </ButtonGroup>
            <Chart className={classes.content}/>
        </div>
    );
}

export default Home;