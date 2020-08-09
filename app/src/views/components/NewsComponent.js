import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import NewsCard from './News/NewsCard';
import Typography from '@material-ui/core/Typography';
import { useSnackbar } from 'notistack';
import getResErrorMessage from '../helpers/ErrorHelper';

const useStyles = makeStyles((theme) => ({
    avatar: {
        backgroundColor: theme.palette.primary.main,
    }
}));

// Will retrieve news from queryTerms if provided 
const NewsComponent = ({ queryTerms }) => {
    const [savedQueryTerms, setSavedQueryTerms] = useState(null);
    const [showArticle, setShowArticle] = useState(false);
    const [articles, setArticles] = useState([]);
    const [currentArticle, setCurrentArticle] = useState({});
    const [index, setIndex] = useState(0);
    const { enqueueSnackbar } = useSnackbar();
    const classes = useStyles();

    const getArticles = () => {
        // Filter terms to only get text before the first "," for every holding.
        // This will remove the ", Inc" from searches which ruins search results
        const filteredQueryTerms = queryTerms ? queryTerms.map(term => term.substr(0, term.indexOf(','))) : queryTerms;
        // NewsAPI requires encoded URI for query
        const query = filteredQueryTerms ? encodeURIComponent(filteredQueryTerms.join(' OR ')) : '';

        // Get articles
        const token = localStorage.getItem('token');
        Axios.get('/api/news/' + query, {
            headers: {
                Authorization: `JWT ${token}`
            }
        }).then((res) => {
            setArticles(res.data.articles);
            setCurrentArticle(res.data.articles[0] || {});
            setShowArticle(true);
        }).catch((err) => {
            enqueueSnackbar("Error retrieving news information: " + getResErrorMessage(err), { variant: 'error' });
        });
    };

    useEffect(() => {
        // Check if we have already retrieved news for this query
        // Need to .join('') because we cannot explicitly check equality for arrays
        if (savedQueryTerms && queryTerms.join('') === savedQueryTerms.join('')) {
            return; // Articles for query already recieved. Do not fetch again
        } else {
            // Articles not retrieved for query terms.
            setSavedQueryTerms(queryTerms);
            getArticles();
        }
    }, [queryTerms]);

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
    };

    // Check if any news articles came up
    if (articles.length == 0) { return <Typography variant="h4" align="center" color="primary">There is currently no news available</Typography>; }

    return (
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
    );
};

export default NewsComponent;

