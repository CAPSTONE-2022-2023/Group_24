const mongoose = require("mongoose");

const clientsSchema = {
    name: String,
    phone: int,
    address: String,
    username: String,
    password: String,
    clientNum: String
}

const Client = mongoose.model("Client", clientsSchema);

module.exports = Client;