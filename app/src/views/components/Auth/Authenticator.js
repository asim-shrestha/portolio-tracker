import React, {useContext, useEffect} from 'react';
import Axios from 'axios';
import {UserContext} from './UserStore';

// Component that checks whether or not an existing user token is available
export default () => {
    const [user, setUser] = useContext(UserContext);

    // Test for existing tokens on render
    useEffect(() => {
        // Look for token
        const token = localStorage.getItem('token');
        if (!token) {
            console.log("No user token found");
            return;
        }
        // Token found, get user 
        Axios.get('/auth/findUser', {
            headers: { Authorization: `JWT ${token}` }
        }).then(res => {
            setUser(res.data);
        }).catch(() => {
            console.error('Session authentication failed!');
        });
    }, []);

    return (
        <></>
    )
}
