import React, { Component } from 'react'

export default class BucketList extends Component{
			constructor(props) {
			super(props);
			this.state = {
				data: [],
			
			}
		}
	// post the data that was chosen by the user to the DB
	
	fetchList() {
	const url = `http://localhost:8000/listTravel`
			fetch(url)
			.then(response => {
				if (!response.ok) {
					throw new Error(response.statusText);
				}
				return response.json();
			})
			.then(data => {	
			this.renderResults(data)
		})
			.catch(err => {
				console.log(err);
			});
		}
	
	
	renderResults(data) {
		console.log("dsjfk")
	const tripListData = data
	console.log(tripListData)
		const tripDataResults = tripListData.map((items, id) => {
			console.log(items)
		return(
		
	
							 	<ul>
							 		<li key={id}>Comments:{items.name}
									</li>
									<li key={id}>Name:{items.snippet}
									</li>
								</ul>
			
			
									)})
		console.log(tripDataResults)
		return (
			
			<div>
			{tripDataResults}
		</div>
		);
	
}
	render() {
	//	const fetchList = this.props.fetchList
	//	const displayList = this.tripDataResults
		return(
			<div>

		{this.fetchList()}
			</div>
		)
	}
}
	
