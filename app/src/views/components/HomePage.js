import React, { useContext } from 'react';
import { UserContext } from './Auth/UserStore';
import LandingPage from './LandingPage'
import DashboardPage from './DashboardPage'

// Displays dashboard if logged in, landing page otherwise
const Home = () => {
    const [user, setUser] = useContext(UserContext);

    return (user && user.id) ? <DashboardPage/>: <LandingPage/>
}

export default Home
