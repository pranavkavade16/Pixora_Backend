require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { initializeDatabase } = require("./db/db.connect");

const albumRoutes = require("./modules/albums/album.routes");
const app = express();

const corsOptions = {
  origin: "*",
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

app.use("/", albumRoutes);
