import React, { Component } from 'react'
import TokenService from './token-service';

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

	handleSubmit(e) {
			e.preventDefault();
			this.deleteUserData();
		}
	
	handlePost(e){
		e.preventDefault();
		this.searchTermUpdateName();
		this.searchTermUpdateSnippet();
		this.postUserData();
	}
	
	searchTermUpdateName(name) {
		this.setState({
				name: name
			})
		}
	searchTermUpdateSnippet(snippet) {
			this.setState({
				snippet:snippet
			})
		}

	
	postUserData() {
		let usersData = {
				"name": this.state.name,
				"snippet": this.state.snippet,
			 "user_id": TokenService.getUserId('userid')
			}
			fetch(`http://localhost:8000/listTravel/${TokenService.getUserId('userid')}/`, {
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
		.then ( window.location.reload())
		
	}
	
	
	

	deleteUserData(){
		let id = this.state.id
		console.log(id)
			fetch(`http://localhost:8000/listTravel/${TokenService.getUserId('userid')}/${id}`, {
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

		
		
		
		}
	
	fetchList() {
	const url = `http://localhost:8000/listTravel/${TokenService.getUserId('userid')}`
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
	renderNew(data){
		const oldData= this.state.data
		if (data.length !== oldData.length){ 
		console.log('inside the if')	
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
				<ul>						  
					<li key={id}>Name:{items.name}
					</li>
					<li key={id}>Snippet:{items.snippet}
					</li>
				 	<form className="deleteFromList" onSubmit={e => this.handleSubmit(e)}>
					<button type="submit"  onClick={() => this.setState({id:items.id})} className="deleteItemButton">DELETE</button>	
					</form>
				</ul>
			</div>
		)
		return (
			<div>
				<form className="userInput" onSubmit={e => this.handlePost(e)}>
					<div className = "container">
						<input type = "text" required
							onChange = {e => this.searchTermUpdateName(e.target.value)}
							placeholder = "Name" >
						</input> 
						<input type = "text" required
							onChange = {e => this.searchTermUpdateSnippet(e.target.value)}
							placeholder = "Snippet" >
						</input> 
						<div className = "buttons-coll" >
							<button type = "submit"
							className ="custom-btn btn-4"> <span> Add </span>
							</button> 
						</div> 
					</div> 
				</form>
			{this.fetchList()}
			{newOne}
					</div>
		)
	}
}

	

