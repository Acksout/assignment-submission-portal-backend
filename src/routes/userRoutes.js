import express from "express";
import { userController } from "../controllers/userController.js";
import { auth } from "../middleware/auth.js";
import { validateUser } from "../middleware/validation.js";

const router = express.Router();

router.post("/register", validateUser, userController.register);
router.post("/login", validateUser, userController.login);
router.get("/admins", auth, userController.getAdmins);

export default router;
