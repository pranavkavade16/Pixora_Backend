const albumService = require("./album.service");

exports.createAlbum = async (req, res, next) => {
  try {
    const album = await albumService.createAlbum(req.body);

    return res.status(201).json({ success: true, data: album });
  } catch (error) {
    next(error);
  }
};

exports.updateAlbum = async (req, res, next) => {
  try {
    const album = await albumService.updateAlbum(
      req.params.albumId,
      req.user.userId,
      req.body.description,
    );

    return res.status(200).json({
      success: true,
      data: album,
    });
  } catch (error) {
    next(error);
  }
};

exports.shareAlbum = async (req, res, next) => {
  try {
    const album = await albumService.shareAlbum(
      req.params.albumId,
      req.user.userId,
      req.body.emails,
    );

    return res.status(200).json({
      success: true,
      message: "Album shared successfully",
      data: album,
    });
  } catch (error) {
    next(error);
  }
};
