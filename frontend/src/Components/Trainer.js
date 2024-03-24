import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import PropTypes from "prop-types";

const Trainer = ({ trainer }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/trainers/${trainer._id}`}>
        <Card.Img src={trainer.image} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/trainers/${trainer._id}`}>
          <Card.Title as="div">
            <strong>{trainer.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating
            value={trainer.rating}
            text={`${trainer.numReviews} reviews`}
          />
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

Trainer.propTypes = {
  trainer: PropTypes.object.isRequired,
};

export default Trainer;
