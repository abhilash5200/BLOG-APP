import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import UserModel from "../models/UserModel.js";

// ================= REGISTER =================

export const register = async (userObj) => {

  // create document
  const userDoc = new UserModel(userObj);

  // validate fields
  await userDoc.validate();

  // hash password
  userDoc.password = await bcrypt.hash(userDoc.password, 10);

  // save to database
  const created = await userDoc.save();

  // remove password before sending
  const newUserObj = created.toObject();
  delete newUserObj.password;

  return newUserObj;
};

// ================= AUTHENTICATE =================

export const authenticate = async ({ email, password }) => {

  // find user
  const user = await UserModel.findOne({ email });

  if (!user) {
    const err = new Error("Invalid email");
    err.status = 401;
    throw err;
  }

  // compare password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    const err = new Error("Invalid password");
    err.status = 401;
    throw err;
  }

  // blocked account check
  if (user.isActive === false) {
    const err = new Error("Your account is blocked. Please contact admin");
    err.status = 403;
    throw err;
  }

  // generate token
  const token = jwt.sign(
    {
      userId: user._id,
      role: user.role,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  // remove password
  const userObj = user.toObject();
  delete userObj.password;

  return { token, user: userObj };
};