import React, { Component } from 'react'
import TokenService from '../Services/token-service';
import Nav from '../Nav/Nav';
import './BucketList.scss';
import config from '../config';


export default class BucketList extends Component{
			constructor(props) {
			super(props);
			this.state = {
				data: [],
				user_id:'',
				id:'',
				name:"",
				snippet:""
			}
		}

	//handle click to delete the specific item
	handleClick(id){
		this.deleteUserData(id);
	}
	//handle submit of the whole delete form to prevent subimt
	handleSubmit(e) {
		e.preventDefault();
	}
	
	//handle post of the users item to the bucketlist
	handlePost(e){
		e.preventDefault();
		this.searchTermUpdateName();
		this.searchTermUpdateSnippet();
		this.postUserData();
	}
	// updates the state of the users input item name
	searchTermUpdateName(name) {
		this.setState({
				name: name
			})
		}
	// updates the state of the users input item snippet
	searchTermUpdateSnippet(snippet) {
			this.setState({
				snippet:snippet
			})
		}

	//posts the new item of the bucketlist to the db, refreshes the window 
	postUserData() {
		let usersData = {
				"name": this.state.name,
				"snippet": this.state.snippet,
			 	"user_id": TokenService.getUserId('userid')
			}
			fetch(config.API_ENDPOINT + `listTravel/${TokenService.getUserId('userid')}/`, {
					method: 'POST',
					body: JSON.stringify(usersData),
					headers: {
					'Content-Type': 'application/json',
						'Authorization': `bearer ${TokenService.getAuthToken()}`
				}})

				.then(res => {
					if (!res.ok) {
						// get the error message from the response,
						return res.json().then(error => {
							// then throw it
							throw error
						})
					}
				})
		.then (window.location.reload())
	}
	
	
	// deletes the selected item on the bucketlist from the DB

	deleteUserData(id){
			fetch(config.API_ENDPOINT + `listTravel/${TokenService.getUserId('userid')}/${id}`, {
					method: 'DELETE',
					body: JSON.stringify(id),
					headers: {
						'Content-Type': 'application/json'
					}
				})
				.then(res => {
					if (!res.ok) {
						// get the error message from the response,
						return res.json().then(error => {
							// then throw it
							throw error
						})
					}
				})
		.then (window.location.reload())
		}
	// fetches the usersr bucketlist from the DB
	fetchList() {
	const url = config.API_ENDPOINT + `listTravel/${TokenService.getUserId('userid')}`
			fetch(url)
			.then(response => {
				if (!response.ok) {
					throw new Error(response.statusText);
				}
				return response.json();
			})
			.then(data => {	
			this.renderNew(data)
		})
			.catch(err => {
				console.log(err);
			});
		
		}
	// Displays the new data that was fetchet from the DB
	renderNew(data){
		const oldData= this.state.data
		if (data.length !== oldData.length){ 	
			this.setState({
			data:data
		})}
			else {
				console.log('nothing here')
			}
	}

	
	render() {
		const newOne = this.state.data.map((items, id) => 
			<div>	
				<ul className="Results">						  
					<li key={id}><h7>"{items.name}" </h7>
					</li>
					<li key={id}><h8>{items.snippet}</h8>
					</li>
				 	<form className="deleteFromList" onSubmit={e => this.handleSubmit(e)}>
					<button className="btn3 draw-border" type="submit" onClick={() => this.handleClick(items.id)} className="deleteItemButton">DELETE</button>	
					</form>
				</ul>
			</div>
		)
		return (
			<div>
				<div className="hero">
					<div className="Header" >
						<h5>ADVENTURE AHEAD </h5>
						<h1>Look up for local Higlights in yor destination city,<br></br> add them to your Bucketlist, <br></br> and then pack your luggage with the Packing List. </h1>
					</div>
			</div>
				<Nav />
					<fieldset>
						<h4>MY BUCKETLIST </h4>
						{newOne}
						<form className="userInput" onSubmit={e => this.handlePost(e)}>
							<div className = "container">
								<h6> Add a place of your own </h6>
								<input type = "text" required
									onChange = {e => this.searchTermUpdateName(e.target.value)}
									placeholder = "Name" >
								</input> 
								<input type = "text" required
									onChange = {e => this.searchTermUpdateSnippet(e.target.value)}
									placeholder = "Description" >
								</input> 
								<div className = "buttons-coll" >
									<button type = "submit" className ="btn3 draw-border"> <span> Add </span>
								</button> 
							</div> 
						</div> 
					</form>
					{this.fetchList()}
				</fieldset>
			</div>
		)
	}
}