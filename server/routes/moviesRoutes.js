const router = require("express").Router();
const Movie = require("../models/moviesModel");

router.post("/add-movie", async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    console.log(newMovie);
    await newMovie.save();
    res.send({
      success: true,
      message: "Movie Added Successfully!!",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// to get all the movies
router.get("/get-all-movies", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.send({
      success: true,
      message: "All movies fetched Successfully",
      data: movies,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
