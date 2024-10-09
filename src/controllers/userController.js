import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

export const userController = {
  register: async (req, res, next) => {
    try {
      const user = new User(req.body);
      await user.save();
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      res.status(201).json({ user, token });
    } catch (error) {
      next(error);
    }
  },

  login: async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });

      if (!user || !(await user.comparePassword(password))) {
        throw new Error("Invalid login credentials");
      } else {
        console.log("User logged in successfully");
      }

      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      res.json({ user, token });
    } catch (error) {
      next({
        status: 400,
        message: "Login failed",
        error: error.message,
      });
    }
  },

  getAdmins: async (req, res, next) => {
    try {
      const admins = await User.find({ isAdmin: true }).select("username");
      res.json(admins);
    } catch (error) {
      next(error);
    }
  },
};
