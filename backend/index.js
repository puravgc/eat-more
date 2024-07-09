const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Routes

app.use(require("./routes/userSignup"));
app.use(require("./routes/userLogin"));
app.use(require("./routes/addCart"));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(function () {
    console.log("connected to Db");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen("5000", () => {
  console.log("Server is running on port 5000");
});
