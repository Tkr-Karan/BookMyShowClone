const authMiddleware = require("../middlewares/authMiddleware");
const router = require("./theatreRoutes");
const Booking = require("../models/bookingModel");
const Show = require("../models/showModels");

const stripe = require("stripe")(process.env.stripe_secret_key);

router.post("/make-payments", authMiddleware, async (req, res) => {
  try {
    const { token, amount, quantity } = req.body;
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "movie ticket",
            },
            unit_amount: Math.floor(amount),
          },
          quantity: quantity,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/thank-you",
      cancel_url: "http://localhost:3000/payment-failed",
    });
    res.json({
      success: true,
      message: "Payment done, Ticket booked",
      id: session.id,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

router.post("/book-show", authMiddleware, async (req, res) => {
  try {
    // save booking
    const newBooking = new Booking(req.body);
    await newBooking.save();

    const show = await Show.findById(req.body.show);
    // update seats
    await Show.findByIdAndUpdate(req.body.show, {
      bookedSeats: [...show.bookedSeats, ...req.body.seats],
    });

    res.send({
      success: true,
      message: "Show booked successfully",
      data: newBooking,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

router.get("/get-bookings", authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.body.userId })
      .populate("user")
      .populate("show")
      .populate({
        path: "show",
        populate: {
          path: "movie",
          model: "movies",
        },
      })
      .populate({
        path: "show",
        populate: {
          path: "theatre",
          model: "theatres",
        },
      });

    res.send({
      success: true,
      message: "Bookings fetched successfully",
      data: bookings,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
