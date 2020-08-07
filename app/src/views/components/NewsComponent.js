git aimport React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import NewsCard from './News/NewsCard'
import Typography from '@material-ui/core/Typography';
import { useSnackbar } from 'notistack';
import getResErrorMessage from '../helpers/ErrorHelper';

const useStyles = makeStyles((theme) => ({
    avatar: {
        backgroundColor: theme.palette.primary.main,
    }
}));

// Will retrieve news from queryTerms if provided 
const NewsComponent = ({queryTerms}) => {
    const [showArticle, setShowArticle] = useState(false);
    const [articles, setArticles] = useState([]);
    const [currentArticle, setCurrentArticle] = useState({});
    const [index, setIndex] = useState(0);
    const { enqueueSnackbar } = useSnackbar();
    const classes = useStyles();

    const getArticles = () => {
        const query = queryTerms ? 'q=' + encodeURIComponent(queryTerms.join(' OR ')) + '&': '';
        const sources = 'sources=' + ['axios', 'bloomberg', 'MarketWatch', 'techcrunch', 'the-wall-street-journal', "the-washington-post"].join(',');
        Axios.get('http://newsapi.org/v2/everything?' + query + 'language=en&' + sources + '&apiKey=b620f7387d5744a0b08b0d5585040a40').then((res) => {
            setArticles(res.data.articles);
            setCurrentArticle(res.data.articles[0] || {});
            setShowArticle(true);
        }).catch((err) => {
            enqueueSnackbar(getResErrorMessage(err), {variant: 'error'});
        })
    }

    useEffect(() => {
        getArticles();
    }, []);

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

    // Check if any news articles came up
    if (articles.length == 0) { return <Typography variant="h4" align="center" color="primary">There is currently no news available</Typography> }

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
}

export default NewsComponent;

