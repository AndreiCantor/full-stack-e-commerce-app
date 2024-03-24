import asyncHandler from "express-async-handler";
import Trainer from "../models/trainerModel.js";

//@desc Fetch all trainers
//@route GET /api/trainers
//@access public

const getTrainers = asyncHandler(async (req, res) => {
  const trainers = await Trainer.find({});

  res.json(trainers);
});

//@desc Fetch single trainer
//@route GET /api/trainers/:id
//@access public

const getTrainerById = asyncHandler(async (req, res) => {
  const trainer = await Trainer.findById(req.params.id);

  if (trainer) {
    res.json(trainer);
  } else {
    res.status(404);
    throw new Error("Trainer not found");
  }
});

//@desc Fetch single trainer programs
//@route GET /api/trainers/:id/programs
//@access public

const getTrainerProgramsById = asyncHandler(async (req, res) => {
  const trainer = await Trainer.findById(req.params.id);

  if (trainer) {
    res.json(trainer.programs);
  } else {
    res.status(404);
    throw new Error("Trainer not found");
  }
});

//@desc Fetch single program from a trainer
//@route GET /api/trainers/:id/programs/:id
//@access public

const getTrainerSingleProgramById = asyncHandler(async (req, res) => {
  const { trainerId, programId } = req.params;

  const trainer = await Trainer.findById(trainerId);

  if (trainer) {
    const program = trainer.programs.find(
      (p) => p._id.toString() === programId
    );
    if (program) {
      res.json(program);
    } else {
      res.status(404);
      throw new Error("Program not found for this trainer");
    }
  } else {
    res.status(404);
    throw new Error("Trainer not found");
  }
});

export {
  getTrainerById,
  getTrainers,
  getTrainerProgramsById,
  getTrainerSingleProgramById,
};
