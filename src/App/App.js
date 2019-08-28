import React from 'react'
import { Route } from 'react-router-dom'
import MainPage from '../MainPage/MainPage'
import SignUpForm from '../SignUpForm/SignUpForm';
import LoginForm from '../LoginForm/LoginForm';
import BucketList from '../BucketList/BucketList';
import PackingList from '../PackingList/PackingList';
import './App.scss';
import './App.css';
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
		return ( 
			<div>
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