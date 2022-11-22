const mongoose = require("mongoose");

const clientsSchema = {
    title: String,
    name: String,
    phone: String,
    address: String,
    username: String,
    password: String,
    clientNum: String
}

const Client = mongoose.model("Client", clientsSchema);

module.exports = Client;