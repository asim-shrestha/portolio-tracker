import React, {useContext, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import Axios from 'axios';
import {UserContext} from './UserStore';

// Component that checks whether or not an existing user token is available
export default () => {
    const [user, setUser] = useContext(UserContext);
    const history = useHistory();

    // Test for existing tokens on render
    useEffect(() => {
        // Look for token
        const token = localStorage.getItem('token');
        if (!token) {
            console.log("No user token found");
            history.push('/');
            return;
        }
        // Token found, get user 
        Axios.get('/auth/findUser', {
            headers: { Authorization: `JWT ${token}` }
        }).then(res => {
            setUser(res.data);
        }).catch(() => {
            // Error loading data, redirect to error page
            history.push('/');
            console.error('Session authentication failed!');
        });
    }, []);

    return (
        <></>
    )
}
