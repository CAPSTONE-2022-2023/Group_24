const mongoose = require("mongoose");

const clientsSchema = {
    title: String,
    name: String,
    phone: String,
    address: String,
    username: String,
    password: String
}

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;