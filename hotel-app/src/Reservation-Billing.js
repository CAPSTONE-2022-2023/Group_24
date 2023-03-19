import React, { useEffect, useState, useLayoutEffect } from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import AdbIcon from '@mui/icons-material/Adb';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import './home.css';
import axios from "axios";

const theme = createTheme();

function formatDate(string) {
    var options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
    return new Date(string).toLocaleDateString([], options);
}

export default function Reservation_Billing() {
    const navigate = useNavigate();

    // if (localStorage.getItem("username") === null || localStorage.getItem("username") === "") {
    //     return <Navigate to="/" />;
    // }
    // else {
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
            document.getElementById("resName").innerHTML = "Name: " + reservation.name;
            document.getElementById("resPhone").innerHTML = "Phone Number: " + reservation.phone;
            document.getElementById("resEmail").innerHTML = "Email: " + reservation.email;
            document.getElementById("resRoomName").innerHTML = "Room: " + reservation.roomName;
            //document.getElementById("resPrice").innerHTML = "Price: $" + reservation.price;
            document.getElementById("resGuestNum").innerHTML = "Number of Guest(s): " + reservation.guestNum;
            document.getElementById("resArrive").innerHTML = "Will Arrive on: " + formatDate(reservation.arrive);
            document.getElementById("resDepart").innerHTML = "Will Depart on: " + formatDate(reservation.depart);
            document.getElementById("resRequest").innerHTML = "Request(s): " + reservation.requests;
        }
    })

    localStorage.setItem("clientName", customer.name);

    const proceedtoPayment = (res) => {
        navigate('/reservation/Client');
    }

    return <ThemeProvider theme={theme}>
        <div class="body">
            <div class="navbar">
                <ul>
                    <li><a id="PaymentLink" onClick={() => {
                        proceedtoPayment(reservation);
                    }}>Proceed to Payment</a></li>
                </ul>
            </div>

            {/* <div style={{ marginBottom: "50px" }} class="nameMesg">
                <h1 id="nameMesg-h1" style={{ textAlign: "center", fontFamily: "'Playfair Display',serif" }}>You Currently have no Active Reservation</h1>
            </div> */}
            <Box id="mainbox" backgroundColor='#rgb(175, 246, 239)'>
                <div id="mainDiv" style={{ display: 'flex', justifyContent: "center", marginBottom: "50px" }}>
                    <Box width='800px' height='800px'
                        sx={{
                            display: 'flex',
                            backgroundColor: 'white',
                            alignItems: 'center',
                            flexDirection: 'column',
                        }}
                        border="3px solid rgb(8, 102, 156)" color="black">
                        <Grid container sx={{ ml: 4, mt: 6 }}>
                            <Grid container justifyContent="left" sx={{ ml: 0, my: -3 }}>
                                <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, color: "#1976d2", mt: 0.2, mr: 1 }} />
                                <Typography
                                    variant="h6"
                                    noWrap
                                    component="a"
                                    sx={{
                                        mr: 2,
                                        mb: 2,
                                        display: { xs: 'none', md: 'flex' },
                                        fontFamily: 'monospace',
                                        fontWeight: 700,
                                        letterSpacing: '.3rem',
                                        color: '#1976d2',
                                        textDecoration: 'none',
                                    }}
                                >
                                    Seneca Hotel
                                </Typography>
                            </Grid>
                            <Grid container justifyContent="left">
                                <h6>1750 Finch Ave. East Toronto, Ont. M2J 2X5</h6>
                            </Grid>
                        </Grid>

                        <Grid container rowSpacing={3}>
                            <h3 style={{ marginLeft: "20px", color: "#1976d2" }}>Customer Details</h3>
                        </Grid>

                        <Grid container rowSpacing={3}>
                            <h4 id="resName" style={{ marginLeft: "20px" }}></h4>
                        </Grid>

                        <Grid container rowSpacing={3}>
                            <h4 id="resPhone" style={{ marginLeft: "20px" }}></h4>
                        </Grid>

                        <Grid container rowSpacing={3}>
                            <h4 id="resEmail" style={{ marginLeft: "20px" }}></h4>
                        </Grid>

                        <Grid container rowSpacing={3}>
                            <h3 style={{ marginLeft: "20px", color: "#1976d2" }}>Reservation Details</h3>
                        </Grid>

                        <Grid container rowSpacing={3}>
                            <h4 id="resRoomName" style={{ marginLeft: "20px" }}></h4>
                        </Grid>

                        {/* <Grid container rowSpacing={3}>
                            <h4 id="resPrice" style={{ marginLeft: "20px" }}></h4>
                        </Grid> */}

                        <Grid container rowSpacing={3}>
                            <h4 id="resGuestNum" style={{ marginLeft: "20px" }}></h4>
                        </Grid>

                        <Grid container rowSpacing={3}>
                            {/* <h4 style={{ marginLeft: "20px" }}>Will Arrive on: {formatDate(reservation.arrive)}</h4> */}
                            <h4 id="resArrive" style={{ marginLeft: "20px" }}>Arrival Date: </h4>
                        </Grid>

                        <Grid container rowSpacing={3}>
                            {/* <h4 style={{ marginLeft: "20px" }}>Will Depart on: {formatDate(reservation.depart)}</h4> */}
                            <h4 id="resDepart" style={{ marginLeft: "20px" }}>Departure Date: </h4>
                        </Grid>

                        <Grid container rowSpacing={3}>
                            <h4 id="resDays" style={{ marginLeft: "20px" }}>Nights: </h4>
                        </Grid>

                        <Grid container rowSpacing={3}>
                            <h4 id="resRequest" style={{ marginLeft: "20px" }}>Request(s): </h4>
                        </Grid>

                        <Grid container rowSpacing={3}>
                            <h3 style={{ marginLeft: "20px", color: "#1976d2" }}>Totals</h3>
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
    // }
}