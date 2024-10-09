import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

export const userController = {
  // Register a new user
  register: async (req, res, next) => {
    try {
      // Create a new user from request body
      const user = new User(req.body);
      // Save the user to the database
      await user.save();
      // Generate a JWT token for the new user
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      // Respond with the user and token
      res.status(201).json({ user, token });
    } catch (error) {
      next(error);
    }
  },

  // Login an existing user
  login: async (req, res, next) => {
    try {
      const { username, password } = req.body;
      // Find the user by username
      const user = await User.findOne({ username });

      // Check if user exists and password is correct
      if (!user || !(await user.comparePassword(password))) {
        throw new Error("Invalid login credentials");
      } else {
        console.log("User logged in successfully");
      }

      // Generate a JWT token for the authenticated user
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      // Respond with the user and token
      res.json({ user, token });
    } catch (error) {
      // Handle login errors
      next({
        status: 400,
        message: "Login failed",
        error: error.message,
      });
    }
  },

  // Get all admin users
  getAdmins: async (req, res, next) => {
    try {
      // Find all users with isAdmin set to true, selecting only the username field
      const admins = await User.find({ isAdmin: true }).select("username");
      // Respond with the list of admins
      res.json(admins);
    } catch (error) {
      next(error);
    }
  },
};
