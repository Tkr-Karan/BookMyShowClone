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

//to update the movies
router.put("/update-movie", async (req, res) => {
  try {
    await Movie.findByIdAndUpdate(req.body.movieId, req.body);
    res.send({
      success: true,
      message: "movie updated successfully!!!",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

//to delete the movies
router.put("/delete-movie", async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.body.movieId);
    res.send({
      success: true,
      message: "movie deleted successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

//get a movie by ID
router.get("/get-movie-by-id/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id)

    res.send({
      success: true,
      message : "Movie Fecthed successfully",
      data : movie
    })
  } catch (error) {
    res.send({
      success: true,
      message: error.message
    })
  }
});

module.exports = router;
