const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

const app = express();

const port = 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/blog", {
    useCreateIndex: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("mongodb connected");
    app.listen(port, () => {
      console.log("App is running at port: " + port);
    });
  })
  .catch((err) => console.log("could not connect to database"));

app.use("/api/blogPost", postRoutes);
app.use("/api/auth", userRoutes);
