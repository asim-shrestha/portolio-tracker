import React, {useState, useContext, useEffect} from 'react';
import Axios from 'axios';
import {UserContext} from './Auth/UserStore';
import Typography from '@material-ui/core/Typography';
import HoldingsTable from './HoldingsTable';

const DashboardPage = () => {
    const [holdings, setHoldings] = useState([]);
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

    console.log(holdings);
    return (
        <>
            <Typography variant="h2" align="left">Holdings:</Typography>
            <HoldingsTable data={holdings}/>
        </>
    );
}

export default DashboardPage;

