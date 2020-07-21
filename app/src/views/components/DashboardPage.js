import React, {useContext} from 'react';
import {UserContext} from './Auth/UserStore';
import Typography from '@material-ui/core/Typography';

const DashboardPage = () => {
    const [user, setUser] = useContext(UserContext);
    const isLoggedIn = (user == null);
    
    return (
        <>
            <Typography>Logged in my dude!</Typography>
        </>
    );
}

export default DashboardPage;

