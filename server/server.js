const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = 8080;
const path = require('path');

const app = express();

require("dotenv").config();
const db = require("./config/dbConfig");

// Use body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// using the routes
const userRoutes = require("./routes/userRoutes");
const moviesRoutes = require("./routes/moviesRoutes");
const theatresRoutes = require("./routes/theatreRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

app.use(cors());
app.use(express.json());

// // Serve static files from the 'public' directory
// app.use(express.static(path.join(__dirname, 'public')));

// // Handle all other routes by serving index.html
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// this route i am checking for jus DEPLOYMENT purpose 
app.use("/", (req, res) => {
  res.send("hello APIS");
});
app.use("/api/users", userRoutes);
app.use("/api/movies", moviesRoutes);
app.use("/api/theatres", theatresRoutes);
app.use("/api/bookings", bookingRoutes);

app.listen(PORT, () => {
  console.log(`your server is running fine at ${PORT}`);
});
