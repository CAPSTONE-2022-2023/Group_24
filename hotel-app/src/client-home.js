import * as React from 'react';
import './home.css';
import suite from './images/suite.jpg';
import single from './images/single.jpg';
import double from './images/double.jpg';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, Navigate, useLocation } from "react-router-dom";


const theme = createTheme({
    palette: {
        primary: {
            main: "#42daf5"
        }
    }
});

export default function CHome() {
    const navigate = useNavigate();
    const handleClick = (event) => {
        event.preventDefault();
        localStorage.setItem("username", "");
        localStorage.setItem("password", "");
        navigate("/");
    };

    const location = useLocation();


    if (localStorage.getItem("username") === null || localStorage.getItem("username") === "") {
        return <Navigate to="/" />;
    }
    else {
        return (
            <ThemeProvider theme={theme}>
                <div class="body">
                    <div class="header">
                        Seneca Hotels
                    </div>
                    <div class="navbar" style={{textAlign: "center"}}>
                        <ul>
                            <li><a href='Reservations'>Reservations</a></li>
                            <li><a href='editreservations'>Edit Reservations</a></li>
                            <li><a href='rooms'>View Room List</a></li>
                            <li><a href='vacantrooms'>Vacant Rooms</a></li>
                            <li><a href='' onClick={handleClick}>Logout</a></li>
                        </ul>
                    </div>
                    <div class="gallery">
                        <img src={single} class="img" alt="Single Bed" />
                        <img src={double} class="img" alt="Double Bed" />
                        <img src={suite} class="img" alt="Suite" />
                    </div>
                    <div class="main">
                        <div class="left">
                            Hello {localStorage.getItem("username")}
                            <p>
                                Seneca group of hotels provide exclusive rooms with amazing views with affordable prices.
                            </p>
                            <a href='Reservations'>Book Now</a>
                        </div>
                        <div class="right">
                            <h3>Basic Rates</h3>
                            <table>
                                <tr>
                                    <td>1 bed</td>
                                    <td>$79.99</td>
                                </tr>
                                <tr>
                                    <td>2 bed</td>
                                    <td>$99.99</td>
                                </tr>
                                <tr>
                                    <td>Suite</td>
                                    <td>$129.99</td>
                                </tr>
                            </table>
                            <a href='vacantrooms'>View Rooms</a>
                        </div>
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
        );
    }
}
