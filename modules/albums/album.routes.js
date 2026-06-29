const express = require("express");
const router = express.Router();

const {
  createAlbum,
  updateAlbum,
  shareAlbum,
  getAllAlbums,
  deleteAlbum,
  getLibrary,
  getAlbumById,
} = require("./album.controller");
const {
  validateCreateAlbum,
  validateAlbumId,
  validateUpdateAlbum,
  validateEmailForShareAlbum,
} = require("./album.validator");

//routes

router.post("/albums", validateCreateAlbum, createAlbum);

router.put(
  "/albums/:albumId",
  validateAlbumId,
  validateUpdateAlbum,
  updateAlbum,
);

router.post(
  "/albums/:albumId/share",
  validateAlbumId,
  validateEmailForShareAlbum,
  shareAlbum,
);

router.get("/albums/user/:userId", getAllAlbums);

router.delete("/albums/:albumId", deleteAlbum);

router.get("/albums/library/:userId", getLibrary);

router.get("/albums/:albumId", validateAlbumId, getAlbumById);

module.exports = router;
