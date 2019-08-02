import React from 'react';
import LoginForm from './LoginForm';
import TokenService from './token-service';
import BucketList from './BucketList';
import PackingList from './PackingList';

import MainPage from './MainPage';



class HomePage extends React.Component {
    handleLogoutClick = () => {
        TokenService.clearAuthToken()
    }

// Display all reviews path once user is logged in 
    renderLoggedInPath() {
        return (
            <section className='header-logged-in-profile'>
			<MainPage />
            <BucketList /> 
			<PackingList />
			            </section>
        )
    }

// Display login form and welcome page when user is logged out
    renderLoginForm() {
        return (
            <section className='login'>
                <LoginForm />
            </section>
        )
    }
    render() {
        return (
			<div>
            <section className='home-screen'>
                {TokenService.hasAuthToken()
                    ? this.renderLoggedInPath()
                    : this.renderLoginForm()}
            </section>
</div>
        )
    }
}

export default HomePage;