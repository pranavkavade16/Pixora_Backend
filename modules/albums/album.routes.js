const express = require("express");
const router = express.Router();

const {
  createAlbum,
  updateAlbum,
  shareAlbum,
  getAllAlbums,
  deleteAlbum,
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

router.get("/albums", getAllAlbums);

router.delete("/albums/:albumId", deleteAlbum);

module.exports = router;
