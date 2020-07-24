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
    text: {
        fontWeight: "bold",
        textTransform: "capitalize" // Capitalize first letter
    }
}));

// Page to display user's portfolio metrics
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
    const loadData = () => {
        Axios.get(`/api/holdings/${user.id}`).then((res) => {
            console.log(res.data);
            setHoldings(formatData(res.data));
        }).catch((err) => {
            alert(err);
        })
    }
    
    useEffect(() => loadData(), []);

    const classes = useStyles();
    return (
        <>
            <Typography variant="h1" align="left" color="primary" className={classes.text}>{user.first_name}'s Dashboard</Typography>
            <Typography variant="h3" align="left" color="primary" className={classes.text}>Holdings:</Typography>
            <HoldingsTable data={holdings}/>
            <Button variant="contained" color="primary" className={classes.button} onClick={() => setIsAddHoldingsDialogOpen(true)}>Add individual</Button>
            <Button variant="contained" color="primary" className={classes.button} onClick={() => setIsImportCSVDialogOpen(true)}>Import from CSV</Button>
            {/* <AddHoldingsDialog open={isAddHoldingsDialogOpen} onClose={() => {setIsAddHoldingsDialogOpen(false); loadData();} }/> */}
            <AddHoldingsDialog open={isAddHoldingsDialogOpen} onClose={() => setIsAddHoldingsDialogOpen(false)} resetHoldings={loadData}/>
            <ImportCSVDialog open={isImportCSVDialogOpen} onClose={() => setIsImportCSVDialogOpen(false)}/>
        </>
    );
}

export default DashboardPage;

