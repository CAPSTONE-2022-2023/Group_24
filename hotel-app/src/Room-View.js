import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './home.css';

const theme = createTheme();

export default function Room_View() {
  const navigate = useNavigate();
  const handleClick = (event) => {
    event.preventDefault();
    localStorage.setItem("username", "");
    localStorage.setItem("password", "");
    navigate("/");
  };

  var ipAddress;

  if (process.env.REACT_APP_VERCEL_URL) {
    ipAddress = "https://capstone-group24-server.onrender.com/";
  }
  else {
    ipAddress = "http://localhost:3001/"
  }

  const deleteRoombyName = (room) => {
    console.log("Delete: " + room.name);

    axios.delete(ipAddress + "delete/room", { data: room });
  }

  const editRoombyName = (room) => {
    console.log("Edit: " + room.name);
    localStorage.setItem("roomName", room.name);
    localStorage.setItem("roomOverview", room.overview);
    localStorage.setItem("roomGuestNum", room.guestNum);
    localStorage.setItem("roomSize", room.size);
    localStorage.setItem("roomPrice", room.price);
    localStorage.setItem("roomBeds", room.beds);
    localStorage.setItem("roomEquips", JSON.stringify(room.equips));
    navigate('/room/edit');
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

  useEffect(() => {
    fetch(ipAddress + "getAll/room").then(res => {
      if (res.ok) {
        return res.json()
      }
    }).then(jsonRes => setRooms(jsonRes));
  })

  return <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="fs">
      <CssBaseline />
      <Box
        sx={{
          marginLeft: -3,
          marginRight: -3,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'rgb(175, 246, 239)'
        }}
      >
        <div class="navbar">
          <ul>
            <li><a href='/room/create'>Create Rooms</a></li>
          </ul>
        </div>

        <h1 style={{ textAlign: "center", color: "rgb(8, 102, 156)", backgroundColor: "primary" }}>List of All Current Rooms</h1>
        <Box display="inline-flex" justifyContent="center" flexDirection='row' backgroundColor='#rgb(175, 246, 239)' flexWrap='wrap' >
          {rooms.map(room =>
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
                  <h1 style={{ textAlign: "center" }}>{room.name}</h1>
                </Grid>

                <Grid container rowSpacing={3} justifyContent="center">
                  <p style={{ textAlign: "center" }}>{room.overview}</p>
                </Grid>

                <Grid container spacing={0}>
                  <h4 style={{ marginLeft: "20px" }}>Ideal For {room.guestNum} guests</h4>
                </Grid>

                <Grid container rowSpacing={3}>
                  <h4 style={{ marginLeft: "20px" }}>Approximately {room.guestNum} sq. ft</h4>
                </Grid>

                <Grid container rowSpacing={3}>
                  <h4 style={{ marginLeft: "20px" }}>Price starting at {room.price} CAD/night</h4>
                </Grid>

                <Grid container rowSpacing={3}>
                  <h4 style={{ marginLeft: "20px" }}>{room.beds} Bed(s)</h4>
                </Grid>

                <Grid container rowSpacing={3} sx={{ mb: -7 }}>
                  <h4 style={{ marginLeft: "20px" }}>The room is equipped with the following:</h4>
                </Grid>

                <Grid container spacing={3} direction={"column"} sx={{ mb: 5 }}>
                  {room.equips.map(equip =>
                    <Grid item sx={{ mb: -5 }}>
                      <p style={{ marginLeft: "40px" }}>- {equip}</p>
                    </Grid>
                  )}
                </Grid>

                <Grid container justifyContent="center">
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 6 }}
                    onClick={() => {
                      editRoombyName(room);
                    }}
                  >
                    Edit Room
                  </Button>
                  &nbsp;
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 6 }}
                    onClick={() => {
                      deleteRoombyName(room);
                    }}
                  >
                    Delete Room
                  </Button>
                </Grid>
              </Box>
              &nbsp;
            </div>
          )}
        </Box>
      </Box>
    </Container>
  </ThemeProvider>
}