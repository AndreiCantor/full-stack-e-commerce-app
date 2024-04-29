import asyncHandler from "express-async-handler";
import Trainer from "../models/trainerModel.js";

//@desc Fetch all trainers
//@route GET /api/trainers
//@access public

const getTrainers = asyncHandler(async (req, res) => {
  const pageSize = 6; // paginare
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  console.log(req.query.pageNumber);
  const count = await Trainer.countDocuments({ ...keyword });
  const trainers = await Trainer.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  const pages = Math.ceil(count / pageSize);
  res.json({ trainers, page, pages });
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

//@desc Delete a Trainer
//@route DELETE /api/trainers/:id/
//@access private/Admin

const deleteTrainer = asyncHandler(async (req, res) => {
  const trainer = await Trainer.findById(req.params.id);

  if (trainer) {
    await Trainer.deleteOne(trainer);
    res.json({ message: "Trainer deleted" });
  } else {
    res.status(404);
    throw new Error("Trainer not found");
  }
});

//@desc Create a trainer
//@route POST /api/trainers
//@access private/Admin

const createTrainer = asyncHandler(async (req, res) => {
  const trainer = new Trainer({
    name: "Sample name",
    user: req.user._id,
    image: "/images/sample.png",
    category: "Sample category",
    numReviews: 0,
    description: "sample desc",
  });

  const createdTrainer = await trainer.save();
  res.status(201).json(createdTrainer);
});

//@desc update a trainer
//@route PUT /api/trainers/:id
//@access private/Admin

const updateTrainer = asyncHandler(async (req, res) => {
  const { name, description, image, category } = req.body;

  const trainer = await Trainer.findById(req.params.id);

  if (trainer) {
    trainer.name = name;
    trainer.description = description;
    trainer.image = image;
    trainer.category = category;

    const updatedTrainer = await trainer.save();
    res.json(updatedTrainer);
  } else {
    res.status(404);
    throw new Error("Trainer not found");
  }
});

//@desc Create new review
//@route POST /api/trainers/:id/reviews
//@access private

const createTrainerReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const trainer = await Trainer.findById(req.params.id);

  if (trainer) {
    const alreadyReviewed = trainer.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Trainer already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    trainer.reviews.push(review);

    trainer.numReviews = trainer.reviews.length;

    trainer.rating =
      trainer.reviews.reduce((acc, item) => item.rating + acc, 0) /
      trainer.reviews.length;

    await trainer.save();
    res.status(201).json({ message: "Review added" });
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
  deleteTrainer,
  updateTrainer,
  createTrainer,
  createTrainerReview,
};
