import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Trainer from "../components/Trainer"; // Updated import
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listTrainers } from "../actions/trainerActions"; // Updated import

const HomeScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listTrainers()); // Updated action creator
  }, [dispatch]);

  const trainerList = useSelector((state) => state.trainerList); // Updated state selector

  const { loading, error, trainers } = trainerList; // Updated variable names

  return (
    <>
      <h1>Latest Trainers</h1> {/* Updated header */}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {trainers.map(
            (
              trainer // Updated variable name
            ) => (
              <Col key={trainer._id} sm={12} md={6} lg={4}>
                <Trainer trainer={trainer} /> {/* Updated prop */}
              </Col>
            )
          )}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
