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

exports.getAllAlbums = async (req, res, next) => {
  try {
    const albums = await albumService.getAllAlbums(req.params.userId);

    return res.status(201).json({ success: true, data: albums });
  } catch (error) {
    next(error);
  }
};

exports.deleteAlbum = async (req, res, next) => {
  try {
    const { albumId } = req.params;
    const { userId } = req.body;
    const deletedAlbum = await albumService.deleteAlbum(albumId, userId);

    return res.status(201).json({
      success: true,
      message: `Album ${albumId} is deleted successfully.`,
    });
  } catch (error) {
    next(error);
  }
};

const Album = require("../models/album.model");

exports.getLibrary = async (req, res, next) => {
  try {
    const userId = req.params;

    const library = await albumService.getLibrary(userId);

    res.status(200).json({
      success: true,
      data: library,
    });
  } catch (error) {
    next(error);
  }
};
