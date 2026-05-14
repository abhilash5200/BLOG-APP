import UserModel from "../models/UserModel.js";

// middleware to verify author role
export const checkAuthor = async (req, res, next) => {

  try {

    // get author id
    let aid = req.body?.author || req.params?.authorId;

    // find author
    let author = await UserModel.findById(aid);

    // author not found
    if (!author) {
      return res.status(401).json({
        message: "Invalid Author"
      });
    }

    // role check
    if (author.role !== "AUTHOR") {
      return res.status(403).json({
        message: "User is not an Author"
      });
    }

    // active status check
    if (!author.isActive) {
      return res.status(403).json({
        message: "Author account is not active"
      });
    }

    next();

  } catch (err) {
    next(err);
  }
};