const mongoose = require("mongoose");

const validateEmail = (req, res, next) => {
  const { email } = req.body;

  const errors = [];

  if (!email) {
    errors.push("Email is required.");
  }

  if (
    typeof email !== "string" ||
    !email.includes("@") ||
    email.startsWith("@") ||
    email.endsWith("@")
  ) {
    errors.push(`${email} is not a valid email`);
    return;
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors,
    });
  }

  next();
};

module.exports = { validateEmail };
