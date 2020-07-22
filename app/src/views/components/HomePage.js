import React, { useContext } from 'react';
import { UserContext } from './Auth/UserStore';
import LandingPage from './LandingPage'
import DashboardPage from './DashboardPage'
const Home = () => {
    const [user, setUser] = useContext(UserContext);

    return (user && user.id) ? <DashboardPage/>: <LandingPage/>
}

export default Home
