const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const Theatre = require("../models/theatreModel");

// adding the theatre
router.post("/add-theatre", authMiddleware, async (req, res) => {
  try {
    const newTheatre = new Theatre(req.body);
    await newTheatre.save();
    res.send({
      success: true,
      message: "Theatre added",
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

//get all the theatre by owner
router.post("/get-all-theatres-by-owner", authMiddleware, async (req, res) => {
  try {
    const theatres = await Theatre.find({ owner: req.body.owner });
    res.send({
      success: true,
      message: "Theatres fethced by owner successfully",
      data: theatres,
    });
  } catch (error) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

router.put("/update-theatre", authMiddleware, async (req, res) => {
  try {
    await Theatre.findByIdAndUpdate(req.body.theatreId, req.body);
    res.send({
      success: true,
      message: "Theare detials updated successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

//delete the theatre
router.post("/delete-theatre", authMiddleware, async (req, res) => {
  try {
    await Theatre.findByIdAndDelete(req.body.theatreId);
    res.send({
      success: true,
      message: "Theatre Deleted successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

//get all the theatre w.r.t all the owner
router.get("/get-all-theatres", authMiddleware, async (req, res) => {
  try {
    const theatres = await Theatre.find().populate("owner");
    res.send({
      success: true,
      message: "All theatre fetched successfully!",
      data: theatres,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
