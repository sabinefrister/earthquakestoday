import React, { Component }  from 'react';
import { Container, Alert, Carousel } from 'react-bootstrap';
import getEarthquakeData from './getData'

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
		this.state = {
			earthquakeData: {}, 
			loading: true, 
			showAlert: false,
			alertMessage: "", 
		};
		this.getLastEarthquakes = this.getLastEarthquakes.bind(this);
		this.getSpecialEventData = this.getSpecialEventData.bind(this);

	}
	componentDidMount() {
		getEarthquakeData()
    .then(response => this.setState({earthquakeData: response, loading: false})) 
    .catch(error => this.setState({showAlert: true, alertMessage: error}))
	}

	getLastEarthquakes() {
		return this.state.earthquakeData.features.slice(-3);
	}

	getSpecialEventData() {
		// look for mag, felt, special types and save them to a list
		// special - all
		// highest mag and felt only three highest -> save the mag and pop the last ones
		let specialEvents = {};
		this.state.earthquakeData.features.forEach(function(element) {
			const notSpecialEvents = ["quarry", "eq", "earthquake", "other", "other_event", "other event"]
			if (!notSpecialEvents.includes(element.properties.type)) {
				if (!specialEvents[element.properties.type]) {
					specialEvents[element.properties.type] = [element]
				} else {
					specialEvents[element.properties.type].push(element)
				}
			}
		})
		console.log(specialEvents)
	}

	render() {
		if (!this.state.loading) {
			// find a better place to put this
			var earthquakeData = this.state.earthquakeData;
			// get Data for last 3 earthquakes
			var lastEarthquakes = this.getLastEarthquakes()
			// get Data for the highest mag and highest felt
			// var highestMagnitudeEarthquakes, highestFeltEarthquakes
			this.getSpecialEventData()
		}
		console.log(this.state.earthquakeData)
		console.log("this.state.earthquakeData")
  	return (
	    <div className="App">
	    	<Alert variant="danger" show={this.state.showAlert}>
			  	{this.state.alertMessage}
		  	</Alert>
	      <Container>
	      	<h1>Earthquakes Today</h1>
	      	{!this.state.loading &&
	      		<div>
			      	<h2>Total</h2>
			        <p>There have been {earthquakeData.metadata.count} recognized earthquakes 
			        for the last 24 hours.</p>
			      	<h2>Last 3 Earthquakes</h2>
			      	<div>
				      	{lastEarthquakes.map(function(earthquake) {
				      		let date = `${new Date(earthquake.properties.time).toLocaleDateString("en-US")} ${new Date(earthquake.properties.time).toLocaleTimeString("en-US")}`
				      		return (
					      		<div>Magnitude: {earthquake.properties.mag}, Felt: {earthquake.properties.felt ? earthquake.properties.felt : "nothing"},
					      		Where: {earthquake.properties.place}, Time: {date}, 
					      		Type: {earthquake.properties.type}</div>)
			      		})}
		      		</div>
			      	<h2>Heaviest 3 Earthquakes last 24 hours</h2>
			      	<h2>Most felt 3 Earthquakes last 24 hours</h2>
			      	<h2>Something special going on today?</h2>
		      	</div>
        	}
	      </Container>
	    </div>
	  );
	}
}

export default App;
