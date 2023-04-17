import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import './home.css';
import axios from "axios";

const theme = createTheme();

function formatDate(string) {
    var options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
    return new Date(string).toLocaleDateString([], options);
}

export default function Reservation_Client() {
    const navigate = useNavigate();

    var ipAddress;

    if (process.env.REACT_APP_VERCEL_URL) {
        ipAddress = "https://capstone-group24-server.onrender.com/";
    }
    else {
        ipAddress = "http://localhost:3001/"
    }

    const [customer, setCustomer] = useState([{
        title: String,
        name: String,
        phone: String,
        address: String,
        username: String,
        password: String
    }])

    const [reservation, setReservation] = useState([{
        id: String,
        name: String,
        phone: String,
        email: String,
        guestNum: String,
        arrive: Date,
        depart: Date,
        roomName: String,
        requests: String,
        price: Number
    }])

    const [rooms, setRooms] = useState([{
        name: String,
        overview: String,
        guestNum: Number,
        size: Number,
        price: Number,
        beds: String,
        equips: [String]
    }])

    useEffect(() => {
        if (localStorage.getItem("username") === null || localStorage.getItem("username") === "") {
            navigate("/");
        }

        fetch(ipAddress + "get/customer/" + localStorage.getItem("username")).then(res => {
            if (res.ok) {
                return res.json()
            }
        }).then(jsonRes => setCustomer(jsonRes));

        fetch(ipAddress + "get/reservation/name/" + customer.name).then(res => {
            if (res.ok) {
                return res.json()
            }
        }).then(jsonRes => setReservation(jsonRes));

        fetch(ipAddress + "getAll/room").then(res => {
            if (res.ok) {
                return res.json()
            }
        }).then(jsonRes => setRooms(jsonRes));

        if (reservation) {
            document.getElementById("bookingLink").style.display = "none";
            document.getElementById("mainDiv").style.display = "flex";
            document.getElementById("mainbox").style.height = "initial";
            document.getElementById("nameMesg-h1").innerHTML = "Your Active Reservation";
            document.getElementById("resName").innerHTML = reservation.name;
            if (localStorage.getItem("paymentStatus") === "Paid") {
                document.getElementById("resStatus").innerHTML = "Payment Status: Paid";
                //Add a to payment button and style.display = none
            }
            else {
                document.getElementById("resStatus").innerHTML = "Payment Status: Not Paid";
            }
            document.getElementById("resPhone").innerHTML = "Phone Number: " + reservation.phone;
            document.getElementById("resEmail").innerHTML = "Email: " + reservation.email;
            document.getElementById("resRoomName").innerHTML = "Name of Room: " + reservation.roomName;
            document.getElementById("resPrice").innerHTML = "Price: $" + reservation.price;
            document.getElementById("resGuestNum").innerHTML = "Number of Guest(s): " + reservation.guestNum;
            document.getElementById("resArrive").innerHTML = "Will Arrive on: " + formatDate(reservation.arrive);
            document.getElementById("resDepart").innerHTML = "Will Depart on: " + formatDate(reservation.depart);
            document.getElementById("resRequest").innerHTML = "Request(s): " + reservation.requests;
        }
        else {
            document.getElementById("bookingLink").style.display = "initial";
            document.getElementById("mainbox").style.height = `${window.innerHeight / 4}px`;
            document.getElementById("nameMesg-h1").innerHTML = "You Currently have no Active Reservation"
            document.getElementById("mainDiv").style.display = "none";
        }
    })

    function getRoomIndex(roomName) {
        let roomIndex = -1;
        rooms.forEach((room, index) => {
            if (room.name === roomName) {
                roomIndex = index
            }
        })
        return roomIndex;
    }

    localStorage.setItem("clientName", customer.name);

    const editResbyId = (res) => {
        localStorage.setItem("resId", res.id);
        localStorage.setItem("roomIndex", getRoomIndex(res.roomName));
        localStorage.setItem("arriveDate", res.arrive);
        localStorage.setItem("departDate", res.depart);
        localStorage.setItem("guestNum", res.guestNum);
        navigate('/reservation/EditRequest');
    }

    const deleteResbyId = (res) => {
        axios.delete(ipAddress + "delete/reservation", { data: res });
    }

    return <ThemeProvider theme={theme}>
        <div class="body">
            <div class="navbar">
                <ul>
                    <li><a id="bookingLink" href='/reservation/create/Customer'>Start Booking Reservation</a></li>
                </ul>
            </div>

            <div style={{ marginBottom: "50px" }} class="nameMesg">
                <h1 id="nameMesg-h1" style={{ textAlign: "center", fontFamily: "'Playfair Display',serif" }}>You Currently have no Active Reservation</h1>
            </div>
            <Box id="mainbox" backgroundColor='#rgb(175, 246, 239)'>
                <div id="mainDiv" style={{ display: 'flex', justifyContent: "center", marginBottom: "50px" }}>
                    <Box width='800px' height='550px'
                        sx={{
                            display: 'flex',
                            backgroundColor: 'primary.light',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column'
                        }}
                        border="3px solid rgb(8, 102, 156)" color="white">
                        <Grid container spacing={0} justifyContent="center">
                            <h1 id="resName" style={{ textAlign: "center" }}></h1>
                        </Grid>

                        <Grid container rowSpacing={3}>
                            <h4 id="resStatus" style={{ marginLeft: "20px" }}></h4>
                        </Grid>

                        <Grid container rowSpacing={3}>
                            <h4 id="resPhone" style={{ marginLeft: "20px" }}></h4>
                        </Grid>

                        <Grid container rowSpacing={3}>
                            <h4 id="resEmail" style={{ marginLeft: "20px" }}></h4>
                        </Grid>

                        <Grid container rowSpacing={3}>
                            <h4 id="resRoomName" style={{ marginLeft: "20px" }}></h4>
                        </Grid>

                        <Grid container rowSpacing={3}>
                            <h4 id="resPrice" style={{ marginLeft: "20px" }}></h4>
                        </Grid>

                        <Grid container rowSpacing={3}>
                            <h4 id="resGuestNum" style={{ marginLeft: "20px" }}></h4>
                        </Grid>

                        <Grid container rowSpacing={3}>
                            <h4 id="resArrive" style={{ marginLeft: "20px" }}>Will Arrive on: </h4>
                        </Grid>

                        <Grid container rowSpacing={3}>
                            <h4 id="resDepart" style={{ marginLeft: "20px" }}>Will Depart on: </h4>
                        </Grid>

                        <Grid container rowSpacing={3}>
                            <h4 id="resRequest" style={{ marginLeft: "20px" }}>Request(s): </h4>
                        </Grid>

                        <Grid container justifyContent="center">
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ mt: 2, mb: 1, mr: 2 }}
                                onClick={() => {
                                    editResbyId(reservation);
                                }}
                            >
                                Request Reservation Changes
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ mt: 2, mb: 1, ml: 2 }}
                                onClick={() => {
                                    // delete function
                                    deleteResbyId(reservation);
                                }}
                            >
                                Cancel Reservation
                            </Button>
                        </Grid>
                    </Box>
                    &nbsp;
                </div>
            </Box>
            <div class="footer">
                <div class="cont">
                    <h2>Contact</h2>
                    <ul>
                        <li>Phone: 	647.265.3838 or 416.764.9900</li>
                        <li>Email: marcel.jar@senecacollege.ca</li>
                        <li>Adress: 1750 Finch Ave. East Toronto, Ont. M2J 2X5</li>
                    </ul>
                </div>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3628.508225944447!2d-79.35366273673891!3d43.79468761841798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4d31babbf5ce7%3A0x5812aa25d9fb9912!2sSeneca%20College%20Newnham%20Campus!5e0!3m2!1sen!2sca!4v1670305586001!5m2!1sen!2sca" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
    </ThemeProvider>
}