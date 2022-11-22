const express = require("express");
const router = express.Router();
const Client = require("../models/clientModel");

router.route("/signup/customer").post((req, res) => {
    const name = req.body.name;
    const phone = req.body.phone;
    const address = req.body.address;
    const username = req.body.username;
    const password = req.body.password;

    const newClient = new Client({
        name,
        phone,
        address,
        username,
        password
    });

    newClient.save();
})

module.exports = router;