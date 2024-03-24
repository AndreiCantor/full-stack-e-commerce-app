import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Image, Card, ListGroup, Button } from "react-bootstrap";
import { listTrainerDetails } from "../actions/trainerActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Rating from "../components/Rating";
import { addToCart } from "../actions/cartActions";

const TrainerScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const trainerDetails = useSelector((state) => state.trainerDetails);
  const { loading, error, trainer } = trainerDetails;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listTrainerDetails(id));
  }, [dispatch, id]);

  const addToCartHandler = (program) => {
    // console.log(program._id);
    navigate(`/cart/${id}/${program._id}`);
    //  dispatch(addToCart(program, id));
  };

  return (
    <>
      <Link className="btn btn-dark my-3" to="/">
        Go back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={trainer.image} alt={trainer.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{trainer.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={trainer.rating}
                  text={`${trainer.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Category: {trainer.category}</ListGroup.Item>
              <ListGroup.Item>
                Description: {trainer.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          {trainer && trainer.programs && (
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>Programs</h3>
                </ListGroup.Item>
                {trainer.programs.map((program, index) => (
                  <ListGroup.Item>
                    <Card
                      key={index}
                      className="my-2"
                      variant="Dark"
                      // style={{ width: "20rem" }}
                    >
                      <Card.Body>
                        <ListGroup.Item>
                          <Row>
                            <Col>
                              <Link to={`/program/${program._id}`}>
                                <Card.Title>{program.title}</Card.Title>
                              </Link>
                            </Col>
                            <Col className="text-end">
                              <Card.Text style={{ fontWeight: "bold" }}>
                                ${program.price}
                              </Card.Text>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                        <Card.Text as="div">
                          <div className="my-2">{program.description}</div>
                        </Card.Text>
                        <Button
                          className="btn-block"
                          type="button"
                          onClick={() => addToCartHandler(program)}
                        >
                          Add to Cart
                        </Button>
                      </Card.Body>
                    </Card>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          )}
        </Row>
      )}
    </>
  );
};

export default TrainerScreen;
