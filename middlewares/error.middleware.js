const errorMiddleware = (err, req, res, next) => {
  console.error("========== ERROR ==========");
  console.error("Time:", new Date().toISOString());
  console.error("Method:", req.method);
  console.error("URL:", req.originalUrl);
  console.error("Message:", err.message);
  console.error("Stack:", err.stack);
  console.error("===========================");

  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

module.exports = errorMiddleware;
