const authMiddleware = require("../middlewares/authMiddleware");
const router = require("./theatreRoutes");

const stripe = requre("stripe")(process.env.stripe_secret_key);

router.post("/make-payments", authMiddleware, async (req, res) => {
  try {
    const { token, amount } = req.body;
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});
