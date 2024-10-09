import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import assignmentRoutes from "./routes/assignmentRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

app.use("/api/users", userRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/assignments", assignmentRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
