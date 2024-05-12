import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  Row,
  Col,
  Image,
  Card,
  ListGroup,
  Button,
  Breadcrumb,
} from "react-bootstrap";
import {
  listProgramDetails,
  listTrainerDetails,
} from "../actions/trainerActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProgramScreen = () => {
  const { trainerId, programId } = useParams();
  const dispatch = useDispatch();

  const trainerDetails = useSelector((state) => state.trainerDetails);
  const { loading: loadingTrainer, trainer } = trainerDetails;

  const programDetails = useSelector((state) => state.programDetails);
  const { loading, error, program } = programDetails;

  const navigate = useNavigate();
  useEffect(() => {
    dispatch(listProgramDetails(trainerId, programId));
    dispatch(listTrainerDetails(trainerId));
  }, [dispatch, trainerId, programId]);

  const addToCartHandler = (program) => {
    navigate(`/cart/${trainerId}/${program._id}`);
  };

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item
          linkAs={Link}
          linkProps={{ to: "/trainers/" + trainerId }}
        >
          Trainer
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{program.title}</Breadcrumb.Item>
      </Breadcrumb>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={8}>
            <Card>
              {/* Optionally display an image */}
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Card.Title>{program.title}</Card.Title>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Card.Text>{program.description}</Card.Text>
                  </ListGroup.Item>
                  <ListGroup.Item>Category: {program.category}</ListGroup.Item>
                  <ListGroup.Item>
                    {program.type === "workout" ? (
                      <p>
                        This program is suitable for people who are looking for
                        <b> a training routine </b>
                      </p>
                    ) : (
                      <p>
                        This program is suitable for people who are looking for
                        <b> a nutrional plan</b>
                      </p>
                    )}
                  </ListGroup.Item>
                  <ListGroup.Item>Price: ${program.price}</ListGroup.Item>
                </ListGroup>
                <Button
                  variant="primary"
                  onClick={() => addToCartHandler(program)}
                >
                  Add to cart
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <ListGroup>
              <ListGroup.Item>
                <h4>Program Details</h4>
                Created on: {new Date(program.createdAt).toLocaleDateString()}
              </ListGroup.Item>
              <ListGroup.Item>
                <h4>Trainer</h4>
                {trainer.name}
              </ListGroup.Item>
              <ListGroup.Item>
                <Image src={trainer.image} alt={trainer.name} fluid />
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProgramScreen;
