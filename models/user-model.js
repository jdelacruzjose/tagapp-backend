const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const transportation = require('../models/transportation-model')

const userSchema = new Schema(
  {
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    lat: Number,
    lng: Number,
    imageUrl: { type: String },
    userFriends: { type: [{ type: Schema.Types.ObjectId, ref: "User" }] },
    transportation: [{type: Schema.Types.ObjectId, ref: "transportation"}]
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
