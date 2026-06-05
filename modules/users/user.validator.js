const mongoose = require("mongoose");

const validateEmail = (req, res, next) => {
  const { emails } = req.body;

  const errors = [];

  if (!emails) {
    errors.push("Email is required.");
  }

  emails?.forEach((email) => {
    if (
      typeof email !== "string" ||
      !email.includes("@") ||
      email.startsWith("@") ||
      email.endsWith("@")
    ) {
      errors.push(`${email} is not a valid email`);
      return;
    }
  });

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors,
    });
  }

  next();
};

module.exports = { validateEmail };
