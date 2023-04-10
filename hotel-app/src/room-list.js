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

export default function Room_List() {
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

    const roomNameLocal = (name, equips) => {
        console.log("Local Room Name: " + name);
        localStorage.setItem("localRoomName", name);
        localStorage.setItem("localRoomEquips", equips)
    }

    const [rooms, setRooms] = useState([{
        name: String,
        overview: String,
        guestNum: Number,
        size: Number,
        price: Number,
        beds: String,
        equips: [String]
    }])

    const [reservations, setReservations] = useState([{
        id: String,
        name: String,
        phone: String,
        guestNum: String,
        arrive: Date,
        depart: Date,
        roomName: String,
        requests: String,
        price: Number
    }])

    useEffect(() => {
        fetch(ipAddress + "getAll/room").then(res => {
            if (res.ok) {
                return res.json()
            }
        }).then(jsonRes => setRooms(jsonRes));
    })

    useEffect(() => {
        fetch(ipAddress + "getAll/reservation").then(res => {
            if (res.ok) {
                return res.json()
            }
        }).then(jsonRes => setReservations(jsonRes));
    })

    return <ThemeProvider theme={theme}>
        <div class="body">
            <div class="gallery">
                <img src={single} class="img" alt="Single Bed" />
                <img src={double} class="img" alt="Double Bed" />
                <img src={suite} class="img" alt="Suite" />
            </div>

            <div style={{ marginBottom: "50px" }} class="nameMesg">
                <h1 style={{ textAlign: "center", fontFamily: "'Playfair Display',serif", marginTop: "50px" }}>Our Signature Room Collection</h1>
                <p style={{ textAlign: "center", margin: "0 0 10px" }}>Enjoy our Signature or Signature Plus guestrooms that are elegantly decorated to complement the breathtaking views of the Toronto skyline or Lake Ontario, from the over-sized opening window, accentuated by 9’ high ceilings.</p>
                <div class="container" style={{ textAlign: "center", marginLeft: "550px", marginRight: "550px", marginTop: "25px" }}>
                    <a href='Reservations'>Book Now</a>
                </div>
            </div>
            <div class="roomlistTable">
                {/* revert back to non filter on later date */}
                <table style={{ textAlign: "center", display: "flex", flexWrap: "wrap", marginBottom: "20px", justifyContent: 'center', alignItems: 'center' }}>
                    {rooms.map(filteredRoom => <a href='Insight' style={{ paddingLeft: "10px", paddingRight: "10px" }} onClick={() => {
                        roomNameLocal(filteredRoom.name, filteredRoom.equips);
                    }}>
                        <div style={{ position: "relative", textAlign: "center" }}>
                            <img src={suite} class="img" alt="Suite" style={{ width: "100%" }} />
                            <div class="centered" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", color: "white", width: "80%", backgroundColor: "rgba(0, 0, 0, .4)", borderRadius: "25px" }}>
                                <h1 style={{ fontFamily: "'Playfair Display',serif" }}>{filteredRoom.name}</h1>
                                <p style={{ textAlign: "center", margin: "0 0 10px" }}>Ideal for up to {filteredRoom.guestNum} guest(s) with {filteredRoom.beds} beds - Approximately {filteredRoom.size} sq.ft</p>
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
