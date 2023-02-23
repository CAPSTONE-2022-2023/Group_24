import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, Navigate, useLocation } from "react-router-dom";
import './home.css';
import suite from './images/suite.jpg';
import single from './images/single.jpg';
import double from './images/double.jpg';

const theme = createTheme({
    palette: {
        primary: {
            main: "#42daf5"
        }
    }
});

export default function Reservation_List() {
    const navigate = useNavigate();
    const handleClick = (event) => {
        event.preventDefault();
        localStorage.setItem("username", "");
        localStorage.setItem("password", "");
        navigate("/");
    };

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

    const reservationIdLocal = (id, requests) => {
        console.log("Local reservation Id: " + id);
        localStorage.setItem("localreservationId", id);
        localStorage.setItem("localreservationRequests", requests)
    }

    const [reservations, setReservations] = useState([{
        id: String,
        name: String,
        phone: String,
        guestNum: String,
        arrive: Date,
        depart: Date,
        roomName: String,
        requests: [string],
        price: Number
    }])

    useEffect(() => {
        fetch(ipAddress + "getAll/reservation").then(res => {
            if (res.ok) {
                return res.json()
            }
        }).then(jsonRes => setreservations(jsonRes));
    })

    return <ThemeProvider theme={theme}>
        <div class="body">
            <div class="gallery">
                <img src={single} class="img" alt="Single Bed" />
                <img src={double} class="img" alt="Double Bed" />
                <img src={suite} class="img" alt="Suite" />
            </div>

            <div style={{ marginBottom: "50px" }} class="nameMesg">

                <h1 style={{ textAlign: "center", fontFamily: "'Playfair Display',serif", marginTop: "50px" }}>Your Reservations</h1>
                
            </div>
            <div class="reservationlistTable">
                <table style={{ textAlign: "center", display: "flex", flexWrap: "wrap", marginBottom: "20px"}}>
                    {reservations.map(reservation =>
                        <a href='Insight' style={{paddingLeft: "10px", paddingRight: "10px"}} onClick={() => {
                            reservationIdLocal(reservation.id);
                          }}>
                            <div style={{ position: "relative", textAlign: "center"}}>
                                <div class="centered" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", color: "white", width: "80%", backgroundColor: "rgba(0, 0, 0, .4)", borderRadius: "25px" }}>
                                    <h1 style={{ fontFamily: "'Playfair Display',serif" }}>{reservation.name}</h1>

                                    <ol style={{ textAlign: "center", margin: "0 0 10px" }}>
                                        <li>{reservation.phone}</li>
                                        <li>{reservation.guestNum}</li>
                                        <li>{reservation.arrive}</li>
                                        <li>{reservation.depart}</li>
                                        <li>{reservation.roomName}</li>
                                        <li>{reservation.price}</li>
                                        <li>{reservation.requests}</li>
                                    </ol>
                                </div>
                            </div>
                        </a>
                    )}
                </table>
            </div>
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