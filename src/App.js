import React from 'react';
import Results from './Results'


const mapsAPIKey = 'AIzaSyC6FqHjgnVXKVBLaFq-o28f77NjQXeBeJI';
const geocodeURL = 'https://maps.googleapis.com/maps/api/geocode/json?';



class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchTerm: '',
			searchCoord: {},
			tripData: {},
		}
	}


	// update the state with the input by the user
	searchTermUpdate(term, termConvert) {
		//convert to cappital letter
		let termConstruct = term.charAt(0).toUpperCase() + term.slice(1);
		//update the state to the current search term
		this.setState({
			searchTerm: termConstruct
		})
	}

	//update the state with the place coordinates recieved from Google maps
	searchCoordUpdate(searchCoord, lat) {
		this.setState({
			searchCoord: searchCoord
		})
		this.getPlaceseData(this.state.searchCoord);
	}

	// fetch Google API to convert the search terms place to longitude and altidude

	termConvert(searchTerm, searchCoordUpdate) {
		let searchURL = geocodeURL + `address=${encodeURIComponent(searchTerm)}&key=${mapsAPIKey}`;
		fetch(searchURL)
	
			.then(response => {
				if (response.ok) {
					return response.json();
				}
				throw new Error(response.statusText)
			})
			.then(responseJSON => {
				let searchCoord = responseJSON.results[0].geometry.location
				this.searchCoordUpdate(searchCoord)
			})

	}

	handleSubmit(e) {
		e.preventDefault();
		this.termConvert(this.state.searchTerm);
		console.log(this.state.searchTerm)
	}

// fetch the triposo data for the hughlights
	getPlaceseData(searchCoord, lat, lng) {
		const url = `https://www.triposo.com/api/20181213/local_highlights.json?latitude=${searchCoord.lat}&longitude=${searchCoord.lng}&account=8BQS3LVU&token=5zzqjt9251m8pucznb1yjy3c430qq65y&poi_fields=id,name,snippet`;
		fetch(url)
			.then(response => {
				if (!response.ok) {
					throw new Error(response.statusText);
				}
				return response.json();
			})
			.then(data => {
				console.log(data)
				this.setState({
					tripData: data.results[0].pois
			})
			})
			.catch(err => {
				console.log(err);
			})
	}

	render() {
		return ( 
						
			<main className = 'App' >

				<form onSubmit = {e => this.handleSubmit(e)} >
					<div className = "search-section top" >
						<input required className = "search__input"
						   	placeholder = "Where is your Trip to?"
				           	type = "text"
							onChange = {e => this.searchTermUpdate(e.target.value)}
						/> 
					</div>   
					<div className = "buttons-coll" >
						<button type = "submit"
								className = "custom-btn btn-4" > 
							<span> 
								Search
							</span>
						</button > 
					</div> 
				</form> 
<Results 
itemsDisplay={this.state.tripData}
/>
	
		</main>

		);
	}
}

export default App;