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
				<ul>						  
					<li key={id}>Name:{items.list}
					</li>
					<form className="userUpdate" onSubmit={e => this.handlePost(e)}>
					<input key={id} onClick={() => this.setState({isChecked:true})}type="checkbox"  /> 
					</form>
				</ul>
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