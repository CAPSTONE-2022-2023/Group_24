const mongoose = require("mongoose");

const reservationSchema = {
    id: String,
    name: String,
    phone: String,
    email: String,
    guestNum: String,
    arrive: Date,
    depart: Date,
    roomName: String,
    requests: [String],
    price: Number
}

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;