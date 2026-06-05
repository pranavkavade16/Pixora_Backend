const express = require("express");
const router = express.Router();

const { createUser } = require("./user.controller");
const { validateEmail } = require("./user.validator");

// routes

router.post("/users", validateEmail, createUser);

module.exports = router;
