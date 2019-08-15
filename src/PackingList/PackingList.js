import React, { Component } from 'react'
import TokenService from '../Services/token-service';
import './PackingList.css';
import Nav from '../Nav/Nav'

export default class PackingList extends Component{
			constructor(props) {
			super(props);
			this.state = {
				data: [],
				user_id:'',
				id:'',
				isChecked:false,
				newData:[],
			}
		}

//handle the post of the new item as checked into db : sets state of that item to checked then calls the post function
	handlePost(e){
		e.preventDefault();
		this.setState({
			isChecked:true,
			hidediv:true
		})
		this.postUserData(e.target.value,true);
	}

	//updates the the updated item to the db as checked, reload the window
	postUserData(newId, isChecked) {
		let usersData = {
				"checked":true
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
			else {
				console.log('Nothing Here')
			}
				})
		window.location.reload()
	}
	
	// fetches again the list with the updated data and calls function that will only show data that is "checked"
	
fetchNewPackList() {
	const url = `http://localhost:8000/packData/${TokenService.getUserId('userid')}`
			fetch(url)
			.then(response => {
				if (!response.ok) {
					throw new Error(response.statusText);
				}
				return response.json();
			})
			.then(data => {	
			this.renderUpdated(data)
		})
			.catch(err => {
				console.log(err);
			});
		}
	
	//shows the new data from the db where item checked is only true
renderUpdated(data){
	let newData = this.state.newData
	let newOnes =[];
		for (let i=0; i< data.length; i++) {
			if (data[i].checked === true) {
				newOnes.push(data[i])
			  }
		}
			if (newData.length !== newOnes.length) {
				this.setState ({
				  newData:newOnes
			})
			} else
			{
				console.log('nothing here')
			}

}

	//fetches the list of all items on the list for the first time, calls function to display data
	
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
			this.renderNew(data)
				
		})
			.catch(err => {
				console.log(err);
			});
		}
	
	// shows the data on the to pack list
	renderNew(data){
		const oldData= this.state.data
		if (data.length !== oldData.length){ 
			this.setState({
			data:data
		});
		}
			else {
				console.log('nothing here')
			}
	}

	render() {
		const selectedData = this.state.newData
		const newTwo = this.state.data.map((items, id) => 
 			<div>					 
				<form className="userUpdate">
					<ul>						  
						<li key={id} >{items.list} 
						</li>
						<button className="btn5 draw-border" value={items.id} type="submit" onClick ={e =>this.handlePost(e)}>Add to Packed List  </button>
					</ul>
				</form>
			</div>
				)	
		return (
			<div>
				<Nav />
				{this.fetchPackList()}
				{this.fetchNewPackList()}
				{this.selectedData}
				<div className="text-box">
					<div className="scrollbar"  id="style-4">
			  			<h4>ITEMS TO PACK </h4>
							{newTwo}
					</div>
				</div>
				<div className="text-box2">
				<div className="scrollbar"  id="style-4">
					<ul id="special">
  						<h4>PACKED ITEMS</h4> {selectedData.map((d, idx) =>
         					<li key={idx}>{d.list}</li>)} 
					</ul>
				</div>
				</div>
			</div>
		)
	}
}
