import React from 'react';
import TokenService from '../Services/token-service';
import './HomePage.css';
import MainPage from '../MainPage/MainPage';



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
				<MainPage />
			 </section>
        )
    }

// Display login form and welcome page when user is logged out
    renderLoginForm() {
        return (
     	<div>
		</div>
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