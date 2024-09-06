import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  listProgramDetails,
  listTrainerPrograms,
  updateTrainerProgram,
} from "../actions/trainerActions";
import { TRAINER_PROGRAM_UPDATE_RESET } from "../constants/trainerConstants";

const ProgramEditScreen = () => {
  const { trainerId, programId } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const programDetails = useSelector((state) => state.programDetails);
  const { loading, error, program } = programDetails;

  const trainerProgramUpdate = useSelector(
    (state) => state.trainerProgramUpdate
  );
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = trainerProgramUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: TRAINER_PROGRAM_UPDATE_RESET });
      navigate(`/admin/${trainerId}/programlist`);
    } else {
      if (!program || program._id !== programId) {
        dispatch(listProgramDetails(trainerId, programId));
      } else {
        setTitle(program.title);
        setDescription(program.description);
        setCategory(program.category);
        setPrice(program.price);
        setType(program.type);
      }
    }
  }, [dispatch, programId, program, successUpdate, navigate, trainerId]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateTrainerProgram(trainerId, programId, {
        title,
        description,
        category,
        price,
        type,
      })
    );
  };

  return (
    <>
      <Link
        to={`/admin/trainer/${trainerId}/programs`}
        className="btn btn-light my-3"
      >
        Go back
      </Link>
      <FormContainer>
        <h1>Edit Program</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="type">
              <Form.Label>Type</Form.Label>
              <Form.Select
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="workout">Workout</option>
                <option value="diet">Diet</option>
              </Form.Select>
            </Form.Group>

            <Button type="submit" variant="primary" className="mt-3">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProgramEditScreen;
