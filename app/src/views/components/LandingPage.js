import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box } from '@material-ui/core';
import LandingGraphic from './Draw/LandingGraphic';
import LandingPageContentBlock from './LandingPageContentBlock';

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
                <LandingPageContentBlock
                    image={"https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png"}
                    text="Quickly set-up your portfolio and start tracking your investments."
                />
            </Box>
        </div>
    );
}

export default Home
