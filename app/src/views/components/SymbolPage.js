import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box } from '@material-ui/core';
import SymbolSearchBar from './Symbols/SymbolSearchBar';
import { useLocation } from 'react-router-dom';
import Axios from 'axios';
import { useSnackbar } from 'notistack';
import getResErrorMessage from '../helpers/ErrorHelper';
import PerformanceGraph from './Charts/PerformanceGraph';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import NewsCard from './News/NewsCard'

const useStyles = makeStyles((theme) => ({
    title: {
        fontWeight: "Bold"
    },
    diagram: {
        marginTop: theme.spacing(10),
    }
}));

const getObjectFromQueryString = (string) => {
    string = string.substr(1); // Remove leading "?"
    return JSON.parse('{"' + decodeURI(string).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}

// Page that searches for symbol performance data based on a url query string
const SymbolPage = () => {
    const [querySymbol, setQuerySymbol] = useState('');
    const [symbolData, setSymbolData] = useState([]);
    const classes = useStyles();
    const location = useLocation();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [showArticle, setShowArticle] = useState(false);
    const [articles, setArticles] = useState([]);
    const [currentArticle, setCurrentArticle] = useState({});
    const [index, setIndex] = useState(0);

    // Get search query when route changes
    useEffect(() => {
        let query = getObjectFromQueryString(location.search);
        setSymbolData([]);
        setQuerySymbol(query.search.toUpperCase());
    }, [location]);

    // Load symbolData for given symbol
    useEffect(() => {
        if(querySymbol == '' || symbolData.length > 0) {return;}
        Axios.get(`/api/symbol/${querySymbol}`).then((res) => {
            closeSnackbar();
            setSymbolData(res.data);
        }).catch((err) => {
            enqueueSnackbar(getResErrorMessage(err), {variant: 'error'});
        })

        var url = "http://newsapi.org/v2/everything?q="+querySymbol+"&sortBy=popularity&apiKey=b620f7387d5744a0b08b0d5585040a40"
        Axios.get(url).then((res) => {
            setArticles(res.data.articles);
            setCurrentArticle(res.data.articles[0]);
            setShowArticle(true);
        }).catch((err) => {
            alert(err);
        })
    }, [querySymbol, symbolData])

    const changeArticleIndex = (deltaIndex) => {
        setShowArticle(false);
        // Add timeout so we can animate the card opening and closing
        setTimeout(() => {
            // Modulo the next index (This modulo will turn negative numbers into positive ones)
            const nextIndex = ((index + deltaIndex % articles.length) + articles.length) % articles.length;
            setCurrentArticle(articles[nextIndex]);
            setIndex(nextIndex);
            setShowArticle(true);
        }, 300);
    }

    return (
        <Grid direction="column" justify="space-evenly" alignItems="center">
            <Grid item>
                <SymbolSearchBar />
            </Grid><br />
            <Grid item>
                <Grid container direction="row" justify="space-evenly" alignItems="center">
                    <Grid item>
                        <IconButton color="primary" variant="contained" onClick={() => changeArticleIndex(-1)}>
                            <Avatar className={classes.avatar}>
                                <ArrowBackIcon />
                            </Avatar>
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <NewsCard article={currentArticle} showArticle={showArticle} />
                    </Grid>
                    <Grid item>
                        <IconButton color="primary" variant="contained" onClick={() => changeArticleIndex(1)}>
                            <Avatar className={classes.avatar}>
                                <ArrowForwardIcon />
                            </Avatar>
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid><br />
            <Grid item>
                <div className={classes.root}>
                    {
                        symbolData.length > 0 ?
                        <Box marginTop="5em">
                            <Typography variant="h4" align="center">{querySymbol} Performance:</Typography>
                            <PerformanceGraph data={symbolData}/>
                        </Box> : <></>
                    }
                </div>
            </Grid>

        </Grid>
    );
}

export default SymbolPage
