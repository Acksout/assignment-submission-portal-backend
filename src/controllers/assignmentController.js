import mongoose from "mongoose";
import { Assignment } from "../models/Assignment.js";
import { Submission } from "../models/Submission.js";
import { User } from "../models/User.js";

export const assignmentController = {
  // Create a new assignment
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

  // Get all assignments for the current admin
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

  // Update the status of an assignment (accept or reject)
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

  // Submit work for an assignment
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

  // Get submissions for a specific student
  getStudentSubmissions: async (req, res, next) => {
    try {
      const { studentIdentifier } = req.params;
      let student;

      // Check if the identifier is a valid MongoDB ObjectId
      if (mongoose.Types.ObjectId.isValid(studentIdentifier)) {
        student = await User.findById(studentIdentifier);
      } else {
        // If not, assume it's a username
        student = await User.findOne({ username: studentIdentifier });
      }

      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }

      // Fetch and format submissions for the student
      const submissions = await Submission.find({ userId: student._id })
        .populate("assignmentId")
        .sort({ submittedAt: -1 });

      res.json({
        student: {
          id: student._id,
          username: student.username,
        },
        submissions: submissions.map((sub) => ({
          id: sub._id,
          assignmentId: sub.assignmentId._id,
          assignmentTask: sub.assignmentId.task,
          submitData: sub.submitData,
          submittedAt: sub.submittedAt,
        })),
      });
    } catch (error) {
      next(error);
    }
  },
};
