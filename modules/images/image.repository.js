const Image = require("./image.model");

const upload = async (imageData) => {
  return await Image.create(imageData);
};

const findById = async (imageId) => {
  return Image.findById(imageId);
};

const updateFavoriteStatus = async (imageId, isFavorite) => {
  return Image.findByIdAndUpdate(
    imageId,
    {
      isFavorite,
    },
    {
      new: true,
    },
  );
};

module.exports = { upload, findById, updateFavoriteStatus };
