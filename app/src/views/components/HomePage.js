import React, {useContext} from 'react';
import {UserContext} from './Auth/UserStore'
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import LineGraphic from './Draw/LineGraphic';


const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: theme.spacing(10),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    diagram: {
        marginTop: theme.spacing(12),
    }
}));

const Home = () => {
    const [user, setUser] = useContext(UserContext);
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Typography variant="h1" color="primary">Welcome to Trendline 👋</Typography>
            <Typography variant="h3" color="primary">A free investment-portfolio management tool</Typography>
            <div className={classes.diagram}>
                <LineGraphic className={classes.diagram} />
            </div>
        </div>
    );
}

export default Home
