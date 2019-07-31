import React, { Component } from 'react'
import { Route ,Link } from 'react-router-dom'
import MainPage from './MainPage'
import Nav from './Nav'
import SignUpForm from './SignUpForm';
import BucketList from './BucketList'
import PackingList from './PackingList'
import LoginForm from './LoginForm';
import TokenService from './token-service'
//import config from './config';
import PublicOnlyRoute from './PublicOnlyRoute';
import PrivateRoute from './PrivateOnlyRoute';
import HomePage from './HomePage';




class App extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			user:'',
			error:null
		
		}
		
	}

	render() {
		return ( 
			<div className = 'App' >
			   <Route path='/' component={Nav} />
			   <Route path='/' exact component={HomePage} />
			   <PrivateRoute path='/search' component={MainPage} />
			 	<PrivateRoute path='/bucketList' component={BucketList} />
			   <PublicOnlyRoute path='/signup' component={SignUpForm} />
			 
         
			
			/>
		</div>
		);
	}
}

export default App;