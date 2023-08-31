const bcrypt = require('bcrypt')

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
    const hashed = await bcrypt.hash(req.body.password, salt)

    req.body.password = hashed


    const newUser = new User(req.body);
    console.log(newUser);
    await newUser.save();
    res.send("User Added Succesfully!!");
  } catch (error) {
    console.log(error);
  }
});

// exports the router
module.exports = router;
