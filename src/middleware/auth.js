import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error("Authentication token required");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);

    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    next({
      status: 401,
      message: "Please authenticate",
      error: error.message,
    });
  }
};

export const adminAuth = async (req, res, next) => {
  try {
    await auth(req, res, () => {
      if (!req.user?.isAdmin) {
        throw new Error("Admin access required");
      }
      next();
    });
  } catch (error) {
    next({
      status: 403,
      message: "Admin access required",
      error: error.message,
    });
  }
};
