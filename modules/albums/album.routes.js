const express = require("express");
const router = express.Router();

const { createAblum } = require("./album.controller");
const { validateCreateAlbum } = require("./album.validator");

router.post("/albums", validateCreateAlbum, createAblum);

module.exports = router;
