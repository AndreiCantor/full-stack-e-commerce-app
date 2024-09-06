import express from "express";
const router = express.Router();
import {
  createProgramForTrainer,
  createTrainer,
  createTrainerReview,
  deleteProgramForTrainer,
  deleteTrainer,
  getTopTrainers,
  getTrainerById,
  getTrainerProgramsById,
  getTrainerSingleProgramById,
  getTrainers,
  updateProgramForTrainer,
  updateTrainer,
} from "../controlers/trainerController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

router.route("/").get(getTrainers).post(protect, admin, createTrainer);
router.get("/top", getTopTrainers);
router
  .route("/:id")
  .get(getTrainerById)
  .delete(protect, admin, deleteTrainer)
  .put(protect, admin, updateTrainer);
router
  .route("/:id/programs")
  .get(getTrainerProgramsById)
  .post(protect, admin, createProgramForTrainer);
router
  .route("/:trainerId/programs/:programId")
  .get(getTrainerSingleProgramById)
  .put(protect, admin, updateProgramForTrainer)
  .delete(protect, admin, deleteProgramForTrainer);
router.route("/:id/reviews").post(protect, createTrainerReview);
export default router;
