import React from 'react';



class Results extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
			
				snippet: '',
				name: '',
				po_id:''
			}
		}
		updatetravelData () {
			let travelData ={ 
					poi_id: this.state.id,
					name: this.state.name,
					snippet: this.state.snippet

			}
			this.postTravelData(travelData);
						console.log(travelData)

				}
	
		handleSubmit(e) {
			e.preventDefault();
	this.updatetravelData();
			
		}
	
	postTravelData(travelData) {
					fetch(`http://localhost:8000/listTravel`, {
					method: 'POST',
						
					body: JSON.stringify(travelData),
					headers: {
						'Content-Type': 'application/json'
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

		}
		
	

	renderResults() {
		const tripData= this.props.itemsDisplay
		if (tripData.length > 0) {		
        const tripDataResults = this.props.itemsDisplay.map((items, index) => {
        return (
		<form onSubmit = {e => this.handleSubmit(e)}>
          	<li key={index}>
					<input type="text"
							value={items.id}  /> 
					<h2>{items.name} </h2> 
					<h2>{items.snippet} </h2>
					<h2>{items.id} </h2>
					<button type="submit" onClick={() => this.setState({id:items.id,name:items.name,snippet:items.snippet})}> Add to bucket list </button>
			
		  </li>
		//	</form>
        
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
	
	