import React, { Component } from 'react'
import TokenService from './token-service';
import './PackingList.css';
import Nav from './Nav'

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


	handlePost(e){
		e.preventDefault();
		this.setState({
			isChecked:true,
			hidediv:true
		})
		this.postUserData(e.target.value,true);
		this.fetchNewPackList();
		
	}

	
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
				
				console.log('dasdfasd')
			}
				})
	
	}
	
	
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
	
renderUpdated(data){
	let newOnes =[];
		for (let i=0; i< data.length; i++) {
			if (data[i].checked === true) {
				newOnes.push(data[i])
			
			  };
				this.setState ({
				  newData:newOnes
			})
				console.log(newOnes)

	
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
		console.log(oldData, data)
		if (data.length !== oldData.length){ 
		console.log('inside the if')	
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
		console.log(this.state.newData)
		const newTwo = this.state.data.map((items, id) => 
 			<div>	
				<form className="userUpdate">
					<ul>						  
						<li key={id} >Name:{items.list} 
						</li>
						<button value={items.id} type="submit" onClick ={e =>this.handlePost(e)}>Add to Packed List  </button>
					</ul>
				</form>
			</div>
				)	
		return (
			<div>
				<Nav />
				{this.fetchPackList()}
				{this.selectedData}
				<div className="text-box">
					<div className="scrollbar"  id="style-4">
						{newTwo}
					</div>
				</div>
				<div className="text-box2">
				<div className="scrollbar"  id="style-4">
					<ul>
  						<h7>Comments:</h7> {selectedData.map((d, idx) =>
         					<li key={idx}>{d.list}</li>)} 
       				
					</ul>
				</div>
				</div>
		</div>
		)
	}
}