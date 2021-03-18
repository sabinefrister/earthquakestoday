import React from 'react';
import PropTypes from 'prop-types';
import {Col, Card } from 'react-bootstrap';


const DisplayCard = (props) => (
  <Col lg={4}>
    <Card key={`card_${props.description}_${props.id}`}>
      <Card.Body key={`card_body_${props.description}_${props.id}`}>
        <Card.Text key={`card_text_1_${props.description}_${props.id}`}>How hard? {props.mag}</Card.Text>
        <Card.Text key={`card_text_2_${props.description}_${props.id}`}>What people felt? {props.felt}</Card.Text>
        <Card.Text key={`card_text_3_${props.description}_${props.id}`}>Where? {props.place}</Card.Text>
        <Card.Text key={`card_text_4_${props.description}_${props.id}`}>When? {props.date}</Card.Text>
        <Card.Text key={`card_text_5_${props.description}_${props.id}`}>What kind of? {props.type}</Card.Text>
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
  id: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired
};
