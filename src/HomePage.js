import React from 'react';
import LoginForm from './LoginForm';
import TokenService from './token-service';
import BucketList from './BucketList';
import PackingList from './PackingList';
import { Route ,Link } from 'react-router-dom';
import Nav from './Nav'
import './HomePage.css';

import MainPage from './MainPage';



class HomePage extends React.Component {
    handleLogoutClick = () => {
        TokenService.clearAuthToken()
    }
		constructor(props) {
		super(props);
		this.state = {
		 hidediv: false
		}
	}
	
  handleToggleClick() {
    this.setState({
      hidediv: true
    });
  }
	

// Display all reviews path once user is logged in 
    renderLoggedInPath() {
        return (
            <section className='header-logged-in-profile'>
			 <Nav />
			<MainPage />
       
			            </section>
        )
    }

// Display login form and welcome page when user is logged out
    renderLoginForm() {
        return (
	
     
	<div></div>
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