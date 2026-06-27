const imageService = require("./image.service");

exports.uploadImage = async (req, res, next) => {
  try {
    const image = await imageService.uploadImage(
      req.params.albumId,
      req.userId,
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

exports.deleteImage = async (req, res, next) => {
  try {
    const image = await imageService.deleteImage(
      req.params.albumId,
      req.params.imageId,
      req.user.userId,
    );

    return res.status(200).json({
      success: true,
      message: "Image delete successfully",
      data: image,
    });
  } catch (error) {
    next(error);
  }
};

exports.getImagesByAlbum = async (req, res, next) => {
  try {
    const images = await imageService.getImagesByAlbum(req.params.albumId);

    return res.status(200).json({
      success: true,
      message: "Images fetched successfully.",
      data: images,
    });
  } catch (error) {
    next(error);
  }
};
