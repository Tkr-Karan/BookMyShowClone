const express = require("express");
const PORT = 8080;

const app = express();

require("dotenv").config();
const db = require("./config/dbConfig");

// using the routes
const userRoutes = require("./routes/userRoutes");
app.use(express.json());
app.use("/", userRoutes);

app.listen(PORT, () => {
  console.log(`your server is running fine at ${PORT}`);
});
