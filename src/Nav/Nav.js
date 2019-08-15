import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import TokenService from '../Services/token-service';


export default class Nav extends Component {
	    handleLogoutClick = () => {
        TokenService.clearAuthToken()
    }
		
	renderLogoutLink() {
        return (
            <div className='header-logged-in'>
                <Link
                    className='logout-link'
                    onClick={this.handleLogoutClick}
                    to='/'>
                    <span title='Logout'></span>
                </Link>
            </div>
        )
    }
   
// display link in header to register/sign up 
    renderLoginLink() {
        return (
            <div className='header-logged-out'>
                <Link
                    className='register-link'
                    to='/signup'>
                    Register {' '}
                    <i className="fas fa-user-plus" />
                </Link>
            </div>
        )
    }
		
  render() {
    return (
      <div className='Nav'>
        <li><a href='/search'>
          Search     
        </a></li>
       <li> <a href='/bucketlist'>
          Bucketlist   
        </a></li>
		<li> <a href='/packinglist'> 
          Packing List
        </a></li>
		<li>  
            <a href='/'
                    className='logout-link'
                    onClick={this.handleLogoutClick}
                    to='/'>
                    Log out
              
        </a></li>
                <nav role="navigation">
                    {TokenService.hasAuthToken()
                        ? this.renderLogoutLink()
                        : this.renderLoginLink()}
                </nav>
      </div>
    )
  }
}