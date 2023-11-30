const config = require("./utils/config");
const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const blogRouter = require("./controllers/blogs");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

console.log("connection to", config.MONGO_URI);
mongoose
  .connect(config.MONGO_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB", error.message);
  });

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());

app.use("/api/blogs", blogRouter);

module.exports = app;
