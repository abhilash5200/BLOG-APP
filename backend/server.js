import exp from "express";
import { connect } from "mongoose";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import { userRouter } from "./APIS/UserAPI.js";
import { authorRouter } from "./APIS/AuthorAPI.js";
import { adminRouter } from "./APIS/AdminAPI.js";
import { commonRouter } from "./APIS/CommonAPI.js";

config();

const app = exp();

// ================= CORS =================
app.use(cors({
  origin: [
    "https://blog-app-sepia-omega-97.vercel.app",
    "https://blog-1gl1tcajp-abhilash5200s-projects.vercel.app"
  ],
  credentials: true
}));
// ================= MIDDLEWARES =================
app.use(exp.json());
app.use(cookieParser());

// ================= ROUTES =================
app.use("/user-api", userRouter);
app.use("/author-api", authorRouter);
app.use("/admin-api", adminRouter);
app.use("/common-api", commonRouter);

// ================= DATABASE =================
const connectDB = async () => {
  try {
    await connect(process.env.DB_URL);

    console.log("DB connection success");

    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });

  } catch (err) {
    console.log("DB connection error:", err.message);
  }
};

connectDB();

// ================= INVALID PATH =================
app.use((req, res) => {
  res.status(404).json({
    message: `${req.url} is invalid path`,
  });
});

// ================= ERROR HANDLER =================
app.use((err, req, res, next) => {

  console.log("ERROR:", err);

  // duplicate email
  if (err.code === 11000) {
    return res.status(400).json({
      message: "Email already exists",
    });
  }

  // mongoose validation
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation error",
    });
  }

  res.status(err.status || 500).json({
    message: err.message || "Something went wrong",
  });

});