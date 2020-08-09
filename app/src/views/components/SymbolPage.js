import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box } from '@material-ui/core';
import SymbolSearchBar from './Symbols/SymbolSearchBar';
import { useLocation } from 'react-router-dom';
import Axios from 'axios';
import { useSnackbar } from 'notistack';
import getResErrorMessage from '../helpers/ErrorHelper';
import PerformanceGraph from './Charts/PerformanceGraph';
import NewsComponent from './NewsComponent';

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

// Page that searches for symbol performance data based on a url query string
const SymbolPage = () => {
    const [querySymbol, setQuerySymbol] = useState('');
    const [symbolData, setSymbolData] = useState([]);
    const [companyName, setCompanyName] = useState('');
    const classes = useStyles();
    const location = useLocation();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    // Get search query when route changes
    useEffect(() => {
        let query = getObjectFromQueryString(location.search);
        setSymbolData([]);
        setQuerySymbol(query.search.toUpperCase());
    }, [location]);

    // Load symbolData for given symbol
    useEffect(() => {
        if(querySymbol == '' || symbolData.length > 0) {return;}
        Axios.get(`/api/symbol/${querySymbol}`).then((res) => {
            closeSnackbar();
            setCompanyName(res.data.companyName);
            setSymbolData(res.data.performance);
        }).catch((err) => {
            enqueueSnackbar(getResErrorMessage(err), {variant: 'error'});
        })
    }, [querySymbol, symbolData])

    return (
        <div className={classes.root}>
            <Typography variant="h1" color="primary" align="center" className={classes.title}>Search Symbols 🔍</Typography>
            <SymbolSearchBar />
            {
                // Show performance graph if we have data, show nothing otherwise
                symbolData.length > 0 ?
                <Box marginTop="5em" align="center">
                    <Typography variant="h4" align="center">{querySymbol} Performance:</Typography>
                    <PerformanceGraph data={symbolData}/>
                    <Typography variant="h4" align="center">{querySymbol} Related News:</Typography>
                    <NewsComponent queryTerms={[companyName]}/>
                </Box> :
                <></>
            }
        </div>
    );
}

export default SymbolPage
