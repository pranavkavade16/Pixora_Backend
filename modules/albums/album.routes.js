const express = require("express");
const router = express.Router();

const { createAblum, updateAlbum, shareAlbum } = require("./album.controller");
const {
  validateCreateAlbum,
  validateAlbumId,
  validateUpdateAlbum,
  validateShareAlbum,
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
  validateShareAlbum,
  shareAlbum,
);

module.exports = router;
