const express = require("express");
const router = express.Router();

const { createAblum, updateAlbum } = require("./album.controller");
const {
  validateCreateAlbum,
  validateAlbumId,
  validateUpdateAlbum,
} = require("./album.validator");

router.post("/albums", validateCreateAlbum, createAblum);

router.put(
  "/albums/:albumId",
  validateAlbumId,
  validateUpdateAlbum,
  updateAlbum,
);

module.exports = router;
