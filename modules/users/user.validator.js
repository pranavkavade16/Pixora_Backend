const mongoose = require("mongoose");

const validateEmail = (req, res, next) => {
  const { emails } = req.body;

  const errors = [];

  if (!Array.isArray(emails)) {
    errors.push("Emails must be an array.");
  }

  if (!emails || emails.length === 0) {
    errors.push("At least one email is required.");
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
