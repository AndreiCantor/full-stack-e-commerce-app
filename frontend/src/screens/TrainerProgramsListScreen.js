import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Table, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import {
  createTrainerProgram,
  deleteTrainerProgram,
  listTrainerDetails,
  listTrainerPrograms,
} from "../actions/trainerActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { TRAINER_PROGRAM_CREATE_RESET } from "../constants/trainerConstants";

const TrainerProgramsListScreen = () => {
  const { id: trainerId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const trainerPrograms = useSelector((state) => state.trainerPrograms);
  const { loading, error, programs } = trainerPrograms;

  const trainerDetails = useSelector((state) => state.trainerDetails);
  const { trainer } = trainerDetails;

  const trainerProgramCreate = useSelector(
    (state) => state.trainerProgramCreate
  );
  const { success: successCreate, program: createdProgram } =
    trainerProgramCreate;

  const trainerProgramDelete = useSelector(
    (state) => state.trainerProgramDelete
  );
  const { success: successDelete, loading: loadingDelete } =
    trainerProgramDelete;

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  useEffect(() => {
    if (successCreate && createdProgram) {
      navigate(`/admin/${trainerId}/program/${createdProgram._id}/edit`);
      dispatch({ type: TRAINER_PROGRAM_CREATE_RESET });
    }
  }, [dispatch, navigate, successCreate, createdProgram, trainerId]);

  useEffect(() => {
    if (!userInfo.isAdmin) {
      navigate("/login");
    }

    dispatch(listTrainerDetails(trainerId));
    dispatch(listTrainerPrograms(trainerId));
  }, [dispatch, trainerId, userInfo, successDelete]);

  const createProgramHandler = () => {
    const newProgram = {
      title: "New Program",
      description: "Description of the new program",
      category: "Category Name",
      price: 0,
      type: "workout",
    };

    dispatch(createTrainerProgram(trainerId, newProgram));
  };

  const deleteHandler = (programId) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteTrainerProgram(trainerId, programId));
    }
  };

  return (
    <>
      <Row>
        <Col>
          <h1>{trainer.name}'s programs</h1>
        </Col>
        <Col className="text-end">
          <Button className="my-3" onClick={createProgramHandler}>
            <i className="fas fa-plus"></i> Add a program
          </Button>
        </Col>
      </Row>
      {loading || loadingDelete ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Category</th>
                <th>Price</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {programs.map((program) => (
                <tr key={program._id}>
                  <td>{program._id}</td>
                  <td>{program.title}</td>
                  <td>{program.description}</td>
                  <td>{program.category}</td>
                  <td>{program.price}</td>
                  <td>{program.type}</td>
                  <td>
                    <LinkContainer
                      to={`/admin/${trainerId}/program/${program._id}/edit`}
                    >
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(program._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default TrainerProgramsListScreen;
