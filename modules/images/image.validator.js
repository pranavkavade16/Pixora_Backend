const validateUploadImage = async (req, res, next) => {
  const { person, isFavorite } = req.body;

  const errors = [];
  if (person && typeof person !== "string") {
    errors.push("Person must be a string");
  }

  if (isFavorite && !["true", "false"].includes(isFavorite)) {
    errors.push("isFavorite must be true or false");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors,
    });
  }

  next();
};

module.exports = { validateUploadImage };
