import React, { Component } from 'react'
import TokenService from './token-service';

export default class BucketList extends Component{
			constructor(props) {
			super(props);
			this.state = {
				data: [],
				user_id:''
			}
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
			<ul>
				<li key={id}>Comments:{items.name}
				</li>
				<li key={id}>Name:{items.snippet}
				</li>
										   	<li key={id}>Name:{items.id}
				</li>
			</ul>
			)
		return (
			<div>
			{this.fetchList()}
			{newOne}
					</div>
		)
	}
}

	

