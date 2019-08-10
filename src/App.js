import React, { Component } from 'react'
import { Route ,Link } from 'react-router-dom'
import MainPage from './MainPage'
import Nav from './Nav'
import SignUpForm from './SignUpForm';
import BucketList from './BucketList'
import PackingList from './PackingList'
import LoginForm from './LoginForm';
import TokenService from './token-service'
import './App.scss';
import PublicOnlyRoute from './PublicOnlyRoute';
import PrivateRoute from './PrivateOnlyRoute';
import HomePage from './HomePage';




class App extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			user:'',
			error:null,
		 hidediv: false

		}
	}
	
  handleToggleClick() {
    this.setState({
      hidediv: true
    });
	   
  }
	
	
	render() {
		return ( 
			<div className = 'App'>
			<img className="hero" src={`https://i.ibb.co/jRRMQsN/Untitledff.png`} alt="Logo" />
			<div  hidden={this.state.hidediv}>
				<div className="Header" >
			<h1>  Wanna be as ready as possible for your next trip? <br></br> Sign in, explore local highlights in <br></br>the city you are visiting,add them to your Bucketlist and then pack for the trip<br></br> with the ultimate Packing Checklist. </h1>
			</div>
          
			<div className="sign" >
			<Link to='/login' className="btn draw-border" onClick={e =>this.handleToggleClick()} > Sign In </Link>
			<h2> Don't have a user? Sign Up here </h2>
			<Link to='/signup'  className="btn2 draw-border-two" onClick={e =>this.handleToggleClick()}> Sign Up </Link>
			</div>
</div>
              
			
			   
				     <Route path='/' exact component={HomePage} />
			
			   <PrivateRoute path='/search' exact component={MainPage} />
			  <PrivateRoute path='/bucketList' exact component={BucketList} />
			   <PrivateRoute path='/packingList' exact component={PackingList} />
			   <PublicOnlyRoute path='/signup' exact component={SignUpForm} />
			  <PublicOnlyRoute path='/login'  exact component={LoginForm} />
			 
         
			
	
		</div>
		);
	}
}

export default App;