import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box } from '@material-ui/core';
import HomePageGraphic from './Charts/HomePageGraphic';
import HomePageContentblock from './HomePageContentBlock';
import SymbolSearchBar from './Symbols/SymbolSearchBar';

const useStyles = makeStyles((theme) => ({
    title: {
        fontWeight: "Bold",
    },
    subtitle: {
        fontWeight: "Light",
    },
    diagram: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
    }
}));

const HomePage = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Typography variant="h1" color="primary" align="center" className={classes.title}>Welcome to Trendline. 👋</Typography>
            <Typography variant="h3" color="primary" align="center" className={classes.subtitle}>A free investment-portfolio management tool</Typography>
            <SymbolSearchBar />
            <Box className={classes.diagram} align="center">
                <HomePageGraphic />
                <HomePageContentblock
                    image={"/home_image_1.jpg"}
                    text="Quickly set up your portfolio and start tracking investments."
                />
                <HomePageContentblock
                    image={"/home_image_2.jpg"}
                    text="Seamlessly import CSV data."
                    textFirst
                />
                <HomePageContentblock
                    image={"/home_image_3.jpg"}
                    text="View real-time performance metrics powered by IEX Cloud."
                    textLink="https://iexcloud.io/"
                />
            </Box>
        </div>
    );
};

export default HomePage;
