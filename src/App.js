import React, { Component }  from 'react';
import { Container, Jumbotron, Alert, Carousel } from 'react-bootstrap';
import getEarthquakeData from './getData'
import BarChart from './BarChart';

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
		this.categorizeViaRichterScala = this.categorizeViaRichterScala.bind(this);
		this.checkForUndefinedValues = this.checkForUndefinedValues.bind(this);
		this.compareNumbers = this.compareNumbers.bind(this);

	}
	componentDidMount() {
		getEarthquakeData()
    .then(response => this.setState({earthquakeData: response, loading: false})) 
    .catch(error => this.setState({showAlert: true, alertMessage: error}))
	}

	getLastEarthquakes() {
		return this.state.earthquakeData.features.slice(-3);
	}

	checkForUndefinedValues(value, parameter) {
		if (parameter === "mag" && value <= -1) {
			return 0
		} else if (value) {
			return value
		} else if (parameter === "type") {
			return "earthquake"
		} else {
			return 0
		}
	}

	compareNumbers(a, b) {
	  return a - b;
	}

	filterSpecialEventData() {
		// filters for mag, felt, special types and save them
		let specialEvents = {};
		let magnitudeEvents = {};
		let magnitudeList = [];
		let feltList = [];

		this.state.earthquakeData.features.forEach(function(element) {
			// add special events
			let type = this.checkForUndefinedValues(element.properties.type, "type")
			if (!specialEvents[type]) {
				specialEvents[type] = [element] //TODO [] remove
			} else {
				specialEvents[type].push(element)
			}

			// add magnitude events to a dict for categorizing with richter magnitude scala later on
			let mag = this.checkForUndefinedValues([element.properties.mag], "mag")
			if (!magnitudeEvents[mag]) {
				magnitudeEvents[mag] = [element]
			} else {
				magnitudeEvents[mag].push(element)
			}

			// add magnitude events into a list for sorting by magnitude later on
			magnitudeList.push(element)

			// add felt events into a list for sorting by magnitude later on
			feltList.push(element)

		}.bind(this))

		let highestThreeMagnitudes = magnitudeList.sort(function(a, b) {
			return a.properties.mag - b.properties.mag
		}).slice(-3)

		let highestThreeFelts = feltList.sort(function(a, b) {
			return a.properties.felt - b.properties.felt
		}).slice(-3)

		return {highestThreeMagnitudes, highestThreeFelts, specialEvents, magnitudeEvents}
	}

	categorizeViaRichterScala(magnitudeEvents) {
		var categorizedRichterScala = {
			0: {title: "Micro", count: 0, magnitude: 0},
			1: {title: "Micro", count: 0, magnitude: 1},
			2: {title: "Minor", count: 0, magnitude: 2},
			3: {title: "Minor", count: 0, magnitude: 3},
			4: {title: "Light", count: 0, magnitude: 4},
			5: {title: "Moderate", count: 0, magnitude: 5},
			6: {title: "Strong", count: 0, magnitude: 6},
			7: {title: "Major", count: 0, magnitude: 7},
			8: {title: "Great", count: 0, magnitude: 8},
			9: {title: "Extreme", count: 0, magnitude: 9},
			10: {title: "Global Catastrophe", count: 0, magnitude: 10}
		}
		Object.keys(magnitudeEvents).forEach(function(magnitude) {
			console.log(magnitude, "magnitudeEvents") 
			let mag = this.checkForUndefinedValues(magnitude, "mag")
			console.log(mag, "mag")
			categorizedRichterScala[parseInt(mag)].count++
		}.bind(this))
		return Object.values(categorizedRichterScala)
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
			var categorizedRichterScala = this.categorizeViaRichterScala(specialEventData.magnitudeEvents)
		}
  	return (
	    <div className="App">
	    	<Alert variant="danger" show={this.state.showAlert}>
			  	{this.state.alertMessage}
		  	</Alert>
		  	<div className="main">
		  		<Jumbotron className="title">
		      	<h1>Earthquakes Today</h1>
		      	<p>You will find some exciting data about earthquakes all over the world.</p>
	      	</Jumbotron> 	
		      	{!this.state.loading &&
		      		<div>
			      		<Jumbotron className="total">
					      	<h2>Total</h2>
					        <p>There have been {earthquakeData.metadata.count} recognized earthquakes 
					        for the last 24 hours.</p>
			        	</Jumbotron> 
			        	<Jumbotron className="last-earthquakes">
					      	<h2>Last 3 Earthquakes</h2>
					      	{lastEarthquakes.map(function(earthquake) {
					      		let date = `${new Date(earthquake.properties.time).toLocaleDateString("en-US")} ${new Date(earthquake.properties.time).toLocaleTimeString("en-US")}`
					      		return (
						      		<div>Magnitude: {earthquake.properties.mag.toFixed(2)}, Felt: {earthquake.properties.felt ? earthquake.properties.felt : "Nothing"},
						      		Where: {earthquake.properties.place}, Time: {date}, 
						      		Type: {earthquake.properties.type}</div>)
				      		})}
			      		</Jumbotron> 
			      		<Jumbotron className="heaviest-magnitude">
					      	<h2>Heaviest 3 Earthquakes last 24 hours</h2>
				      		{specialEventData.highestThreeMagnitudes.map(function(magnitude) {
					      		let date = `${new Date(magnitude.properties.time).toLocaleDateString("en-US")} ${new Date(magnitude.properties.time).toLocaleTimeString("en-US")}`
					      		return (
						      		<div>Magnitude: {magnitude.properties.mag.toFixed(2)}, Felt: {magnitude.properties.felt ? magnitude.properties.felt : "Nothing"},
						      		Where: {magnitude.properties.place}, Time: {date}, 
						      		Type: {magnitude.properties.type}</div>)
				      		})}
			      		</Jumbotron>
			      		<Jumbotron className="heaviest-felt">
					      	<h2>Most felt 3 Earthquakes last 24 hours</h2>
				      		{specialEventData.highestThreeFelts.map(function(felt) {
					      		let date = `${new Date(felt.properties.time).toLocaleDateString("en-US")} ${new Date(felt.properties.time).toLocaleTimeString("en-US")}`
					      		return (
						      		<div>Magnitude: {felt.properties.mag.toFixed(2)}, Felt: {felt.properties.felt},
						      		Where: {felt.properties.place}, Time: {date}, 
						      		Type: {felt.properties.type}</div>)
				      		})}
			      		</Jumbotron>
			      		<Jumbotron className="special-events">
					      	<h2>Something special going on today?</h2>
				      		{Object.keys(specialEventData.specialEvents).map(function(specialEvent) {
				      			let specialEvents = specialEventData.specialEvents
				      			let count = specialEvents[specialEvent].length
				      			return (
				      				<div>There have been {count} {specialEvent}s today.</div>
				      			)
				      		})}
			      		</Jumbotron>
			      		<Jumbotron className="bar-chart">
				      		<BarChart
									  data={categorizedRichterScala}
									  title="My amazing data"
									  color="#70CAD1"
									/>
								</Jumbotron>
			      	</div>
	        	}
	      </div>
	    </div>
	  );
	}
}

export default App;
