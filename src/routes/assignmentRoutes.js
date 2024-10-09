import express from "express";
import { assignmentController } from "../controllers/assignmentController.js";
import { auth, adminAuth } from "../middleware/auth.js";
import {
  validateAssignment,
  validateSubmission,
} from "../middleware/validation.js";

const router = express.Router();

router.post("/", [auth, validateAssignment], assignmentController.create);
router.get("/", adminAuth, assignmentController.getAll);
router.post("/:id/accept", adminAuth, assignmentController.updateStatus);
router.post("/:id/reject", adminAuth, assignmentController.updateStatus);
router.post(
  "/:id/upload",
  [auth, validateSubmission],
  assignmentController.submitWork
);

export default router;
