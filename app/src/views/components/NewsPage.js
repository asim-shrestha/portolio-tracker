import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import { makeStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles({
    root: {
        maxWidth: 800,
        margin: 'auto'
    },
});

const NewsPage = () => {
    const classes = useStyles();

    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [url, setUrl] = useState('');
    const [urlImg, setUrlImg] = useState('');
    const [count, setCount] = useState(0);

    useEffect(() => {
        loadNews();
    }, []);

    const loadNews = () => {
        Axios.get(`http://newsapi.org/v2/everything?domains=wsj.com&apiKey=b620f7387d5744a0b08b0d5585040a40`).then((res) => {
            console.log(count)
            setAuthor(res.data.articles[count].author);
            setTitle(res.data.articles[count].title);
            setDescription(res.data.articles[count].description);
            setContent(res.data.articles[count].content);
            setUrl(res.data.articles[count].url);
            setUrlImg(res.data.articles[count].urlToImage);
            setCount(count+1);
        }).catch((err) => {
            alert(err);
        })
    }

    return (
        <>
            <Card className={classes.root}>
                <CardMedia>
                    <img src={urlImg} width="100%" maxHeight="600"/>
                </CardMedia>
                <CardContent>
                    <Typography variant="h5" component="h2"> {title} </Typography>
                    <Typography> {description} </Typography>
                    <Typography> {author} </Typography> 
                    <br />
                    <Typography color="textSecondary"> {url} </Typography>
                    <Typography align="right">
                        <Button onClick={loadNews}> Next Article </Button>
                    </Typography>
                </CardContent>
            </Card>
        </>
    );
}

export default NewsPage;

