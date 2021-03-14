import React, { Component }  from 'react';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import getEarthquakeData from './getData'

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
		this.state = {
			earthquakeData: {}
		};
	}
	componentDidMount() {
		getEarthquakeData()
    .then(response => this.setState({earthquakeData: response})) 
    .catch(error => console.log(error))
	}
	render() {
		console.log(this.state.earthquakeData)
		console.log("this.state.earthquakeData")
  	return (
	    <div className="App">
	      <Container>
	      	<Button>Test</Button>
	        <h1>Hello World</h1>
	      </Container>
	    </div>
	  );
	}
}

export default App;
