import React, { Component }  from 'react';
import { Col, Row, Container, Card, Jumbotron, Alert } from 'react-bootstrap';
import getEarthquakeData from './getData'
import BarChart from './BarChart';
import DisplayCard from './DisplayCard';

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

	filterSpecialEventData() {
		// filters for mag, felt, special types for displaying them later on
		let specialTypes = {};
		let magnitudeEvents = {};
		let magnitudeList = [];
		let feltList = [];

		this.state.earthquakeData.features.forEach(function(element) {
			// add special events
			let type = this.checkForUndefinedValues(element.properties.type, "type")
			if (!specialTypes[type]) {
				specialTypes[type] = [element] //TODO [] remove
			} else {
				specialTypes[type].push(element)
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

		return {highestThreeMagnitudes, highestThreeFelts, specialTypes, magnitudeEvents}
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
			10: {title: "Catastrophe", count: 0, magnitude: 10}
		}

		Object.keys(magnitudeEvents).forEach(function(magnitude) {
			let mag = this.checkForUndefinedValues(magnitude, "mag")
			categorizedRichterScala[parseInt(mag)].count++
		}.bind(this))
		return Object.values(categorizedRichterScala)
	}

	render() {
		if (!this.state.loading) {
			// find a better place to put this
			var earthquakeData = this.state.earthquakeData;
			// get data for last 3 earthquakes
			var lastEarthquakes = this.getLastEarthquakes()
			// get data for the highest mag and highest felt
			var specialEventData = this.filterSpecialEventData()
			// get magnitude data categorized by richter scala
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
					        <p>There have been <b>{earthquakeData.metadata.count}</b> recognized earthquakes 
					        for the last 24 hours. Data is provided by <a 
					       	href="https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php">www.usgs.gov</a>.</p>
			        	</Jumbotron> 
			        	<Jumbotron className="last-earthquakes">
					      	<h2>Last 3 Earthquakes</h2>
					      	<Container>
			        			<Row>
							      	{lastEarthquakes.map(function(earthquakeElement) {
							      		let earthquake = earthquakeElement.properties
							      		let date = `${new Date(earthquake.time).toLocaleDateString("en-US")} ${new Date(earthquake.time).toLocaleTimeString("en-US")}`
							      		return (
							      			<DisplayCard 
							      				mag={earthquake.mag.toFixed(2)}
							      				felt={earthquake.felt ? earthquake.felt : "Nothing"}
							      				place={earthquake.place}
							      				date={date}
							      				type={earthquake.type}
							      			/>
						      			)
						      		})}
					      		</Row>
				        	</Container>
			      		</Jumbotron> 
			      		<Jumbotron className="bar-chart">
					      	<h2>All Magnitudes last 24 hours</h2>
				      		<BarChart
									  data={categorizedRichterScala}
									  title="Magnitudes categorized by Richter Magnitude Scala"
									  color="#70CAD1"
									  maxTicks={earthquakeData.metadata.count/3}
									/>
								</Jumbotron>
			      		<Jumbotron className="heaviest-magnitude">
					      	<h2>Heaviest 3 Earthquakes last 24 hours</h2>
					      	<Container>
			        			<Row>
							      	{specialEventData.highestThreeMagnitudes.map(function(magnitudeElement) {
							      		let magnitude = magnitudeElement.properties
							      		let date = `${new Date(magnitude.time).toLocaleDateString("en-US")} ${new Date(magnitude.time).toLocaleTimeString("en-US")}`
							      		return (
							      			<DisplayCard 
							      				mag={magnitude.mag.toFixed(2)}
							      				felt={magnitude.felt ? magnitude.felt : "Nothing"}
							      				place={magnitude.place}
							      				date={date}
							      				type={magnitude.type}
							      			/>
						      			)
						      		})}
					      		</Row>
				        	</Container>
			      		</Jumbotron>
			      		<Jumbotron className="heaviest-felt">
					      	<h2>Most felt 3 Earthquakes last 24 hours</h2>
					      	<Container>
			        			<Row>
							      	{specialEventData.highestThreeFelts.map(function(feltElement) {
						      			let felt = feltElement.properties
							      		let date = `${new Date(felt.time).toLocaleDateString("en-US")} ${new Date(felt.time).toLocaleTimeString("en-US")}`
							      		return (
							      			<DisplayCard 
							      				mag={felt.mag.toFixed(2)}
							      				felt={felt.felt}
							      				place={felt.place}
							      				date={date}
							      				type={felt.type}
							      			/>
						      			)
						      		})}
					      		</Row>
				        	</Container>
			      		</Jumbotron>
			      		<Jumbotron className="special-events">
					      	<h2>Something special going on today?</h2>
				      		{Object.keys(specialEventData.specialTypes).map(function(specialEvent) {
				      			let specialTypes = specialEventData.specialTypes
				      			let count = specialTypes[specialEvent].length
				      			return (
				      				<div>There have been <b>{count}</b> {specialEvent}s today.</div>
				      			)
				      		})}
			      		</Jumbotron>
			      	</div>
	        	}
	      </div>
	    </div>
	  );
	}
}

export default App;
