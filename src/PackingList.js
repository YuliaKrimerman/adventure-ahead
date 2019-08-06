import React, { Component } from 'react'
import TokenService from './token-service';

export default class PackingList extends Component{
			constructor(props) {
			super(props);
			this.state = {
				data: [],
				user_id:'',
				id:'',
				name:"",
				snippet:"",
				isChecked:false
				
			}
		}
	stateUpdate(e){
		console.log(!this.state.isChecked)
		this.setState({
			isChecked: !this.state.isChecked,
			id:e.target.value
		});
		console.log(this.state)
		this.postUserData(e.target.value,!this.state.isChecked);
	
	}
	
	handlePost(e){
	e.preventDefault();
	this.stateUpdate(e);
	}


	
	
	
	postUserData(newId, isChecked) {
		let usersData = {
				"checked":!this.state.isChecked
			}
		
		let url = `http://localhost:8000/packData/${TokenService.getUserId('userid')}/${newId}`
		console.log(url,newId)
			fetch(url, {
					method: 'PATCH',
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
					
				
this.fetchPackList()
				})
	
	}
	
	

	
	fetchPackList() {
	const url = `http://localhost:8000/packData/${TokenService.getUserId('userid')}`
			fetch(url)
			.then(response => {
				if (!response.ok) {
					throw new Error(response.statusText);
				}
				return response.json();
			})
			.then(data => {	
				console.log(data)
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
			const newTwo = this.state.data.map((items, id) => 
			<div>				
			<form className="userUpdate" onSubmit={e => this.handlePost(e)}>
				<ul>						  
					<li key={id}>Name:{items.list}
					</li>
					<input value={items.id} onClick ={e => this.stateUpdate(e)} type="checkbox" checked={this.state.isChecked}  /> 
				</ul>
			</form>
			</div>
				)
		return (
			<div>
				<form>
			<button type="submit">Save Changes </button>
			</form>
		{this.fetchPackList()}
		{newTwo}
		</div>
		)
	}
}