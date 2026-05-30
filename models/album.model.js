const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const albumSchema = new mongoose.Schema(
  {
    albumId: {
      type: String,
      default: uuidv4,
      unique: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    sharedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Album", albumSchema);
