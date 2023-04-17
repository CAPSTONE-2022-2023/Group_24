const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const stripe = require('stripe')(process.env.sk_test_51MvBIeBJiqAjR4SVpjwqUIMvweYKOJorsjbPnMwaVhnCgX36QOa2D3odiIZ9fh4euM0j4ChWeVBV7SMIUwsQiMLU0042KQbhoz, {
    apiVersion: '2020-08-27',
    appInfo: { // For sample support and debugging, not required for production:
      name: "stripe-samples/accept-a-payment/custom-payment-flow",
      version: "0.0.2",
      url: "https://github.com/stripe-samples"
    }
});

const app = express();

app.use(cors());
app.use(express.json());

// connect mongoose
mongoose.connect("mongodb+srv://group24:Group24@group24.ieekutj.mongodb.net/hotel")

// require route
app.use("/", require("../routes/route"));

app.get('/config', (req, res) => {
    res.send({
      publishableKey: process.env.pk_test_51MvBIeBJiqAjR4SVdwO4CmjvrNMKgWfOYWlQc7xDFFfRc8Rdk3rAtY71olkius9ZuMOfcM8eyElhJQQRuAmr0J6J00B2PqNP42,
    });
});

app.listen(process.env.PORT || 3001, function() {
    console.log("express server running at 3001");
})