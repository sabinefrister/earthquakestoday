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
		this.filterSpecialEventData = this.filterSpecialEventData.bind(this);

	}
	componentDidMount() {
		getEarthquakeData()
    .then(response => this.setState({earthquakeData: response, loading: false})) 
    .catch(error => this.setState({showAlert: true, alertMessage: error}))
	}

	getLastEarthquakes() {
		return this.state.earthquakeData.features.slice(-3);
	}

	filterSpecialEventData() {
		// look for mag, felt, special types and save them to a list
		// special - all
		// highest mag and felt only three highest -> save the mag and pop the last ones
		let specialEvents = {};
		let magnitudeEvents = {};
		let feltEvents = {};
		this.state.earthquakeData.features.forEach(function(element) {
			// add special events
			if (!specialEvents[element.properties.type]) {
				specialEvents[element.properties.type] = [element]
			} else {
				specialEvents[element.properties.type].push(element)
			}

			// add magnitude events
			if (!magnitudeEvents[element.properties.mag]) {
				magnitudeEvents[element.properties.mag] = [element]
			} else {
				magnitudeEvents[element.properties.mag].push(element)
			}

			// add felt events
			if (!feltEvents[element.properties.felt]) {
				feltEvents[element.properties.felt] = [element]
			} else {
				feltEvents[element.properties.felt].push(element)
			}
		})
		function compareNumbers(a, b) {
		  return a - b;
		}
		let highestThreeMagnitudes = Object.keys(magnitudeEvents).sort(compareNumbers).slice(-3);
		let highestThreeFelts = Object.keys(feltEvents).sort(compareNumbers).slice(-3);
		return {highestThreeMagnitudes, highestThreeFelts, specialEvents, magnitudeEvents, feltEvents}
	}

	render() {
		if (!this.state.loading) {
			// find a better place to put this
			var earthquakeData = this.state.earthquakeData;
			// get Data for last 3 earthquakes
			var lastEarthquakes = this.getLastEarthquakes()
			// get Data for the highest mag and highest felt
			// var highestMagnitudeEarthquakes, highestFeltEarthquakes
			var specialEventData = this.filterSpecialEventData()
		}
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
			      		{specialEventData.highestThreeMagnitudes.map(function(magnitude) {
				      		let date = `${new Date(specialEventData.magnitudeEvents[magnitude][0].properties.time).toLocaleDateString("en-US")} ${new Date(specialEventData.magnitudeEvents[magnitude][0].properties.time).toLocaleTimeString("en-US")}`
				      		return (
					      		<div>Magnitude: {specialEventData.magnitudeEvents[magnitude][0].properties.mag}, Felt: {specialEventData.magnitudeEvents[magnitude][0].properties.felt ? specialEventData.magnitudeEvents[magnitude][0].properties.felt : "nothing"},
					      		Where: {specialEventData.magnitudeEvents[magnitude][0].properties.place}, Time: {date}, 
					      		Type: {specialEventData.magnitudeEvents[magnitude][0].properties.type}</div>)
			      		})}
			      	<h2>Most felt 3 Earthquakes last 24 hours</h2>
			      		{specialEventData.highestThreeFelts.map(function(felt) {
				      		let date = `${new Date(specialEventData.feltEvents[felt][0].properties.time).toLocaleDateString("en-US")} ${new Date(specialEventData.feltEvents[felt][0].properties.time).toLocaleTimeString("en-US")}`
				      		return (
					      		<div>Magnitude: {specialEventData.feltEvents[felt][0].properties.mag}, Felt: {specialEventData.feltEvents[felt][0].properties.felt},
					      		Where: {specialEventData.feltEvents[felt][0].properties.place}, Time: {date}, 
					      		Type: {specialEventData.feltEvents[felt][0].properties.type}</div>)
			      		})}
			      	<h2>Something special going on today?</h2>
			      		{Object.keys(specialEventData.specialEvents).map(function(specialEvent) {
			      			console.log(specialEvent)
			      			console.log(specialEventData.specialEvents[specialEvent], specialEventData.specialEvents)
			      			let count = specialEventData.specialEvents[specialEvent].length
			      			return (
			      				<div>There have been {count} {specialEvent}s today.</div>
			      			)
			      		})}
		      	</div>
        	}
	      </Container>
	    </div>
	  );
	}
}

export default App;
