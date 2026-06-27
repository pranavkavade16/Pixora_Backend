require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { initializeDatabase } = require("./db/db.connect");

const albumRoutes = require("./modules/albums/album.routes");
const usersRoutes = require("./modules/users/user.routes");
const imageRoutes = require("./modules/images/image.routes");
const errorMiddleware = require("./middlewares/error.middleware");
const app = express();

const corsOptions = {
  origin: "*",
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

initializeDatabase();

app.use("/", albumRoutes);
app.use("/", usersRoutes);
app.use("/", imageRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
