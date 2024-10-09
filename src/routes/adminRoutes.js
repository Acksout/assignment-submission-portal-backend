import express from "express";
import { userController } from "../controllers/userController.js";
import { validateUser } from "../middleware/validation.js";

const router = express.Router();

router.post("/register", validateUser, async (req, res, next) => {
  req.body.isAdmin = true;
  await userController.register(req, res, next);
});

router.post("/login", validateUser, userController.login);

export default router;
