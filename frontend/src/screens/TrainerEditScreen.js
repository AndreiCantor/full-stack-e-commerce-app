import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listTrainerDetails, updateTrainer } from "../actions/trainerActions";
import { TRAINER_UPDATE_RESET } from "../constants/trainerConstants";

const TrainerEditScreen = () => {
  const { id } = useParams();

  const trainerId = id;

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const trainerDetails = useSelector((state) => state.trainerDetails);
  const { loading, error, trainer } = trainerDetails;

  const trainerUpdate = useSelector((state) => state.trainerUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = trainerUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: TRAINER_UPDATE_RESET });
      navigate("/admin/trainerlist");
    } else {
      if (!trainer.name || trainer._id !== trainerId) {
        dispatch(listTrainerDetails(trainerId));
      } else {
        setName(trainer.name);
        setImage(trainer.image);
        setCategory(trainer.category);
        setDescription(trainer.description);
      }
    }
  }, [dispatch, trainerId, trainer, successUpdate, navigate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateTrainer({
        _id: trainerId,
        name,
        image,
        category,
        description,
      })
    );
  };

  return (
    <>
      <Link to="/admin/trainerlist" className="btn btn-light my-3">
        Go back
      </Link>
      <FormContainer>
        <h1>Edit trainer</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Image </Form.Label>
              <Form.Control
                type="text"
                placeholder="insert image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.Control
                type="file"
                //  id="image-file"
                label="Choose File"
                onChange={uploadFileHandler}
              ></Form.Control>
              {uploading && <Loader />}
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

            <Form.Group controlId="description">
              <Form.Label>description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
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

export default TrainerEditScreen;
