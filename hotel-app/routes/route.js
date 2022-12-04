const express = require("express");
const router = express.Router();
const Client = require("../models/clientModel");
const Employee = require("../models/employeeModel");
const Room = require("../models/roomModel");

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

router.route("/room/create").post((req, res) => {
    const name = req.body.name;
    const overview = req.body.overview;
    const guestNum = req.body.guestNum;
    const size = req.body.size;
    const price = req.body.price;
    const beds = req.body.beds;
    const equips = req.body.equips;

    const newRoom = new Room({
        name,
        overview,
        guestNum,
        size,
        price,
        beds,
        equips
    });

    newRoom.save();
})

router.route("/signin/customer").get((req, res) => {
    Client.find()
    .then(foundClients => res.json(foundClients))
})

router.route("/signin/employee").get((req, res) => {
    Employee.find()
    .then(foundEmployees => res.json(foundEmployees))
})

router.route("/room/getAll").get((req, res) => {
    Room.find()
    .then(foundRooms => res.json(foundRooms))
})

module.exports = router;