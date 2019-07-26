import React from 'react';
import TokenService from './token-service';
import config from './config'



class Results extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				snippet: '',
				name: '',
				poi_id:'',
				user_id:''
			}
			const newuserid = TokenService.getUserId('userid');
			const currentToken = TokenService.getAuthToken();
console.log(newuserid)
		}
	// handle the form submission
		handleSubmit(e) {
			e.preventDefault();
			this.updatetravelData();	
		}
	
	
	//updates the data thats in the currents state to what user clicked on and calls the post finction 
		updatetravelData () {
			let travelData = { 
				poi_id: this.state.id,
				name: this.state.name,
				snippet: this.state.snippet,
				user_id: TokenService.getUserId('userid')
				
			}
			console.log(travelData)
			this.postTravelData(travelData);
		}
	
	
	// post the data that was chosen by the user to the DB
		postTravelData(travelData) {
			const newJwt = this.currentToken
					fetch(`http://localhost:8000/listTravel`, {
					method: 'POST',
					body: JSON.stringify(travelData),
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `bearer ${TokenService.getAuthToken()}`
					}
				})

				.then(res => {
						console.log(res)
					if (!res.ok) {
						// get the error message from the response,
						return res.json().then(error => {
							// then throw it
							throw error
						})
						
					}
				})
			alert('Added to Bucket List')
		}
		
	
// displays the API result + updates the current state on Add to bucket list button click
	renderResults() {
		const tripData= this.props.itemsDisplay
			if (tripData.length > 0) {		
        	const tripDataResults = this.props.itemsDisplay.map((items, index) => {
        return (
			<form onSubmit = {e => this.handleSubmit(e)}>
          		<li key={index}>
					<h2>{items.name} </h2> 
					<h2>{items.snippet} </h2>
					<button type="submit" onClick={() => this.setState({id:items.id,name:items.name,snippet:items.snippet})}> Add to bucket list </button>

		  		</li>
			</form>
			);
    	});
			
		return (
				<div>
					{tripDataResults}
				</div>
			);
		}
	}
	
	
	render() {
		return(
			<div>
				{this.renderResults()}
			</div>
		)
	}
}
		
export default Results;
	
	