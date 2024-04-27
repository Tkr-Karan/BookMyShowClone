const express = require("express");
const cors = require("cors");
const PORT = 8080;

const app = express();

require("dotenv").config();
const db = require("./config/dbConfig");

// using the routes
const userRoutes = require("./routes/userRoutes");
const moviesRoutes = require("./routes/moviesRoutes");
const theatresRoutes = require("./routes/theatreRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/movies", moviesRoutes);
app.use("/api/theatres", theatresRoutes);
app.use("/api/bookings", bookingRoutes);

app.listen(PORT, () => {
  console.log(`your server is running fine at ${PORT}`);
});
