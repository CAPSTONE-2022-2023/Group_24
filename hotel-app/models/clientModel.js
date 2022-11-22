const mongoose = require("mongoose");

const clientSchema = {
    name: String,
    phone: Number,
    address: String,
    username: String,
    password: String
}

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;