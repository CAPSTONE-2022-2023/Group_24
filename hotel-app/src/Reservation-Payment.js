import { CardElement, AddressElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, Navigate } from "react-router-dom";
import Divider from '@mui/material/Divider';
import './home.css';
import { useState } from 'react';

const theme = createTheme();


export default function Reservation_Payment() {
    const navigate = useNavigate();
    const elements = useElements;
    const stripe = useStripe;
    const [cardNumber, setCardNumber] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [cvc, setCVC] = useState("");

    var ipAddress;

    if (process.env.REACT_APP_VERCEL_URL) {
        ipAddress = "https://capstone-group24-server.onrender.com/";
    }
    else {
        ipAddress = "http://localhost:3001/"
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
        
        try {
            const token = await stripe.tokens.create({
                card: {
                    number: cardNumber,
                    exp_month: month,
                    exp_year: year,
                    cvc: cvc,
                },
            });
            if (token) 
        {
            localStorage.setItem("paymentStatus", "Paid");
            alert(`Payment successfully received!`);
            navigate('/reservation/Client');
        }
        } catch (error) {
            alert(`The card information you have entered is invalid!`);
        } 
        
        
    }

    if (localStorage.getItem("username") === null || localStorage.getItem("username") === "") {
        return <Navigate to="/" />;
    }
    else {
        return <ThemeProvider theme={theme}>
            <div class="body">
                <div style={{ marginBottom: "50px" }} class="navbar">
                    <h1 id="nameMesg-h1" style={{ textAlign: "center", fontFamily: "'Playfair Display',serif" }}>Payment Information</h1>
                </div>

                <Box id="mainbox" backgroundColor='#rgb(175, 246, 239)'>
                    <div id="mainDiv" style={{ display: 'flex', justifyContent: "center", marginBottom: "50px" }}>
                        <Box width='400px'
                            sx={{
                                display: 'flex',
                                backgroundColor: '#c2e9fc',
                                alignItems: 'center',
                                flexDirection: 'column'
                            }}
                            border="3px solid rgb(8, 102, 156)" color="black">

                            <Divider style={{ width: '40%', color: "#1976d2" }} />

                            <Grid container rowSpacing={2}>
                                <h2 style={{ marginLeft: "20px", color: "#1976d2" }}>Customer Details</h2>
                            </Grid>

                            <Grid container display="grid" alignContent="center" gridAutoFlow="column" width="80%">
                                <AddressElement id="address-element" options={{
                                    mode: "billing"
                                }} />
                            </Grid>

                            <Divider style={{ width: '40%', color: "#1976d2" }} />

                            <Grid container rowSpacing={2}>
                                <h2 style={{ marginLeft: "20px", color: "#1976d2" }}>Total</h2>
                            </Grid>

                            <Grid container display="grid" alignContent="center" gridAutoFlow="column" width="50%">

                                <div className="checkout-form">
                                    <p>Amount: ${localStorage.getItem("grandTotal")}</p>
                                    <form id="payment-form" onSubmit={handleSubmit}>
                                    <label>Card Number:
                                            <input
                                                type="text" 
                                                value={cardNumber}
                                                onChange={(e) => setCardNumber(e.target.value)}
                                            />
                                            </label>
                                            <label>Expiry Month:
                                            <input
                                                type="text" 
                                                value={month}
                                                onChange={(e) => setMonth(e.target.value)}
                                            />
                                            </label>
                                            <label>Expiry Year:
                                            <input
                                                type="text" 
                                                value={year}
                                                onChange={(e) => setYear(e.target.value)}
                                            />
                                            </label>
                                            <label>CVC:
                                            <input
                                                type="text" 
                                                value={cvc}
                                                onChange={(e) => setCVC(e.target.value)}
                                            />
                                            </label>
                                        <Button type="submit" className="order-button">
                                            Pay
                                        </Button>
                                    </form>
                                </div>

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
}