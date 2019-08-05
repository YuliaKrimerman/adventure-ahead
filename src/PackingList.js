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
		this.setState({
			isChecked:true,
			id:e.target.value
		});
			this.postUserData();
	
	}
	
	handlePost(e){
	e.preventDefault();
	this.stateUpdate(e);
	

	}
	
	


	
	postUserData(isChecked,id) {
		let usersData = {
				"checked": this.state.isChecked
			}
		let newId = this.state.id
		let url = `http://localhost:8000/packData/${TokenService.getUserId('userid')}/${newId}`
		console.log(url)
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
				})
	
		
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
					<input value={items.id} onClick ={e => this.stateUpdate(e)} type="checkbox"   /> 
						
				</ul>
			</form>
			</div>
					  )
		return (
			<div>
		{this.fetchPackList()}
		{newTwo}
		</div>
		)
	}
}