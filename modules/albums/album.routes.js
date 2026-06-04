const express = require("express");
const router = express.Router();

const { createAblum, updateAlbum, shareAlbum } = require("./album.controller");
const {
  validateCreateAlbum,
  validateAlbumId,
  validateUpdateAlbum,
  validateEmailForShareAlbum,
} = require("./album.validator");

//routes

router.post("/albums", validateCreateAlbum, createAblum);

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

module.exports = router;
