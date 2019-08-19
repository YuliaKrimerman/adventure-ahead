import React, { Component } from 'react'
import { Route ,Link } from 'react-router-dom'
import MainPage from '../MainPage/MainPage'
import SignUpForm from '../SignUpForm/SignUpForm';
import LoginForm from '../LoginForm/LoginForm';
import TokenService from '../Services/token-service';
import BucketList from '../BucketList/BucketList';
import PackingList from '../PackingList/PackingList';
import Nav from '../Nav/Nav'
import './App.scss';
import PublicOnlyRoute from '../Routes/PublicOnlyRoute';
import PrivateRoute from '../Routes/PrivateOnlyRoute';
import HomePage from '../HomePage/HomePage';



class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user:'',
			error:null,
  			isBoxVisible:false
		}
	}
	
  toggleBox() {
    this.setState({
      isBoxVisible: true
    });
  }
	
	
	render() {
		 const { isBoxVisible } = this.state;
			return ( 
			<div>
				<div className = 'App'>
					<div className="hero">
						<div className="Header" >
							<h5>ADVENTURE AHEAD </h5>
							<h1>  Wanna be as ready as possible for your next trip? <br></br> Sign in, explore local highlights in <br></br>the city you are visiting,add them to your Bucketlist and  <br></br>then pack for the trip<br></br> with the ultimate Packing Checklist. </h1>
						</div>
					
						<div className="sign" hidden= {!this.state.isBoxVisible} >
							<Link to='/login' className="btn draw-border" onClick={e =>this.toggleBox()} > Sign In </Link>
								<h2> Don't have a user? Sign Up here </h2>
							<Link to='/signup'  className="btn2 draw-border-two" onClick={e =>this.toggleBox()}> Sign Up </Link>
						</div>
				
				</div>
			
				<Route path='/' exact component={HomePage} />
				<PrivateRoute path='/search' exact component={MainPage} />
				<PrivateRoute path='/bucketList' exact component={BucketList} />
				<PrivateRoute path='/packingList' exact component={PackingList} />
			 	<PublicOnlyRoute path='/signup' exact component={SignUpForm} />
			 	<PublicOnlyRoute path='/login'  exact component={LoginForm} />
			</div>
		</div>
		);
	}
}

export default App;