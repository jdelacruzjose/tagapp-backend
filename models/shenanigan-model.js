const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shenaniganSchema = new Schema(
  {
    eventName: {
      type: String,
      required: true,
      minlength: 2
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    description: {
      type: String,
      required: true
    },
    category: {
      type: String,
    },
    lat: {
      type: Number
    },
    lng: {
      type: Number
    },
    imageUrl: {
      type: String
    },
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
    author: { type: Schema.Types.ObjectId, ref: "User" },
    transportation: [{ type: Schema.Types.ObjectId, ref: "Transportation" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }]
  },

  {
    timestamps: true
  }
);

const Event = mongoose.model("Shenanigan", shenaniganSchema);
module.exports = Event;
