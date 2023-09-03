const bcrypt = require("bcrypt");

const router = require("express").Router();

const User = require("../models/userModel");

// creating the post resuwxt for reguister the use data
router.post("/register", async (req, res) => {
  // console.log(req.body);

  try {
    const userEmail = await User.findOne({ email: req.body.email });
    if (userEmail) {
      return res.send({
        success: false,
        message: "this mail id is already exist",
      });
    }
    // hashed the password
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, salt);

    req.body.password = hashed;

    const newUser = new User(req.body);
    console.log(newUser);
    await newUser.save();
    res.send({
      message: "User Registered, Now please Login",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
});

// login the user
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.send({
        success: false,
        message: "This user not Exists, please register",
      });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.send({
        message: "Invalid password",
        success: false,
      });
    }

    return res.send({
      message: "Login Successfully!!",
      success: true,
    });
  } catch (error) {
    console.log("error", error);
  }
});

// exports the router
module.exports = router;
