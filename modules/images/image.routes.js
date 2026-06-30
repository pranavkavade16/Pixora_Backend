const express = require("express");
const router = express.Router();
const upload = require("../../middlewares/upload.middleware");

const {
  uploadImage,
  favoriteImage,
  deleteImage,
  getImagesByAlbum,
  getImagesById,
} = require("./image.controller");
const {
  validateUploadImage,
  validateAlbumId,
  validateImageId,
  validateFavoriteImage,
} = require("./image.validator");

router.post(
  "/albums/:albumId/images",
  upload.single("image"),
  validateUploadImage,
  uploadImage,
);

router.put(
  "/albums/:albumId/images/:imageId/favorite",
  validateImageId,
  validateAlbumId,
  validateFavoriteImage,
  favoriteImage,
);

router.delete(
  "/albums/:albumId/images/:imageId",
  validateImageId,
  validateAlbumId,
  deleteImage,
);

router.get("/albums/:albumId/images", validateAlbumId, getImagesByAlbum);

router.get("/image/:imageId", validateImageId, getImagesById);

module.exports = router;
