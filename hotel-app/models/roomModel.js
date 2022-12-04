const mongoose = require("mongoose");

const roomSchema = {
    name: String,
    overview: String,
    guestNum: Number,
    size: Number,
    beds: String,
    equips: [String]
}

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;