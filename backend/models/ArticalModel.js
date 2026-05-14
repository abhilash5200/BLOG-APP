import mongoose from "mongoose";

const { Schema } = mongoose;

// ======================================================
// COMMENT SCHEMA
// ======================================================

const userCommentSchema = new Schema({

  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },

  comment: {
    type: String,
    trim: true
  }

});

// ======================================================
// ARTICLE SCHEMA
// ======================================================

const articalSchema = new Schema({

  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "author is required"]
  },

  title: {
    type: String,
    required: [true, "title is required"],
    trim: true
  },

  category: {
    type: String,
    required: [true, "category is required"],
    trim: true
  },

  content: {
    type: String,
    required: [true, "content is required"],
    trim: true
  },

  comments: [userCommentSchema],

  isArticleActive: {
    type: Boolean,
    default: true
  }

}, {
  timestamps: true,
  strict: "throw",
  versionKey: false
});

// safe export
export default mongoose.models.Artical ||
mongoose.model("Artical", articalSchema);