import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';


export default class Nav extends Component {
	
	constructor(props) {
		super(props);
	}
  render() {
    return (
      <div className='Nav'>
        <a href='/search'>
          Search
        </a>
        <a href='/bucketlist'>
          Bucketlist 
        </a>
		 <a href='/packinglist' render={() => {this.props.fetchNewPackList()}}>
          Packing List
        </a>
      </div>
    )
  }
}