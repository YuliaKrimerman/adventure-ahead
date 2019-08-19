import React from 'react';
import TokenService from '../Services/token-service';
import config from '../config';
import './Results.scss';
import Nav from '../Nav/Nav'



class Results extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				snippet: '',
				name: '',
				
				user_id:''
			}
			const newuserid = TokenService.getUserId('userid');
			const currentToken = TokenService.getAuthToken();
		}
	// handle the form submission
		handleSubmit(e) {
			e.preventDefault();
			this.updatetravelData();	
		}
	
	
	//updates the data thats in the currents state to what user clicked on and calls the post finction 
		updatetravelData () {
			let travelData = { 
				
				name: this.state.name,
				snippet: this.state.snippet,
				user_id: TokenService.getUserId('userid')
			}
			this.postTravelData(travelData);
		}
	
	
	// post the data that was chosen by the user to the DB
		postTravelData(travelData) {
			const newJwt = this.currentToken
					fetch(`https://blooming-stream-59570.herokuapp.com/listTravel`, {
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
					<h7>"{items.name}" </h7> 
					<h8>{items.snippet} </h8>
					<button type="submit" className="btn4 draw-border"  onClick={() => this.setState({id:items.id,name:items.name,snippet:items.snippet})}> Add to bucket list </button>
		  		</li>
			</form>
			);
    	});
			
		return (
			<div>
				<div className="text-box3">
					<div className="scrollbar3"  id="style-4">
						{tripDataResults}
					</div>
				</div>
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
	
