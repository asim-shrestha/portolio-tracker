import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import NewsCard from './News/NewsCard'

const useStyles = makeStyles((theme) => ({
    avatar: {
        backgroundColor: theme.palette.primary.main,
    }
}));

const NewsPage = () => {
    const [showArticle, setShowArticle] = useState(false);
    const [articles, setArticles] = useState([]);
    const [currentArticle, setCurrentArticle] = useState({});
    const [index, setIndex] = useState(0);
    const classes = useStyles();

    const getArticles = () => {
        Axios.get(`http://newsapi.org/v2/everything?domains=wsj.com&apiKey=b620f7387d5744a0b08b0d5585040a40`).then((res) => {
            setArticles(res.data.articles);
            setCurrentArticle(res.data.articles[0]);
            setShowArticle(true);
        }).catch((err) => {
            alert(err);
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

export default NewsPage;

