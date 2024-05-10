import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import { listTopTrainers } from "../actions/trainerActions";
import { useDispatch, useSelector } from "react-redux";
import Message from "./Message";
import Loader from "./Loader";

const TrainerCarousel = () => {
  const dispatch = useDispatch();

  const trainerTopRated = useSelector((state) => state.trainerTopRated);
  const { loading, error, trainers } = trainerTopRated;

  useEffect(() => {
    dispatch(listTopTrainers());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-dark">
      {trainers.map((trainer) => (
        <Carousel.Item key={trainer._id}>
          <Link to={`/trainers/${trainer._id}`}>
            <Image src={trainer.image} alt={trainer.name} fluid />
            <Carousel.Caption className="carousel-caption">
              <h2>{trainer.name}</h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default TrainerCarousel;
