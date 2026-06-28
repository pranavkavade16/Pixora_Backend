const mongoose = require("mongoose");

const validateUploadImage = (req, res, next) => {
  const { name, isFavorite, tags, persons } = req.body;

  const errors = [];

  console.log("Validator running...");
  console.log(req.body);
  console.log("tags:", req.body.tags);
  console.log("persons:", req.body.persons);
  console.log("Array tags:", Array.isArray(req.body.tags));
  console.log("Array persons:", Array.isArray(req.body.persons));

  // Image
  if (!req.file) {
    errors.push("Image file is required");
  }

  // Name
  if (!name || typeof name !== "string" || !name.trim()) {
    errors.push("Photo name is required");
  }

  // Tags
  if (tags && !Array.isArray(tags)) {
    errors.push("Tags must be an array");
  }

  if (Array.isArray(tags)) {
    const invalidTag = tags.find((tag) => typeof tag !== "string");
    if (invalidTag) {
      errors.push("Each tag must be a string");
    }
  }

  // Persons
  if (persons && !Array.isArray(persons)) {
    errors.push("Persons must be an array");
  }

  if (Array.isArray(persons)) {
    const invalidPerson = persons.find((person) => typeof person !== "string");

    if (invalidPerson) {
      errors.push("Each person must be a string");
    }
  }

  // Favorite
  if (
    isFavorite !== undefined &&
    !["true", "false", true, false].includes(isFavorite)
  ) {
    errors.push("isFavorite must be true or false");
  }

  if (errors.length) {
    return res.status(400).json({
      success: false,
      errors,
    });
  }

  next();
};

const validateImageId = (req, res, next) => {
  const { imageId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(imageId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid image id",
    });
  }

  next();
};

const validateAlbumId = (req, res, next) => {
  const { albumId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(albumId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid album",
    });
  }

  next();
};

const validateFavoriteImage = (req, res, next) => {
  const { isFavorite } = req.body;

  if (typeof isFavorite !== "boolean") {
    return res.status(400).json({
      success: false,
      message: "isFavorite must be true or false",
    });
  }

  next();
};

module.exports = {
  validateUploadImage,
  validateImageId,
  validateAlbumId,
  validateFavoriteImage,
};
