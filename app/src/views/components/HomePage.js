import React, {useContext} from 'react';
import { UserContext} from './Auth/UserStore';
import LandingPage from './LandingPage'
import DashboardPage from './DashboardPage'
const Home = () => {
    const [user, setUser] = useContext(UserContext);
    const isLoggedIn = (user != null && user.id);

    return (
            isLoggedIn ?
            <DashboardPage/>:
            <LandingPage/>
    );
}

export default Home
