const express = require("express");
const router = express.Router();

const { createUser, getAllUsers } = require("./user.controller");
const { validateEmail } = require("./user.validator");

// routes

router.post("/users", validateEmail, createUser);

router.get("/users", getAllUsers);
module.exports = router;
