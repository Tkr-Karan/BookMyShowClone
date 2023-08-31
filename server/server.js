const express = require("express");

const app = express();

const PORT = 8080;

require("dotenv").config();

const db = require("./config/dbConfig");

app.get("/", (req, res) => {
  res.end("Here your server is running !!!!");
});

app.listen(PORT, () => {
  console.log(`your server is running fine at ${PORT}`);
});
