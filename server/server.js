const express = require("express");
const cors = require('cors');
const PORT = 8080;

const app = express();

require("dotenv").config();
const db = require("./config/dbConfig");

// using the routes
const userRoutes = require("./routes/userRoutes");

app.use(cors())
app.use(express.json());
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`your server is running fine at ${PORT}`);
});
