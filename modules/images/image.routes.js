const express = require("express");
const router = express.Router();

const { uploadImage } = require("./image.controller");
const { validateUploadImage } = require("./image.validator");

router.post("/albums/:albumId/images", validateUploadImage, uploadImage);

module.exports = router;
