const mongoose = require("mongoose");

// const password = "6EwHq9Y4tatrVXon";

// const db = `mongodb+srv://karankumar254:${password}@cluster0.buymhu8.mongodb.net/`;

mongoose.connect(process.env.mongo_url);

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("connection established");
});
