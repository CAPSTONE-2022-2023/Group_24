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

export default function Room() {
    const navigate = useNavigate();
    const handleClick = (event) => {
        event.preventDefault();
        localStorage.setItem("username", "");
        localStorage.setItem("password", "");
        navigate("/");
    };

    var roomName = localStorage.getItem("localRoomName");
    var roomEquips = localStorage.getItem("localRoomEquips").split(",");
    console.log("Room:" + roomName);


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

    const [room, setRoom] = useState([{
        name: String,
        overview: String,
        guestNum: Number,
        size: Number,
        price: Number,
        beds: String,
        equips: [String]
    }])

    useEffect(() => {
        fetch(ipAddress + "get/room/" + roomName).then(res => {
            if (res.ok) {
                return res.json()
            }
        }).then(jsonRes => setRoom(jsonRes));
    })

    return <ThemeProvider theme={theme}>
        <div class="body">
            <div class="header">
                Seneca Hotels
            </div>
            <div class="navbar" style={{ textAlign: "center" }}>
                <ul>
                    <li><a href='/homepage/customer'>Homepage</a></li>
                    <li><a href='Reservations'>Reservations</a></li>
                    <li><a href='List'>View Room List</a></li>
                    <li><a href='' onClick={handleClick}>Logout</a></li>
                </ul>
            </div>
            <div class="gallery">
                <img src={single} class="img" alt="Single Bed" />
                <img src={double} class="img" alt="Double Bed" />
                <img src={suite} class="img" alt="Suite" />
            </div>

            <div style={{ marginBottom: "50px" }} class="nameMesg">
                <h1 style={{ textAlign: "center", fontFamily: "'Playfair Display',serif", marginTop: "50px" }}>{room.name}</h1>
                <p style={{ textAlign: "center", margin: "20px 20px 10px"}}>{room.overview}</p>
                <div class="container" style={{ textAlign: "center", marginLeft: "550px", marginRight: "550px", marginTop: "25px" }}>
                    <a href='Reservations'>Book Now</a>
                </div>
            </div>

            <div class="main" style={{ backgroundColor: "rgba(0, 0, 0, .1)" }}>
                <div class="left" style={{ width: "50%", backgroundColor: "rgba(0, 128, 255, .1)", borderRadius: "25px" }}>
                    <h2 style={{ textAlign: "center", fontFamily: "'Playfair Display',serif", marginBottom: "0px" }}>Room Detail</h2>
                    <p style={{ textAlign: "center", fontFamily: "'Playfair Display',serif", padding: "0px"}}>Ideal up to {room.guestNum} guest(s)</p>
                    <p style={{ textAlign: "center", fontFamily: "'Playfair Display',serif", padding: "0px"}}>Approximately {room.size} sq ft</p>
                    <p style={{ textAlign: "center", fontFamily: "'Playfair Display',serif", padding: "0px"}}>{room.beds} Bed(s)</p>
                    <p style={{ textAlign: "center", fontFamily: "'Playfair Display',serif", padding: "0px"}}>${room.price}/night</p>
                </div>
                <div class="right" style={{ width: "100%" }}>
                    <h2 style={{ textAlign: "center", fontFamily: "'Playfair Display',serif", marginBottom: "0px" }}>Downtown Toronto's Most Luxurious Accommodations</h2>
                    <p>All rooms are equipped with the following:</p>
                    <ul style={{ marginTop: "-10px", marginLeft: "10px", listStyleType: "square", fontSize: "20px" }}>

                        {roomEquips.map(equip => {
                            return <li style={{ marginTop: "5px" }}>{equip}</li>;
                        })}
                    </ul>
                </div>
            </div>

            <div class="gallery" style={{padding: "0px", margin: "0px"}}>
                <img src={suite} class="img" alt="Suite" style={{padding: "0px", margin: "0px"}} />
                <img src={suite} class="img" alt="Suite" style={{padding: "0px", margin: "0px"}} />
                <img src={suite} class="img" alt="Suite" style={{padding: "0px", margin: "0px"}} />
            </div>

            <div class="footer" style={{marginTop: "-5px"}}>
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
