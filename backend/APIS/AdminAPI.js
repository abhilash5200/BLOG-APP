import exp from "express";

export const adminRouter = exp.Router();

import UserModel from "../models/UserModel.js";
import { verifyToken } from "../Middlewares/verifyToken.js";

// ======================================================
// BLOCK USER
// ======================================================

adminRouter.put(
  "/block",
  verifyToken("ADMIN"),
  async (req, res, next) => {

    try {

      let { userId } = req.body;

      let user = await UserModel.findById(userId);

      if (!user) {
        return res.status(404).json({
          message: "User not found"
        });
      }

      user.isActive = false;

      await user.save();

      res.status(200).json({
        message: "User blocked successfully",
        payload: user
      });

    } catch (err) {
      next(err);
    }
  }
);

// ======================================================
// UNBLOCK USER
// ======================================================

adminRouter.put(
  "/unblock",
  verifyToken("ADMIN"),
  async (req, res, next) => {

    try {

      let { userId } = req.body;

      let user = await UserModel.findById(userId);

      if (!user) {
        return res.status(404).json({
          message: "User not found"
        });
      }

      user.isActive = true;

      await user.save();

      res.status(200).json({
        message: "User unblocked successfully",
        payload: user
      });

    } catch (err) {
      next(err);
    }
  }
);

// ======================================================
// GET ALL USERS
// ======================================================

adminRouter.get(
  "/users",
  verifyToken("ADMIN"),
  async (req, res, next) => {

    try {

      const users = await UserModel.find()
        .select("-password");

      res.status(200).json({
        message: "all users",
        payload: users
      });

    } catch (err) {

      next(err);
    }
  }
);