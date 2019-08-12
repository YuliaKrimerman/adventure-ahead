import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';


export default class Nav extends Component {
  render() {
    return (
      <div className='Nav'>
        <a href='/search'>
          Search
        </a>
        <a href='/bucketlist'>
          Bucketlist 
        </a>
		 <a href='/packinglist'>
          Packing List
        </a>
      </div>
    )
  }
}