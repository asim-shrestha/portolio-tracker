import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box } from '@material-ui/core';
import SymbolSearchBar from './Symbols/SymbolSearchBar';
import { useLocation } from 'react-router-dom';
import Axios from 'axios';
import { useSnackbar } from 'notistack';
import getResErrorMessage from '../helpers/ErrorHelper';
import PreformanceGraph from './Charts/PreformanceGraph';

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

const SymbolPage = () => {
    const [querySymbol, setQuerySymbol] = useState('');
    const [symbolData, setSymbolData] = useState([]);
    const classes = useStyles();
    const location = useLocation();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    // Get search query when route changes
    useEffect(() => {
        let query = getObjectFromQueryString(location.search);
        setQuerySymbol(query.search.toUpperCase());
    }, [location]);

    // Load symbolData for given symbol
    useEffect(() => {
        if(querySymbol == '') {return;}
        Axios.get(`/api/symbol/${querySymbol}`).then((res) => {
            closeSnackbar();
            setSymbolData(res.data);
        }).catch((err) => {
            enqueueSnackbar(getResErrorMessage(err), {variant: 'error'});
        })
    }, [querySymbol])

    return (
        <div className={classes.root}>
            <Typography variant="h1" color="primary" align="center" className={classes.title}>Search Symbols 🔍</Typography>
            <SymbolSearchBar />
            {
                // Show preformance graph if we have data, show nothing otherwise
                symbolData.length > 0 ?
                <Box marginTop="5em"><PreformanceGraph data={symbolData}/></Box> :
                <></>
            }
        </div>
    );
}

export default SymbolPage
