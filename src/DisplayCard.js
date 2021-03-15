import React from 'react';
import { Col, Card } from 'react-bootstrap';



class BarChart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Col lg={4}>
        <Card>
          <Card.Body>
            <Card.Text>
              <p>Magnitude: {this.props.mag}</p>
              <p>Felt: {this.props.felt}</p>
              <p>Place: {this.props.place}</p>
              <p>Date: {this.props.date}</p>
              <p>Type: {this.props.type}</p>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    );
  }
}

export default BarChart;