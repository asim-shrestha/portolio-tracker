import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Grow from '@material-ui/core/Grow';
import Link from '@material-ui/core/Link';

const CARD_WIDTH = 650;

const useStyles = makeStyles((theme) => ({
    card: {
        "@media (max-width: 1000px)": {
            maxWidth: 600,
        },
        "@media (min-width: 1000px)": {
            maxWidth: 800,
        },
        margin: 'auto'

    },
    image: {
        "@media (max-width: 1000px)": {
            width: 600,
            height: 400,

        },
        "@media (min-width: 1000px)": {
            width: 800,
            height: 600,

        },
        objectFit: "cover",
    },
}));

const NewsCard = ({ article, showArticle }) => {
    const classes = useStyles();

    return (
        <Grow in={showArticle}>
            <Card className={classes.card}>
                <CardMedia>
                    {
                        article.urlToImage ? <img src={article.urlToImage} className={classes.image} /> : <></>
                    }
                </CardMedia>
                <Link href={article.url} target="_blank">
                    <CardContent>
                        <Typography variant="h5" component="h2">{article.title}</Typography>
                        <Typography color="textSecondary">
                            {article.source ? article.source.name : ''}
                            {article.author ? ': ' + article.author : ''}
                        </Typography>
                    </CardContent>
                </Link>
            </Card>
        </Grow>
    );
}

export default NewsCard;

