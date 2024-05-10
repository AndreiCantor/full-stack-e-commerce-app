import express from "express";
const router = express.Router();
import {
  createTrainer,
  createTrainerReview,
  deleteTrainer,
  getTopTrainers,
  getTrainerById,
  getTrainerProgramsById,
  getTrainerSingleProgramById,
  getTrainers,
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
router.route("/:id/programs").get(getTrainerProgramsById);
router
  .route("/:trainerId/programs/:programId")
  .get(getTrainerSingleProgramById);
router.route("/:id/reviews").post(protect, createTrainerReview);
export default router;
