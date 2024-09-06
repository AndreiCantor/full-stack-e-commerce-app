import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { sendContactEmail } from "../actions/contactActions";

const ContactScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [validated, setValidated] = useState(false);

  const dispatch = useDispatch();

  const contactEmail = useSelector((state) => state.contactEmail);
  const { loading, error, success } = contactEmail;

  useEffect(() => {
    if (success) {
      setName("");
      setEmail("");
      setMessage("");
      setValidated(false);
    }
  }, [success]);

  const submitHandler = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (!form.checkValidity()) {
      event.stopPropagation();
    } else {
      dispatch(sendContactEmail(name, email, message));
    }

    setValidated(true);
  };

  return (
    <FormContainer>
      <h1>Contact Us</h1>
      <p className="text-muted">
        If you are interested in becoming a trainer or if you have any issues,
        please feel free to contact us. We will get back to you as soon as
        possible.
      </p>
      {error && <Message variant="danger">{error}</Message>}
      {success && <Message variant="success">Email sent successfully</Message>}
      {loading && <Loader />}
      <Form noValidate validated={validated} onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            isInvalid={validated && !name}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            Please enter your name.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            isInvalid={validated && !/^\S+@\S+\.\S+$/.test(email)}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            Please enter a valid email address.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="message">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter your message"
            value={message}
            required
            onChange={(e) => setMessage(e.target.value)}
            isInvalid={validated && !message}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            Please enter a message.
          </Form.Control.Feedback>
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-3">
          Send Message
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ContactScreen;
