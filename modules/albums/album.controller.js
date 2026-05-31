const albumService = require("./album.service");

exports.createAlbum = async (req, res, next) => {
  try {
    const album = await albumService.createAlbum(req.body, req.user.userId);

    return res.status(201).json({ success: true, data: album });
  } catch (error) {
    next(error);
  }
};
