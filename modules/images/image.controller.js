const imageService = require("./image.service");

exports.uploadImage = async (
  req,
  res,
  next
) => {
  try {
    const image =
      await imageService.uploadImage(
        req.params.albumId,
        req.user.userId,
        req.file,
        req.body
      );

    return res.status(201).json({
      success: true,
      message:
        "Image uploaded successfully",
      data: image,
    });
  } catch (error) {
    next(error);
  }
};