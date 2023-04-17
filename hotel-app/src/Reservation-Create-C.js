import React, { useEffect, useState, useRef } from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, Navigate } from "react-router-dom";

import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import axios from "axios";

const theme = createTheme({
  palette: {
    background: {
      default: "#42daf5"
    }
  }
});

export default function Reservation_Create_C() {
  const navigate = useNavigate();

  var currentRoomIndex = useRef(-1);
  var blackoutDates = useRef();

  var ipAddress;

  if (process.env.REACT_APP_VERCEL_URL) {
    ipAddress = "https://capstone-group24-server.onrender.com/";
  }
  else {
    ipAddress = "http://localhost:3001/"
  }

  var [rooms, setRooms] = useState([{
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
    fetch(ipAddress + "getAll/reservation").then(res => {
      if (res.ok) {
        return res.json()
      }
    }).then(jsonRes => setReservations(jsonRes));

    fetch(ipAddress + "getAll/room").then(res => {
      if (res.ok) {
        return res.json()
      }
    }).then(jsonRes => setRooms(jsonRes));
  })

  const shouldDisableDate = (date) => {
    if (blackoutDates.current !== undefined) {
      return blackoutDates.current.includes(date.toISOString().split('T')[0]);
    }
  }

  const handleChangeRoom = (event) => {
    console.log("HandleChangeRoom");
    event.preventDefault();
    currentRoomIndex.current = event.target.value;
    console.log("Room index = " + currentRoomIndex.current);

    blackoutDates.current = [];

    reservations.map(reservation => {
      if (reservation.roomName == rooms[currentRoomIndex.current].name) {
        console.log(reservation.roomName);
        console.log(rooms[currentRoomIndex.current].name)
        console.log(reservation.arrive);
        console.log(reservation.depart);
        var arriveDate = new Date(reservation.arrive);
        blackoutDates.current.push(arriveDate.toLocaleDateString("fr-CA", { timeZone: 'UTC' }));
        var departDate = new Date(reservation.depart);
        blackoutDates.current.push(departDate.toLocaleDateString("fr-CA", { timeZone: 'UTC' }));
      }
    })

    handleChangeUpdatePrice();
  }

  function handleChangeUpdatePrice() {
    console.log("HANDLE_CHANGE_UPDATE_PRICE");

    let roomIndex = currentRoomIndex.current.valueOf();
    console.log("roomIndex = " + roomIndex);

    let price = 0;

    let dateArrive;
    let dateDepart;

    if (process.env.REACT_APP_VERCEL_URL) {
      dateArrive = new Date(document.getElementById(":r2:").value);
      dateDepart = new Date(document.getElementById(":r4:").value);
    }
    else {
      dateArrive = new Date(document.getElementById(":r5:").value);
      dateDepart = new Date(document.getElementById(":r9:").value);
    }

    let Difference_In_Time = dateDepart.getTime() - dateArrive.getTime();

    let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    console.log("Diff Days: " + Difference_In_Days);

    if (Difference_In_Days === 0) {
      Difference_In_Days = 1;
    }

    console.log("Curren room index = " + roomIndex);

    if (roomIndex >= 0) {
      price = rooms[roomIndex].price * Difference_In_Days;

      console.log(rooms[roomIndex].price + "*" + Difference_In_Days);

      price = parseFloat(Number(price)).toFixed(2)

      console.log(price);

      document.getElementById("grand_total").innerHTML = `$${price}`;
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    function getRandomInt() {
      return Math.floor(Math.random() * 1000);
    }

    function getPrice(roomIndex) {
      /*
      get price according to the room selected and multiply it with the nights staying. result should be the price charged to customer
      */
      let dateArrive;
      let dateDepart;

      if (process.env.REACT_APP_VERCEL_URL) {
        dateArrive = new Date(document.getElementById(":r2:").value);
        dateDepart = new Date(document.getElementById(":r4:").value);
      }
      else {
        dateArrive = new Date(document.getElementById(":r5:").value);
        dateDepart = new Date(document.getElementById(":r9:").value);
      }

      let Difference_In_Time = dateDepart.getTime() - dateArrive.getTime();

      let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

      console.log(Difference_In_Days);

      let price = rooms[roomIndex].price * Difference_In_Days;

      console.log(price);

      return price;
    }

    const newReservation = {
      id: getRandomInt(),
      name: data.get('name'),
      phone: data.get('phone'),
      email: data.get('email'),
      guestNum: data.get('guestNum'),
      arrive: document.getElementById(":r5:").value,
      depart: document.getElementById(":r9:").value,
      price: parseFloat(Number(getPrice(data.get('roomName')))).toFixed(2),
      roomName: rooms[data.get('roomName')].name,
      requests: data.get('requests')
    }

    if (process.env.REACT_APP_VERCEL_URL) {
      newReservation.arrive = document.getElementById(":r2:").value;
      newReservation.depart = document.getElementById(":r4:").value;
    }
    else{
      newReservation.arrive = document.getElementById(":r5:").value;
      newReservation.depart = document.getElementById(":r9:").value;
    }

    axios.post(ipAddress + "create/reservation", newReservation);
    alert(`Reservation ${newReservation.id} create successful`);
    if (newReservation.email) {
      axios.post(ipAddress + "post/sendCreateEmail", newReservation);
    }
    localStorage.setItem("paymentStatus", "UnPaid");
    navigate('/reservation/billing');
  };

  if (localStorage.getItem("username") === null || localStorage.getItem("username") === "") {
    return <Navigate to="/" />;
  }
  else {
    return (
      <ThemeProvider theme={theme}>
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
            <Typography component="h1" variant="h5">
              Create Reservation
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, width: 500 }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3 }}
              >
                Create Reservation
              </Button>
              <Grid container spacing={2} justifyContent="center" sx={{ mb: 3 }}>
                <Grid item>
                  <h3>Grand Total: </h3>
                </Grid>
                <Grid item>
                  <h3 id="grand_total">$0</h3>
                </Grid>
              </Grid>

              <Grid container spacing={2} justifyContent="center">
                <FormControl fullWidth>
                  <InputLabel id="title-select-roomName">Select Room</InputLabel>
                  <Select
                    name='roomName'
                    id="roomName-select"
                    label="Room"
                    onChange={handleChangeRoom}
                  >
                    {rooms.map((room, index) =>
                      <MenuItem value={index}>{room.name} - ${room.price}/night</MenuItem>
                    )}
                  </Select>
                </FormControl>

                <Grid container spacing={1} justifyContent="center" sx={{ mt: 1 }}>
                  <Grid item>
                    <h5>Number of Guests </h5>
                  </Grid>
                  <Grid item>
                    <TextField
                      required
                      sx={{ width: 75 }}
                      defaultValue={1}
                      InputProps={{ inputProps: { min: 1, max: 10 } }}
                      type="number"
                      id="guestNum"
                      name="guestNum"
                      autoComplete="guestNum"
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={1} justifyContent="center" sx={{ mt: 0 }}>
                  <Grid item>
                    <h5>Date of Arrival:</h5>
                  </Grid>
                  <Grid item>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Arrival Date"
                        defaultValue={dayjs()}
                        required
                        disablePast
                        className="arrive"
                        format="YYYY-MM-DD"
                        shouldDisableDate={shouldDisableDate}
                        onChange={() => handleChangeUpdatePrice()}
                      />
                    </LocalizationProvider>
                  </Grid>
                </Grid>

                <Grid container spacing={1} justifyContent="center" sx={{ mt: 0 }}>
                  <Grid item>
                    <h5>Date of Departure:</h5>
                  </Grid>
                  <Grid item>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Departure Date"
                        defaultValue={dayjs()}
                        required
                        disablePast
                        className="depart"
                        format="YYYY-MM-DD"
                        shouldDisableDate={shouldDisableDate}
                        onChange={() => handleChangeUpdatePrice()}
                      />
                    </LocalizationProvider>
                  </Grid>
                </Grid>

                <Grid item xs={12} >
                  <h3><b>GUEST DETAILS: </b></h3>
                </Grid>

                <Grid item xs={3} >
                  <h5>Full Name:</h5>
                </Grid>
                <Grid item xs={9}>
                  <TextField
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    InputProps={{
                      readOnly: true,
                    }}
                    defaultValue={localStorage.getItem("clientName")}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={0} justifyContent="center" sx={{ mt: 1 }}>
                <Grid item xs={3}>
                  <h5>Phone:</h5>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    id="phone"
                    label="Phone"
                    name="phone"
                    autoComplete="phone"
                  />
                </Grid>
              </Grid>

              <Grid container spacing={0} justifyContent="center" sx={{ mt: 1 }}>
                <Grid item xs={3}>
                  <h5>Email:</h5>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
              </Grid>

              <Grid container spacing={1} justifyContent="center" sx={{ mt: 1, mb: 4 }}>
                <Grid container direction="column" justifyContent="space-evenly" alignItems="center">
                  <h5>Additional Room Requests:</h5>
                </Grid>
                <Grid id="request_grid" container rowGap={2} direction="column" justifyContent="space-evenly" alignItems="center">
                  <TextField
                    required
                    sx={{ width: 450 }}
                    id="requests"
                    name="requests"
                    multiline
                    minRows={3}
                    label="Room Requests"
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }
}