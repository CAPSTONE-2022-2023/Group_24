import React, {useEffect, useState} from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { borders } from '@mui/system';

const theme = createTheme();


export default function Room_View() {
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
        fetch("/room/getAll").then(res => {
            if(res.ok) {
                return res.json()
            }
        }).then(jsonRes => setRooms(jsonRes));
    })

    return <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
    <div className = "container">
        <h1>List of Available Rooms</h1>
        {rooms.map(room =>
        <div>
            <Box 
            sx={{
                backgroundColor: 'primary.light'
              }}
            border="3px solid black" color="white" style={{'postion':'relative'}}>
            <h1>{room.name}</h1>
            <h3>Name</h3><p>{room.overview}</p>
            <h3>Number of Guests</h3><p>{room.guestNum}</p>
            <h3>Size</h3><p>{room.size}</p>
            <h3>Price</h3><p>{room.price}</p>
            <h3>Number of Beds</h3><p>{room.beds}</p>
            <h2>Equipments</h2>
            {room.equips.map(equip =>
                <p>{equip}</p>
                )}
            <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 6 }}
              >
                Edit Room
              </Button>
              &nbsp;
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 6 }}
              >
                Delete Room
              </Button>
              </Box>
              &nbsp;
            </div>
            )}
    </div>
    </Box>
    </Container>
    </ThemeProvider>
}