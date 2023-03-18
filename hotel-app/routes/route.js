const express = require("express");
const router = express.Router();
const Client = require("../models/clientModel");
const Employee = require("../models/employeeModel");
const Room = require("../models/roomModel");
const Reservation = require("../models/reservationModel");
const sgMail = require('@sendgrid/mail')

console.log(process.env.SENDGRID_API_KEY);
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

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

router.route("/create/room").post((req, res) => {
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

router.route("/create/reservation").post((req, res) => {

    const id = req.body.id;
    const name = req.body.name;
    const guestNum = req.body.guestNum;
    const phone = req.body.phone;
    const email = req.body.email;
    const price = req.body.price;
    const arrive = req.body.arrive;
    const depart = req.body.depart;
    const requests = req.body.requests;
    const roomName = req.body.roomName;
    

    const newReservation = new Reservation({
        id,
        name,
        phone,
        email,
        guestNum,
        arrive,
        depart,
        roomName,
        requests,
        price
    });

    newReservation.save();
})

router.route("/post/sendCreateEmail").post((req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const guestNum = req.body.guestNum;
    const phone = req.body.phone;
    const email = req.body.email;
    const price = req.body.price;
    const arrive = req.body.arrive;
    const depart = req.body.depart;
    const requests = req.body.requests;
    const roomName = req.body.roomName;

    const msg = {
      to: email, // Change to your recipient
      from: 'seneca.hotels@gmail.com', // Change to your verified sender
      subject: 'Your reservation had been made!',
      text: 'Your reservation info: ',
      html: `Reservation name: ${name}, Room: ${roomName}, Price: ${price}`,
    }

    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent');
      })
      .catch((error) => {
        console.error(error);
      })
})

router.route("/post/sendUpdateEmail").post((req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const guestNum = req.body.guestNum;
    const phone = req.body.phone;
    const email = req.body.email;
    const price = req.body.price;
    const arrive = req.body.arrive;
    const depart = req.body.depart;
    const requests = req.body.requests;
    const roomName = req.body.roomName;

    const msg = {
      to: email, // Change to your recipient
      from: 'seneca.hotels@gmail.com', // Change to your verified sender
      subject: 'Your reservation had been updated!',
      text: 'Your updated reservation info: ',
      html: `Reservation name: ${name}, Room: ${roomName}, Price: ${price}`,
    }

    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent');
      })
      .catch((error) => {
        console.error(error);
      })
})

router.route("/get/room/:name").get((req, res) => {
    Room.findOne({name: req.params.name})
        .then(foundRoom => res.json(foundRoom))
})

router.route("/get/customer/:name").get((req, res) => {
    Client.findOne({name: req.params.name})
        .then(foundClient => res.json(foundClient))
})

router.route("/get/employee/:name").get((req, res) => {
    Employee.findOne({name: req.params.name})
        .then(foundEmployee => res.json(foundEmployee))
})

router.route("/get/reservation/id/:id").get((req, res) => {
    Reservation.findOne({id: req.params.id})
        .then(foundReservation => res.json(foundReservation))
})

router.route("/get/reservation/name/:name").get((req, res) => {
    Reservation.find({name: req.params.name})
        .then(foundReservation => res.json(foundReservation))
})

router.route("/getAll/customer").get((req, res) => {
    Client.find()
        .then(foundClients => res.json(foundClients))
})

router.route("/getAll/employee").get((req, res) => {
    Employee.find()
        .then(foundEmployees => res.json(foundEmployees))
})

router.route("/getAll/room").get((req, res) => {
    Room.find()
        .then(foundRooms => res.json(foundRooms))
})

router.route("/getAll/reservation").get((req, res) => {
    Reservation.find()
        .then(foundReservations => res.json(foundReservations))
})

router.route("/delete/room").delete((req, res) => {
    Room.deleteOne({ name: req.body.name }).then(function () {
        console.log(req.body.name + "Room Deleted"); // Success
    }).catch(function (error) {
        console.log(error); // Failure
    });
})

router.route("/delete/reservation").delete((req, res) => {
    Reservation.deleteOne({ id: req.body.id }).then(function () {
        console.log("Reversation Cancel/Deleted"); // Success
    }).catch(function (error) {
        console.log(error); // Failure
    });
})

router.route("/edit/room").post((req, res) => {
    console.log("Old Room name" + req.body.oldRoomName);
    console.log("Edit Room name" + req.body.editRoom.name);

    Room.updateOne({ name: req.body.oldRoomName }, {$set: {name: req.body.editRoom.name, 
                                                           overview: req.body.editRoom.overview,
                                                           guestNum: req.body.editRoom.guestNum,
                                                           size: req.body.editRoom.size,
                                                           price: req.body.editRoom.price,
                                                           beds: req.body.editRoom.beds,
                                                           equips: req.body.editRoom.equips}}).then(function () {
        console.log(req.body.oldRoomName + "Room Updated to " + req.body.editRoom.name + " Room"); // Success
    }).catch(function (error) {
        console.log(error); // Failure
    });
})

router.route("/edit/reservation").post((req, res) => {
    console.log("Edit Reservation ID" + req.body.editRes.id);

    Room.updateOne({ name: req.body.editRes.id }, {$set: {name: req.body.editRes.name, 
                                                           phone: req.body.editRes.phone,
                                                           email: req.body.editRes.email,
                                                           guestNum: req.body.editRes.guestNum,
                                                           arrive: req.body.editRes.arrive,
                                                           depart: req.body.editRes.depart,
                                                           roomName: req.body.editRes.roomName,
                                                           requests: req.body.editRes.requests,
                                                           price: req.body.editRes.price,
                                                           }}).then(function () {
        console.log(`Reservation ${req.body.editRes.id} Updated`); // Success
    }).catch(function (error) {
        console.log(error); // Failure
    });
})
module.exports = router;