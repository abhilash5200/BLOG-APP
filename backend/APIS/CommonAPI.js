import exp from "express";
import { authenticate } from "../services/authservice.js";
import { verifyToken } from "../Middlewares/verifyToken.js";
import bcrypt from "bcryptjs";
import UserModel from "../models/UserModel.js";

export const commonRouter = exp.Router();

// ======================================================
// LOGIN
// ======================================================

commonRouter.post("/login", async (req, res, next) => {

  try {

    // get credentials
    let userCred = req.body;

    // authenticate
    let { token, user } = await authenticate(userCred);

    // store token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true
    });

    // send user
    res.status(200).json({
      message: "login success",
      payload: user
    });

  } catch (err) {
    next(err);
  }
});

// ======================================================
// LOGOUT
// ======================================================

commonRouter.post("/logout", async (req, res) => {

  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "none",
    secure: true
  });

  res.status(200).json({
    message: "Logged out successfully"
  });
});

// ======================================================
// CHANGE PASSWORD
// ======================================================

commonRouter.put(
  "/change-password",
  verifyToken("USER", "AUTHOR", "ADMIN"),
  async (req, res, next) => {

    try {

      let {
        email,
        currentPassword,
        newPassword
      } = req.body;

      let tokenUser = req.user;

      if (email !== tokenUser.email) {
        return res.status(403).json({
          message: "Email does not match logged in user"
        });
      }

      if (currentPassword === newPassword) {
        return res.status(400).json({
          message: "New password must be different from current password"
        });
      }

      let user = await UserModel.findById(tokenUser.userId);

      if (!user) {
        return res.status(404).json({
          message: "User not found"
        });
      }

      const isMatch = await bcrypt.compare(
        currentPassword,
        user.password
      );

      if (!isMatch) {
        return res.status(401).json({
          message: "Current password is incorrect"
        });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      user.password = hashedPassword;

      await user.save();

      res.status(200).json({
        message: "Password changed successfully"
      });

    } catch (err) {
      next(err);
    }
  }
);

// ======================================================
// CHECK AUTH
// ======================================================

commonRouter.get(
  "/check-auth",
  verifyToken("USER", "AUTHOR", "ADMIN"),
  async (req, res, next) => {

    try {

      const user = await UserModel
        .findById(req.user.userId)
        .select("-password");

      if (!user) {
        return res.status(404).json({
          message: "User not found"
        });
      }

      res.status(200).json({
        message: "authenticated",
        payload: user
      });

    } catch (err) {
      next(err);
    }
  }
);