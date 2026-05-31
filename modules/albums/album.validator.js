const mongoose = require("mongoose");
const { validate } = require("uuid");

const validateCreateAlbum = (req, res, next) => {
  const { name, description } = req.body;

  const errors = [];

  if (!name || typeof name !== "string") {
    errors.push("Album name is required.");
  }

  if (name && name.trim().length === 0) {
    errors.push("Album name cannot be empty.");
  }

  if (name && name.length > 100) {
    errors.push("Album name cannot exceed 100 characters");
  }

  if (description && typeof description !== "string") {
    errors.push("Description must be a string");
  }

  if (description && description.length > 500) {
    errors.push("Description cannot exceed 500 characters");
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  next();
};

const validateAlbumId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.albumId)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid album ID." });
  }
};

module.exports = { validateCreateAlbum, validateAlbumId };
