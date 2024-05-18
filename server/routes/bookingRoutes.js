const authMiddleware = require("../middlewares/authMiddleware");
const router = require("./theatreRoutes");
const Booking = require("../models/bookingModel");
const Show = require("../models/showModels");

const stripe = require("stripe")(process.env.stripe_secret_key);

router.post("/make-payments", authMiddleware, async (req, res) => {
  try {
    const { amount } = req.body;

    // const customer = await stripe.customers.create({
    //   email: token.email,
    //   source: token.id,
    // });

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "movie ticket",
            },
            unit_amount: amount,
          },
          quantity: 3,
        },
      ],
      mode: "payment",
      success_url: "https://www.google.com",
      cancel_url: "http://www.youtube.com",
      // line_items: [
      //   {
      //     // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
      //     price: token.id,
      //   },
      // ],
      // mode: "payment",
      // success_url: "https://bms-clone-1bcr.onrender.com",
      // cancel_url: "https://bms-clone-1bcr.onrender.com?canceled=true",
    });

    res.json({ id: session.id });
    console.log(session.id);

    // console.log(token, "Here is your customer");

    // const charge = await stripe.charges.create({
    //   amount: amount,
    //   currency: "INR",
    //   customer: customer.id,
    //   receipt_email: token.email,
    //   description: "Payment made for booking of ticket",
    // });

    // console.log(charge, "here is the charges");

    // const transactionId = charge.id;
    res.send({
      success: true,
      message: "Payment done, Ticket booked",
    });
    // res.redirect(303, session.url);
  } catch (error) {
    console.log(error, "error");
    // res.send({
    //   success: false,
    //   message: error.message,
    // });
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
