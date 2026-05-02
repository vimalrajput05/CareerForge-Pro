const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [{
        price_data: {
          currency: "inr",
          product_data: { name: "CareerForge Pro" },
          unit_amount: 49900,
          recurring: { interval: "month" }
        },
        quantity: 1
      }],
      success_url: `${process.env.FRONTEND_URL || "http://localhost:5173"}?payment=success`,
      cancel_url: `${process.env.FRONTEND_URL || "http://localhost:5173"}?payment=cancel`
    });
    res.json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err);
    res.status(500).json({ error: "Payment session creation failed" });
  }
});

router.post("/webhook", async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).json({ error: "Webhook signature failed" });
  }
  if (event.type === "checkout.session.completed") {
    console.log("Payment successful:", event.data.object);
  }
  res.json({ received: true });
});

module.exports = router;
