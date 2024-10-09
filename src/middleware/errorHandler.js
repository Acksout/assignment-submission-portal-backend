export const errorHandler = (err, req, res, next) => {
  // Log the error for debugging purposes
  console.error(err);

  // Handle Mongoose validation errors
  if (err.name === "ValidationError") {
    return res.status(400).json({
      status: "error",
      message: "Validation Error",
      errors: Object.values(err.errors).map((e) => e.message),
    });
  }

  // Handle duplicate key errors (e.g., unique constraint violations)
  if (err.code === 11000) {
    return res.status(400).json({
      status: "error",
      message: "Duplicate key error",
      error: `${Object.keys(err.keyValue)[0]} already exists`,
    });
  }

  // Handle all other errors
  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Internal server error",
  });
};
