import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, Navigate } from "react-router-dom";
import './home.css';
import axios from "axios";

const theme = createTheme();

function formatDate(string) {
    var options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
    return new Date(string).toLocaleDateString([], options);
}

export default function Reservation_List() {
    const navigate = useNavigate();

    var ipAddress;

    if (process.env.REACT_APP_VERCEL_URL) {
        ipAddress = "https://capstone-group24-server.onrender.com/";
    }
    else {
        ipAddress = "http://localhost:3001/"
    }

    const [reservations, setReservations] = useState([{
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
        fetch(ipAddress + "getAll/room").then(res => {
            if (res.ok) {
                return res.json()
            }
        }).then(jsonRes => setRooms(jsonRes));
    })

    function getRoomIndex(roomName) {
        let roomIndex = -1;
        rooms.forEach((room, index) => {
            if (room.name === roomName) {
                roomIndex = index
            }
        })
        console.log("roomIndex = " + roomIndex);
        return roomIndex;
    }

    const editResbyId = (res) => {
        console.log("resId: " + res.id);
        localStorage.setItem("resId", res.id);
        localStorage.setItem("roomIndex", getRoomIndex(res.roomName));
        localStorage.setItem("arriveDate", res.arrive);
        localStorage.setItem("departDate", res.depart);
        localStorage.setItem("guestNum", res.guestNum);
        navigate('/reservation/edit');
    }

    const deleteResbyId = (res) => {
        console.log("Cancel reservation id: " + res.id);
        axios.delete(ipAddress + "delete/reservation", { data: res });
    }

    useEffect(() => {
        fetch(ipAddress + "getAll/reservation").then(res => {
            if (res.ok) {
                return res.json()
            }
        }).then(jsonRes => setReservations(jsonRes));
    })
    
    if (localStorage.getItem("username") === null || localStorage.getItem("username") === "") {
        return <Navigate to="/" />;
    }
    else {
        return <ThemeProvider theme={theme}>
            <div class="body">
                <div class="navbar">
                    <ul>
                        <li><a href='/reservation/create/employee'>Book Reservation for Guests</a></li>
                    </ul>
                </div>

                <div style={{ marginBottom: "50px" }} class="nameMesg">
                    <h1 style={{ textAlign: "center", fontFamily: "'Playfair Display',serif" }}>List of All Current Reservations</h1>
                </div>
                <Box display="inline-flex" justifyContent="center" flexDirection='row' backgroundColor='#rgb(175, 246, 239)' flexWrap='wrap' >
                    {reservations.map(reservation =>
                        <div>
                            <Box flexDirection='row' width='350px' height='500px' overflow='auto'
                                sx={{
                                    backgroundColor: 'primary.light',
                                    flexWrap: 'wrap',
                                    m: 1,
                                    ml: 4
                                }}
                                border="3px solid rgb(8, 102, 156)" color="white">
                                <Grid container spacing={0} justifyContent="center">
                                    <h1 style={{ textAlign: "center" }}>{reservation.name}</h1>
                                </Grid>

                                <Grid container rowSpacing={3}>
                                    <h4 style={{ marginLeft: "20px" }}>Phone Number: {reservation.phone}</h4>
                                </Grid>

                                <Grid container rowSpacing={3}>
                                    <h4 style={{ marginLeft: "20px" }}>Email: {reservation.email}</h4>
                                </Grid>

                                <Grid container rowSpacing={3}>
                                    <h4 style={{ marginLeft: "20px" }}>Name of Room: {reservation.roomName}</h4>
                                </Grid>

                                <Grid container rowSpacing={3}>
                                    <h4 style={{ marginLeft: "20px" }}>Price of Room: ${reservation.price}</h4>
                                </Grid>

                                <Grid container rowSpacing={3}>
                                    <h4 style={{ marginLeft: "20px" }}>Number of Guest(s): {reservation.guestNum}</h4>
                                </Grid>

                                <Grid container rowSpacing={3}>
                                    <h4 style={{ marginLeft: "20px" }}>Will Arrive on: {formatDate(reservation.arrive)}</h4>
                                </Grid>

                                <Grid container rowSpacing={3}>
                                    <h4 style={{ marginLeft: "20px" }}>Will Depart on: {formatDate(reservation.depart)}</h4>
                                </Grid>

                                <Grid container rowSpacing={3}>
                                    <h4 style={{ marginLeft: "20px" }}>Request(s): {reservation.requests}</h4>
                                </Grid>

                                <Grid container justifyContent="center">
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{ mt: 1, mb: 1 }}
                                        onClick={() => {
                                            editResbyId(reservation);
                                        }}
                                    >
                                        Edit Reservation
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{ mt: 1, mb: 1 }}
                                        onClick={() => {
                                            // delete function
                                            deleteResbyId(reservation);
                                        }}
                                    >
                                        Delete Reservation
                                    </Button>
                                </Grid>
                            </Box>
                            &nbsp;
                        </div>
                    )}
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
}