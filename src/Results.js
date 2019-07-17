import React from 'react';



class Results extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
			//	tripData: [],
				poi_id: '',
				tag_name: '',
				snippet: '',
				name: ''
			}
		}


		// submit form trigers to post the user data to the DB
		handleSubmit(e) {
			e.preventDefault();
			this.postUserData();

		}

		postUserData() {
			let travelData = {
				"poi_id": this.props.poi_id,
				"tag_name": this.props.tag_name,
				"snippet": this.props.snippet,
				"name": this.props.name
			}

			fetch(`http://localhost:8000/listTravel`, {
					method: 'POST',
					body: JSON.stringify(travelData),
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
	renderResults() {
		const tripData= this.props.itemsDisplay
		if (tripData.length > 0) {		
      const tripDataResults = this.props.itemsDisplay.map((items, index) => {
		  console.log(items)
        return (
		
          <li key={index}>
            <h1>{items.name}</h1>
			<h2>{items.snippet}</h2>
          </li>
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
			tripDataResults={this.renderResults()}
			</div>
		)
	}
}
		
export default Results;
	
	