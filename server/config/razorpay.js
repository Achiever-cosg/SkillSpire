const Razorpay = require("razorpay");
require("dotenv").config();

// console.log("Razorpay Key:", process.env.RAZORPAY_KEY);
// console.log("Razorpay Secret:", process.env.RAZORPAY_SECRET);


exports.instance = new Razorpay({
    key_id : process.env.RAZORPAY_KEY,
    key_secret : process.env.RAZORPAY_SECRET,
})