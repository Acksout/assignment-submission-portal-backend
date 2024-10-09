import { body, validationResult } from "express-validator";

// Middleware for validating user registration/login data
export const validateUser = [
  // Validate username
  body("username")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long"),
  // Validate password
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  // Check for validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Middleware for validating assignment creation data
export const validateAssignment = [
  // Validate adminId
  body("adminId").isMongoId().withMessage("Valid admin ID is required"),
  // Validate task description
  body("task").trim().notEmpty().withMessage("Task description is required"),
  // Check for validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Middleware for validating submission data
export const validateSubmission = [
  // Validate submit data
  body("submitData").notEmpty().withMessage("Submit data is required"),
];
