import React, {useState, useContext, useEffect} from 'react';
import Axios from 'axios';
import {UserContext} from './Auth/UserStore';
import Typography from '@material-ui/core/Typography';
import HoldingsTable from './Holdings/HoldingsTable';
import AddHoldingsDialog from './Holdings/AddHoldingsDialog';
import ImportCSVDialog from './Holdings/ImportCSVDialog';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    button: {
        marginTop: theme.spacing(2),
    },
}));

const DashboardPage = () => {
    const [holdings, setHoldings] = useState([]);
    const [isAddHoldingsDialogOpen, setIsAddHoldingsDialogOpen] = useState(false);
    const [isImportCSVDialogOpen, setIsImportCSVDialogOpen] = useState(false);
    const [user, setUser] = useContext(UserContext);

    // Format holding data into an array of objects
    const formatData = (data) => {
        return Object.entries(data).map((element) => {
            return {
                "symbol": element[0],
                ...element[1]
            }
        });
    }

    // Retrieve user holding data
    useEffect(() => {
        Axios.get('/api/holdings', {id: user.id}).then((res) => {
            setHoldings(formatData(res.data));
        }).catch((err) => {
            alert(err);
        })
    }, [])

    const handleAddHolding = () => {
        return;
    }
    
    console.log(holdings);
    const classes = useStyles();
    return (
        <>
            <Typography variant="h2" align="left">Holdings:</Typography>
            <HoldingsTable data={holdings}/>
            <Button variant="contained" color="primary" className={classes.button} onClick={() => setIsAddHoldingsDialogOpen(true)}>Add individual</Button>
            <Button variant="contained" color="primary" className={classes.button} onClick={() => setIsImportCSVDialogOpen(true)}>Import from CSV</Button>
            <AddHoldingsDialog open={isAddHoldingsDialogOpen} onClose={() => setIsAddHoldingsDialogOpen(false)}/>
            <ImportCSVDialog open={isImportCSVDialogOpen} onClose={() => setIsImportCSVDialogOpen(false)}/>
        </>
    );
}

export default DashboardPage;

