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
    const [url, setUrl] = useState('');
    const [urlImg, setUrlImg] = useState('');
    const [count, setCount] = useState(0);
    const [authors, setAuthors] = useState([]);
    const [titles, setTitles] = useState([]);
    const [descriptions, setDescriptions] = useState([]);
    const [urls, setUrls] = useState([]);
    const [imgs, setUrlImgs] = useState([]);

    useEffect(() => {
        getnews();
    }, []);

    const getnews = () => {
        Axios.get(`http://newsapi.org/v2/everything?domains=wsj.com&apiKey=b620f7387d5744a0b08b0d5585040a40`).then((res) => {
            for (var i=0; i<20; i++){
                authors.push(res.data.articles[i].author)
                titles.push(res.data.articles[i].title)
                descriptions.push(res.data.articles[i].description)
                urls.push(res.data.articles[i].url)
                imgs.push(res.data.articles[i].urlToImage)
            }
            nextnews();
        }).catch((err) => {
            alert(err);
        })
    }

    const nextnews = () => {
        setAuthor(authors[count]);
        setTitle(titles[count]);
        setDescription(descriptions[count]);
        setUrl(urls[count]);
        setUrlImg(imgs[count]);
        if(count<19){
            setCount(count+1);
        }
        else{
            setCount(0);
        }
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
                        <Button onClick={nextnews}> Next Article </Button>
                    </Typography>
                </CardContent>
            </Card>
        </>
    );
}

export default NewsPage;

