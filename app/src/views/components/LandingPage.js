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

// Default page for the app
const LandingPage = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Typography variant="h1" color="primary" align="center" className={classes.title}>Welcome to Trendline. 👋</Typography>
            <Typography variant="h3" color="primary" align="center">A free investment-portfolio management tool</Typography>
            <Box className={classes.diagram} align="center">
                <LandingGraphic className={classes.diagram} />
                <LandingPageContentBlock
                    image={"/landing_image_1.jpg"}
                    text="Quickly set up your portfolio and start tracking investments."
                />
                <LandingPageContentBlock
                    image={"/landing_image_2.jpg"}
                    text="Seamlessly import CSV data."
                    textFirst
                />
                <LandingPageContentBlock
                    image={"/landing_image_3.jpg"}
                    text="View real-time preformance metrics through the IEX Cloud API."
                />
            </Box>
        </div>
    );
}

export default LandingPage
