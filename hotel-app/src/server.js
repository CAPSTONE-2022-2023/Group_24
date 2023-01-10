const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors({
    origin: '*',
}))
app.use(express.json());


// connect mongoose
mongoose.connect("mongodb+srv://group24:Group24@group24.ieekutj.mongodb.net/hotel")

// require route
app.use("/", require("../routes/route"));

app.listen(process.env.PORT || 3001, function() {
    console.log("express server running at 3001");
})