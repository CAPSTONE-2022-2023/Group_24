import * as React from 'react';
import { MongoClient } from 'mongodb';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, Navigate, useLocation } from "react-router-dom";

const theme = createTheme({
    palette: {
        primary: {
            main: "#42daf5"
        }
    }
});

export default function Rooms() {
    const navigate = useNavigate();
    const handleClick = (event) => {
        event.preventDefault();
        localStorage.setItem("username", "");
        localStorage.setItem("password", "");
        navigate("/");
    };

    if (localStorage.getItem("username") === null || localStorage.getItem("username") === "") {
        return <Navigate to="/" />;
    }
    else {
        const client = new MongoClient("mongodb+srv://group24:Group24@group24.ieekutj.mongodb.net/hotel", { useUnifiedTopology: true });
        client.connect();

        const db = client.db("hotel");
        const collection = db.collection("rooms");
        const data = collection.find({}, { projection: { name: 1, overview: 1, guestNum: 1, size: 1, price: 1, beds: 1, equips: 1 } }).toArray();

        this.setState({ data });
        return (
            <ThemeProvider theme={theme}>
                <div>
                    <ul>
                        {this.state.data.map(item => (
                            <li key={item._id}>{item.name} {item.overview} {item.guestNum} {item.size} {item.price} {item.beds} {item.equips}</li>
                        ))}
                    </ul>
                </div>
                
            </ThemeProvider>
        );
    }
}
