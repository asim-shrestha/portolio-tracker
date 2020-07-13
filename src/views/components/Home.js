import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import homeStyles from '../../../public/style/homeStyles';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";
import { render } from 'react-dom';


class Home extends Component {
    constructor(props){
        super(props);
    }    

    render(){
        const { classes } = this.props

        return (
            <Typography className={classes.root} color="textSecondary">
                App Skeleton:
                Powered by React and Express.
            </Typography>
        );
    }

}

export default withRouter(withStyles(homeStyles)(Home))
