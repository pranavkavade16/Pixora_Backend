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

  next()
};

const validateUpdateAlbum = (req, res, next) => {
  const { description } = req.body;

  const errors = [];

  if (!description || typeof description !== "string") {
    errors.push("Description is required.");
  }

  if (description.trim().length === 0) {
    errors.push("Description cannot be empty.");
  }

  if (description.length > 500) {
    errors.push("Description cannot exceed 500 characters.");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors,
    });
  }

  next();
};

const validateAlbumAccess = (album, userId) => {
  const hasAccess =
    album.ownerId.toString() === userId ||
    album.sharedWith.some((id) => id.toString() === userId);

  if (!hasAccess) {
    throw new Error("Access denied");
  }
};

const validateEmailForShareAlbum = (req, res, next) => {
  const { emails } = req.body;

  const errors = [];

  if (!Array.isArray(emails)) {
    errors.push("Emails must be an array.");
  }

  if (!emails || emails.length === 0) {
    errors.push("At least one email is required.");
  }

  emails?.forEach((email) => {
    if (
      typeof email !== "string" ||
      !email.includes("@") ||
      email.startsWith("@") ||
      email.endsWith("@")
    ) {
      errors.push(`${email} is not a valid email`);
      return;
    }
  });

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors,
    });
  }

  next();
};

module.exports = {
  validateCreateAlbum,
  validateAlbumAccess,
  validateAlbumId,
  validateUpdateAlbum,
  validateEmailForShareAlbum,
};
