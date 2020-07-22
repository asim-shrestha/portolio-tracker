import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: "center",/* Vertical */
        justifyContent: "center", /* Horizontal */
        marginTop: theme.spacing(13)

    },
    image: {
        width: 640,
        height: 360
    },
    text: {
        flex: 1,
        margin: "2em"
    },
}));

const LandingPageContentBlock = ({image, text, textFirst}) => {
    const classes = useStyles();

    let content = [
        <img className={classes.image} src={image} key={1}/>,
        <Typography variant="h3" color="primary" align="left" className={classes.text} key={2}>{text}</Typography>
    ];

    // Swap positions so that the text is first if the textFirst prop is supplied
    if(textFirst) {
        [content[0], content[1]] = [content[1], content[0]]
    }

    return (
        <div className={classes.root}>
            {content}
        </div>
    );
}

export default LandingPageContentBlock