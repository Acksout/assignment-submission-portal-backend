import { Assignment } from "../models/Assignment.js";
import { Submission } from "../models/Submission.js";

export const assignmentController = {
  create: async (req, res, next) => {
    try {
      const assignment = new Assignment({
        ...req.body,
        userId: req.user._id,
      });
      await assignment.save();
      res.status(201).json(assignment);
    } catch (error) {
      next(error);
    }
  },

  getAll: async (req, res, next) => {
    try {
      const assignments = await Assignment.find({
        adminId: req.user._id,
      }).populate("userId", "username");
      res.json(assignments);
    } catch (error) {
      next(error);
    }
  },

  updateStatus: async (req, res, next) => {
    try {
      const { id } = req.params;
      const status = req.path.endsWith("accept") ? "accepted" : "rejected";

      const assignment = await Assignment.findOneAndUpdate(
        { _id: id, adminId: req.user._id },
        { status },
        { new: true, runValidators: true }
      );

      if (!assignment) {
        throw new Error("Assignment not found or unauthorized");
      }

      res.json(assignment);
    } catch (error) {
      next({
        status: 404,
        message: "Update failed",
        error: error.message,
      });
    }
  },

  submitWork: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { submitData } = req.body;
      const userId = req.user._id;

      const assignment = await Assignment.findById(id);
      if (!assignment) {
        throw new Error("Assignment not found");
      }

      const submission = new Submission({
        assignmentId: id,
        userId,
        submitData,
      });

      await submission.save();

      res
        .status(201)
        .json({ message: "Work submitted successfully", submission });
    } catch (error) {
      next(error);
    }
  },
};
