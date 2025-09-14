const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔑 Razorpay setup (Account banane ke baad keys lo)
const razorpay = new Razorpay({
  key_id: "rzp_test_RHWAFwh7uwWSMg",
  key_secret: "9v2IHz2nTT33wCpLN4PgH5oM"
});

// Home Route
app.get("/", (req, res) => {
  res.send("✅ Ebook Store Backend Running");
});

// Order Create API
app.post("/create-order", async (req, res) => {
  try {
    const options = {
      amount: req.body.amount * 100, // ₹ → paise
      currency: "INR",
      receipt: "receipt#1",
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
