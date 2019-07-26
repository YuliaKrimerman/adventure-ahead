import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export default class Nav extends Component {
  render() {
    return (
      <div className='Nav'>
        <a href='/'>
          Home
        </a>
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