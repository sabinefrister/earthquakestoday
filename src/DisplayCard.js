import React from 'react';
import PropTypes from 'prop-types';
import {Col, Card } from 'react-bootstrap';


const DisplayCard = (props) => (
  <Col lg={4}>
    <Card key={`card_${props.description}_${props.id}`}>
      <Card.Body key={`card_body_${props.description}_${props.id}`}>
        <Card.Text key={`card_text_1_${props.description}_${props.id}`}>Magnitude: {props.mag}</Card.Text>
        <Card.Text key={`card_text_2_${props.description}_${props.id}`}>Felt: {props.felt}</Card.Text>
        <Card.Text key={`card_text_3_${props.description}_${props.id}`}>Place: {props.place}</Card.Text>
        <Card.Text key={`card_text_4_${props.description}_${props.id}`}>Date: {props.date}</Card.Text>
        <Card.Text key={`card_text_5_${props.description}_${props.id}`}>Type: {props.type}</Card.Text>
      </Card.Body>
    </Card>
  </Col>
);

export default DisplayCard;

DisplayCard.propTypes = {
  mag: PropTypes.string.isRequired,
  felt: PropTypes.node.isRequired,
  place: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
};
