import React from 'react';
import TokenService from '../Services/token-service';
import './HomePage.css';
import MainPage from '../MainPage/MainPage';
import { Link } from 'react-router-dom'


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
	
  toggleBox() {
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
    			<div className="hero1">
					<div className="sign" hidden= {!this.state.isBoxVisible}>
							<Link to='/login' className="btn draw-border" onClick={e =>this.toggleBox()} > Sign In </Link>
								<h2> Don't have a user? Sign Up here </h2>
							<Link to='/signup'  className="btn2 draw-border-two" onClick={e =>this.toggleBox()}> Sign Up </Link>
					</div>
				</div>
			</div>
      )
    }
    render() {
        return (
			<div>
			<div className="hero1">
						<div className="Header" >
							<h5>ADVENTURE AHEAD </h5>
							<h1>  Wanna be as ready as possible for your next trip? <br></br> Sign in, explore local highlights to visit and <br></br>then pack for the trip<br></br> with the ultimate Packing Checklist. </h1>
							</div>	
                	{TokenService.hasAuthToken()
                    	? this.renderLoggedInPath()
						: this.renderLoginForm()}
            	</div>
			</div>
        )
    }
}
export default HomePage;