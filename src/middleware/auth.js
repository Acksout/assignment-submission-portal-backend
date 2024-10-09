import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

// Middleware for authenticating regular users
export const auth = async (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error("Authentication token required");
    }

    // Verify the token and decode its payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Find the user by the decoded ID
    const user = await User.findById(decoded._id);

    if (!user) {
      throw new Error("User not found");
    }

    // Attach the user object to the request
    req.user = user;
    next();
  } catch (error) {
    // Handle authentication errors
    next({
      status: 401,
      message: "Please authenticate",
      error: error.message,
    });
  }
};

// Middleware for authenticating admin users
export const adminAuth = async (req, res, next) => {
  try {
    // Use the auth middleware first to authenticate the user
    await auth(req, res, () => {
      // Check if the authenticated user is an admin
      if (!req.user?.isAdmin) {
        throw new Error("Admin access required");
      }
      next();
    });
  } catch (error) {
    // Handle admin authentication errors
    next({
      status: 403,
      message: "Admin access required",
      error: error.message,
    });
  }
};
