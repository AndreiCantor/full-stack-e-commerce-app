import React, { useState, useEffect } from "react";
import {
  Link,
  redirect,
  useLocation,
  useNavigate,
  useNavigation,
  useParams,
} from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { editUser, getUserDetails, register } from "../actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { USER_EDIT_RESET } from "../constants/userConstants";

const UserEditScreen = () => {
  const { id } = useParams();

  const userId = id;

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userEdit = useSelector((state) => state.userEdit);
  const {
    loading: loadingEdit,
    error: errorEdit,
    success: successEdit,
  } = userEdit;

  useEffect(() => {
    if (successEdit) {
      dispatch({ type: USER_EDIT_RESET });
      navigate("/admin/userlist");
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, userId, user, successEdit]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (userId) {
      // Check if userId is defined
      dispatch(
        editUser({
          _id: userId, // Pass userId as _id
          name,
          email,
          isAdmin,
        })
      );
    } else {
      console.error("userId is undefined"); // Log an error if userId is undefined
    }
  };

  return (
    <>
      <Link to="/admin/userList" className="btn btn-light my-3">
        Go back
      </Link>
      <FormContainer>
        <h1>Edit user</h1>
        {loadingEdit && <Loader />}
        {errorEdit && <Message variant="danger">{errorEdit}</Message>}
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

            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="isAdmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                value={isAdmin}
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
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

export default UserEditScreen;
