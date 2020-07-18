import React, {useContext} from 'react';
import {UserContext} from './Auth/UserStore'
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, ButtonGroup } from '@material-ui/core';
import DrawHome from './Draw/DrawHome';
import DrawLine from './Draw/DrawLine';
import DrawPie from './Draw/DrawPie';
import DrawTable from './Draw/DrawTable';


const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
}));

const Home = () => {
    const [user, setUser] = useContext(UserContext);
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Typography variant="h1" color="secondary">Welcome to</Typography>
            <Typography variant="h1" color="secondary">Portfolio Tracker</Typography>
            <ButtonGroup color="secondary" aria-label="outlined primary button group">
                <Button onClick={()=>{loginHandler;}}> Login </Button>
                <Button onClick={()=>{createHandler;}}> Create Account </Button>
            </ButtonGroup>
            
            <DrawHome />
            <DrawLine />
            <DrawPie />
            <DrawTable />
        </div>
    );
}

export default Home
