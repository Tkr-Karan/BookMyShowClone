const bcrypt = require("bcrypt");

const router = require("express").Router();

const User = require("../models/userModel");
const jwt = require('jsonwebtoken');
const authMiddleware = require("../middlewares/authMiddleware");

// creating the post resuwxt for reguister the use data
router.post("/register" ,async (req, res) => {
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

    //check the hashed password

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

    let token = jwt.sign({userId : user._id}, process.env.jwt_secret_key, {expiresIn: "1d"});
    console.log(token)

    return res.send({
      message: "Login Successfully!!",
      success: true,
      token: token
    });
  } catch (error) {
    console.log("error", error);
  }
});

//get current details of the user
router.get("/get-current-user", authMiddleware ,async (req, res) => {
  try {
    const user = await User.findById(req.body.userId).select('-password')
    res.send({
      success : true,
      message: "user data fetched!!",
      data: user
    })

  } catch (error) {
    res.send({
      success: false,
      message : error.message,
    })    
  }
})

// exports the router
module.exports = router;
