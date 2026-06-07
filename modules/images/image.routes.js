const express = require("express");
const router = express.Router();

const { uploadImage, favoriteImage } = require("./image.controller");
const {
  validateUploadImage,
  validateAlbumId,
  validateImageId,
  validateFavoriteImage,
} = require("./image.validator");

router.post("/albums/:albumId/images", validateUploadImage, uploadImage);
router.put(
  "/albums/:albumId/images/:imageId/favorite",
  validateImageId,
  validateAlbumId,
  validateFavoriteImage,
  favoriteImage,
);

module.exports = router;
