const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const commentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PixoraUser",
      required: true,
    },

    text: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false },
);
const imageSchema = new mongoose.Schema(
  {
    imageId: {
      type: String,
      default: uuidv4,
      unique: true,
    },

    albumId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Album",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },

    publicId: {
      type: String,
      required: true,
    },

    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    persons: [
      {
        type: String,
        trim: true,
      },
    ],

    isFavorite: {
      type: Boolean,
      default: false,
    },

    comments: [commentSchema],

    size: {
      type: Number,
      required: true,
      min: 0,
    },

    width: Number,

    height: Number,

    mimeType: String,

    metadata: {
      camera: String,
      lens: String,
      iso: Number,
      aperture: String,
      shutterSpeed: String,
      focalLength: String,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Image", imageSchema);
