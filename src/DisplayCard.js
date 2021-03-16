import React from 'react';
import PropTypes from 'prop-types';
import { Col, Card } from 'react-bootstrap';



const DisplayCard = (props) => (
  <Col lg={4}>
    <Card>
      <Card.Body>
        <Card.Text>
          <p>Magnitude: {props.mag}</p>
          <p>Felt: {props.felt}</p>
          <p>Place: {props.place}</p>
          <p>Date: {props.date}</p>
          <p>Type: {props.type}</p>
        </Card.Text>
      </Card.Body>
    </Card>
  </Col>
);

export default DisplayCard;

DisplayCard.propTypes = {
  mag: PropTypes.string.isRequired,
  felt: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};
