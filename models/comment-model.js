const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  comment: {
    type: String
  }
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;