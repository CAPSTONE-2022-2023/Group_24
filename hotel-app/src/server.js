const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());

// connect mongoose
mongoose.connect("mongodb+srv://group24:Group24@group24.ieekutj.mongodb.net/hotel")

// require route
app.use("/", require("../routes/route"));

app.listen(3001, function() {
    console.log("express server running at 3001");
})