import React, {useState, useContext, useEffect} from 'react';
import Axios from 'axios';
import {UserContext} from './Auth/UserStore';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import HoldingsTable from './Holdings/HoldingsTable';
import AddHoldingsDialog from './Holdings/AddHoldingsDialog';
import ImportCSVDialog from './Holdings/ImportCSVDialog';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DashboardGraph from './Charts/DashboardGraph';
import HoldingsPieChart from './Charts/HoldingsPieChart'

const useStyles = makeStyles((theme) => ({
    button: {
        marginTop: theme.spacing(2),
    },
    text: {
        fontWeight: "bold",
    }
}));

// Page to display user's portfolio metrics
const DashboardPage = () => {
    const [user, setUser] = useContext(UserContext);
    const [holdings, setHoldings] = useState(null);
    const [performance, setPerformance] = useState([]);
    const [isAddHoldingsDialogOpen, setIsAddHoldingsDialogOpen] = useState(false);
    const [isImportCSVDialogOpen, setIsImportCSVDialogOpen] = useState(false);

    // Format holding data into an array of objects
    const formatData = (data) => {
        return Object.entries(data).map((element) => {
            return {
                "symbol": element[0],
                ...element[1]
            }
        });
    }

    const loadData = () => {
        // Retrieve user performance data
        Axios.get(`/api/performance/${user.id}`).then((res) => {
            setPerformance((res.data));
        }).catch((err) => {
            alert(err);
        })
        // Retrieve user holding data
        Axios.get(`/api/holdings/${user.id}`).then((res) => {
            setHoldings(formatData(res.data));
        }).catch((err) => {
            alert(err);
        })
    }
    
    useEffect(() => {
        if(user != null) {
            loadData();
        }
    }, [user]);

    const classes = useStyles();

    if(user === null) {return <Typography variant="h1" align="center" color="primary" className={classes.text}>Error loading user</Typography>}
    return (
        <>
            <Typography variant="h1" align="left" color="primary" className={classes.text}>{user.first_name}'s Dashboard</Typography>
            <Typography variant="h3" align="left" color="primary" className={classes.text}>Performance:</Typography>
            <Box align="center">
                <DashboardGraph data={performance} holdings={holdings}/>
            </Box>
            <Typography variant="h3" align="left" color="primary" className={classes.text}>Holdings:</Typography>
            <HoldingsTable data={holdings} loadData={loadData}/>
            <Button variant="contained" color="primary" className={classes.button} fullWidth onClick={() => setIsAddHoldingsDialogOpen(true)}>Add individual</Button>
            <Button variant="contained" color="primary" className={classes.button} fullWidth onClick={() => setIsImportCSVDialogOpen(true)}>Import from CSV</Button>
            <Typography variant="h3" align="left" color="primary" className={classes.text}>Breakdown of Holdings:</Typography>
            <HoldingsPieChart data={holdings} />
            <AddHoldingsDialog open={isAddHoldingsDialogOpen} onClose={() => setIsAddHoldingsDialogOpen(false)} resetHoldings={loadData}/>
            <ImportCSVDialog open={isImportCSVDialogOpen} onClose={() => setIsImportCSVDialogOpen(false)}/>
        </>
    );
}

export default DashboardPage;

