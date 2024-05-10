import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Trainer from "../components/Trainer"; // Updated import
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listTrainers } from "../actions/trainerActions"; // Updated import
import { Link, useParams } from "react-router-dom";
import Paginate from "../components/Paginate";
import TrainerCarousel from "../components/TrainerCarousel";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const { keyword } = useParams();
  const { pageNumber } = useParams();

  useEffect(() => {
    dispatch(listTrainers(keyword, pageNumber)); // Updated action creator
  }, [dispatch, keyword, pageNumber]);

  const trainerList = useSelector((state) => state.trainerList); // Updated state selector

  const { loading, error, trainers, page, pages } = trainerList; // Updated variable names

  return (
    <>
      <h2 id="home_screen_title">Empowering Personal Trainers Online!</h2>
      {!keyword ? (
        <TrainerCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          Go back!
        </Link>
      )}
      <h1>Latest Trainers</h1> {/* Updated header */}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
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
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
