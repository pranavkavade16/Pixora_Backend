const imageService = require("./image.service");

exports.uploadImage = async (req, res, next) => {
  try {
    const image = await imageService.uploadImage(
      req.params.albumId,
      req.user.userId,
      req.file,
      req.body,
    );

    return res.status(201).json({
      success: true,
      message: "Image uploaded successfully",
      data: image,
    });
  } catch (error) {
    next(error);
  }
};

exports.favoriteImage = async (req, res, next) => {
  try {
    const image = await imageService.favoriteImage(
      req.params.albumId,
      req.params.imageId,
      req.user.userId,
      req.body.isFavorite,
    );

    return res.status(200).json({
      success: true,
      message: "Favorite status updated successfully",
      data: image,
    });
  } catch (error) {
    next(error);
  }
};
