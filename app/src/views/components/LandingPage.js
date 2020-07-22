import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box } from '@material-ui/core';
import LandingGraphic from './Draw/LandingGraphic';

const useStyles = makeStyles((theme) => ({
    title: {
        fontWeight: "Bold"
    },
    diagram: {
        marginTop: theme.spacing(12),
    }
}));

const Home = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Typography variant="h1" color="primary" align="center" className={classes.title}>Welcome to Trendline. 👋</Typography>
            <Typography variant="h3" color="primary" align="center">A free investment-portfolio management tool</Typography>
            <Box className={classes.diagram} align="center">
                <LandingGraphic className={classes.diagram} />
            </Box>
        </div>
    );
}

export default Home
