import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Table, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { deleteUser, listUsers } from "../actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  createTrainer,
  deleteTrainer,
  listTrainers,
} from "../actions/trainerActions";
import { TRAINER_CREATE_RESET } from "../constants/trainerConstants";
import Paginate from "../components/Paginate";

const TrainerListScreen = () => {
  const { pageNumber } = useParams();

  const dispatch = useDispatch();

  const navigation = useNavigate();

  const trainerList = useSelector((state) => state.trainerList);
  const { loading, error, trainers, page, pages } = trainerList;

  const trainerDelete = useSelector((state) => state.trainerDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = trainerDelete;

  const trainerCreate = useSelector((state) => state.trainerCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    trainer: createdTrainer,
  } = trainerCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: TRAINER_CREATE_RESET });

    if (!userInfo.isAdmin) {
      navigation("/login");
    }

    if (successCreate) {
      navigation(`/admin/trainer/${createdTrainer._id}/edit`);
    } else {
      dispatch(listTrainers("", pageNumber));
    }
  }, [
    dispatch,
    navigation,
    successDelete,
    userInfo,
    successCreate,
    createdTrainer,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteTrainer(id));
    }
  };

  const createTrainerHandler = () => {
    dispatch(createTrainer());
  };

  return (
    <>
      <Row>
        <Col>
          <h1>Trainers</h1>
        </Col>
        <Col className="text-end">
          <Button className="my-3" onClick={createTrainerHandler}>
            <i className="fas fa-plus"></i> Add a trainer
          </Button>
        </Col>
      </Row>
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>CATEGORY</th>
                <th>PROGRAMS</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {trainers.map((trainer) => (
                <tr key={trainer._id}>
                  <td>{trainer._id}</td>
                  <td>{trainer.name}</td>
                  <td>{trainer.category}</td>
                  <td>
                    <Link to={`/admin/${trainer._id}/programlist`}>
                      Programs
                    </Link>
                  </td>
                  <td>
                    <LinkContainer to={`/admin/trainer/${trainer._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(trainer._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default TrainerListScreen;
