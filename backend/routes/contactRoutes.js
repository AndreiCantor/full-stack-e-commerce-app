import express from "express";
import { sendEmail } from "../controlers/contactController.js";

const router = express.Router();

router.route("/send").post(sendEmail);

export default router;
