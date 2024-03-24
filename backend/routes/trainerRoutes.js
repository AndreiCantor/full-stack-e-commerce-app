import express from "express";
const router = express.Router();
import {
  getTrainerById,
  getTrainerProgramsById,
  getTrainerSingleProgramById,
  getTrainers,
} from "../controlers/trainerController.js";

router.route("/").get(getTrainers);
router.route("/:id").get(getTrainerById);
router.route("/:id/programs").get(getTrainerProgramsById);
router
  .route("/:trainerId/programs/:programId")
  .get(getTrainerSingleProgramById);

export default router;
