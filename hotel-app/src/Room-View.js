import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
import './home.css';

const theme = createTheme();

export default function Room_View() {
  const navigate = useNavigate();

  var ipAddress;

  if (process.env.REACT_APP_VERCEL_URL) {
    ipAddress = "https://capstone-group24-server.onrender.com/";
  }
  else {
    ipAddress = "http://localhost:3001/"
  }

  const deleteRoombyName = (room) => {
    

    axios.delete(ipAddress + "delete/room", { data: room });
  }

  const editRoombyName = (room) => {
    
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
    fetch(ipAddress + "getAll/reservation").then(res => {
      if (res.ok) {
        return res.json()
      }
    }).then(jsonRes => setReservations(jsonRes));
  })
  /*
  function getrooms(date){
    let rooms = {};
    for(var i=0;i<reservations.length();i++){
      if(date === reservations[i].arrive){
        rooms.push(reservations[i].roomName)
      }
    }
    return rooms.map(room => <Grid><li><h4>room</h4></li></Grid>) 
  }
  */
  function formatDate(string) {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(string).toLocaleDateString([], options);
  }

  if (localStorage.getItem("username") === null || localStorage.getItem("username") === "") {
    return <Navigate to="/" />;
  }
  else {
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

          <h1 style={{ textAlign: "center", color: "rgb(8, 102, 156)", backgroundColor: "primary" }}>List of All Booked Rooms</h1>
          <table>
            {reservations.map(reservation =>
              <Box display="inline-flex" justifyContent="center" flexDirection='row' backgroundColor='#rgb(175, 246, 239)' flexWrap='wrap' >

                <Box flexDirection='row' width='auto' height='auto' overflow='auto'
                  sx={{
                    backgroundColor: 'primary.light',
                    flexWrap: 'wrap',
                    m: 1,
                    ml: 4
                  }}
                  border="3px solid rgb(8, 102, 156)" color="white">
                  <tr>
                    <td><h2>{formatDate(reservation.arrive)}</h2></td>
                  </tr>

                  <tr><h2>{reservation.roomName}</h2></tr>

                </Box>
              </Box>
            )}
          </table>
        </Box>
      </Container>
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
    </ThemeProvider>
  }
}