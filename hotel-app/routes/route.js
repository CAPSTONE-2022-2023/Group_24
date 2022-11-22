const express = require("express");
const router = express.Router();
const Client = require("../models/clientModel");
const Employee = require("../models/employeeModel");

router.route("/signup/customer").post((req, res) => {
    const title = req.body.title;
    const name = req.body.name;
    const phone = req.body.phone;
    const address = req.body.address;
    const username = req.body.username;
    const password = req.body.password;

    const newClient = new Client({
        title,
        name,
        phone,
        address,
        username,
        password
    });

    newClient.save();
})

router.route("/signup/employee").post((req, res) => {
    const name = req.body.name;
    const phone = req.body.phone;
    const address = req.body.address;
    const username = req.body.username;
    const password = req.body.password;

    const newEmployee = new Employee({
        name,
        phone,
        address,
        username,
        password
    });

    newEmployee.save();
})

module.exports = router;