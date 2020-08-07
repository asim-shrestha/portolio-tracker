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
        maxWidth: CARD_WIDTH,
        margin: 'auto'
    },
    image: {
        width: CARD_WIDTH,
        height: 400,
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

