import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  Card,
  ListGroup,
  Button,
  Form,
} from "react-bootstrap";
import {
  createTrainerReview,
  listTrainerDetails,
} from "../actions/trainerActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Rating from "../components/Rating";
import { TRAINER_CREATE_REVIEW_RESET } from "../constants/trainerConstants";

const TrainerScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const trainerDetails = useSelector((state) => state.trainerDetails);
  const { loading, error, trainer } = trainerDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const trainerReviewCreate = useSelector((state) => state.trainerReviewCreate);
  const { success: successTrainerReview, error: errorTrainerReview } =
    trainerReviewCreate;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successTrainerReview) {
      alert("Review Submitted!");
      setRating(0);
      setComment("");
      dispatch({ type: TRAINER_CREATE_REVIEW_RESET });
    }
    dispatch(listTrainerDetails(id));
  }, [dispatch, id, successTrainerReview]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createTrainerReview(id, {
        rating,
        comment,
      })
    );
  };

  const addToCartHandler = (program) => {
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
        <>
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
                    <ListGroup.Item key={program._id}>
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
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {trainer.reviews.length === 0 && <Message>No reviews</Message>}
              <ListGroup variant="flush">
                {trainer.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a review!</h2>
                  {errorTrainerReview && (
                    <Message variant="danger">{errorTrainerReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => {
                            setRating(e.target.value);
                            console.log(rating);
                          }}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type="submit" variant="primary" className="my-3">
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to="/login">sign in</Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default TrainerScreen;
