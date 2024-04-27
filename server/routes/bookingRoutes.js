const authMiddleware = require("../middlewares/authMiddleware");
const router = require("./theatreRoutes");

const stripe = require('stripe')(process.env.stripe_secret_key)

router.post("/make-payments", authMiddleware, async (req, res) => {
  try {
    const { token, amount } = req.body;
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const charge = await stripe.charges.create({
      amount: amount,
      currency: "usd",
      customer: customer.id,
      receipt_email: token.email,
      description: "Payment made for booking of ticket",
    });

    const transactionId = charge.id;
    res.send({
      success: true,
      message: "Payment done, Ticket booked",
      data: transactionId,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});
module.exports = router;
