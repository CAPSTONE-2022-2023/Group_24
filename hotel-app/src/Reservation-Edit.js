import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const theme = createTheme({
  palette: {
    background: {
      default: "#42daf5"
    }
  }
});

export default function Reservation_Edit() {
  const navigate = useNavigate();

  // SELECTED RESERVATION DATA
  var resId = localStorage.getItem("resId");

  var ipAddress;

  if (process.env.REACT_APP_VERCEL_URL) {
    ipAddress = "https://capstone-group24-server.onrender.com/";
  }
  else {
    ipAddress = "http://localhost:3001/"
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

  console.log(rooms);

  const [reservation, setReservation] = useState([{
    id: String,
    name: String,
    phone: String,
    email: String,
    guestNum: String,
    arrive: Date,
    depart: Date,
    roomName: String,
    requests: String,
    price: Number
  }])

  useEffect(() => {
    fetch(ipAddress + "get/reservation/" + resId).then(res => {
      if (res.ok) {
        return res.json()
      }
    }).then(jsonRes => setRoom(jsonRes));
  })

  console.log(reservation);

  var arriveDate = new Date(reservation.arrive);
  var arriveDateString = arriveDate.toISOString().slice(0, 10);
  var departDate = new Date(reservation.arrive);
  var departDateString = departDate.toISOString().slice(0, 10);

  var currentDate = new Date();
  var currentDateString = currentDate.toISOString().slice(0, 10);
  var previousDate = new Date();
  previousDate.setDate(currentDate.getDate() - 1);
  var previousDateString = previousDate.toISOString().slice(0, 10);
  var nextDate = new Date();
  nextDate.setDate(currentDate.getDate() + 1);
  var nextDateString = nextDate.toISOString().slice(0, 10);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // const requests = [];
    // for (let i = 1; i < 11; i++) {
    //   if (data.get(`requests${i}`) != "") {
    //     requests.push(data.get(`requests${i}`).trim())
    //   }
    // }

    function getRandomInt() {
      return Math.floor(Math.random() * 1000);
    }

    function getPrice(roomIndex) {
      /*
      get price according to the room selected and multiply it with the nights staying. result should be the price charged to customer
      */
      let dateArrive = new Date(data.get('arrive'));
      let dateDepart = new Date(data.get('depart'));

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
      arrive: data.get('arrive'),
      depart: data.get('depart'),
      price: getPrice(data.get('roomName')),
      roomName: data.get('roomName'),
      requests: data.get('requests')
    }

    console.log(newReservation);

    axios.post(ipAddress + "create/reservation", newReservation);
    alert(`Reservation ${newReservation.id} successful`);
    navigate('/reservation/list');
  };

  // };
  // if (localStorage.getItem("username") === null || localStorage.getItem("username") === "") {
  //   return <Navigate to="/" />;
  // }
  // else {
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
              sx={{ mt: 3, mb: 6 }}
            >
              Create Reservation
            </Button>
            <Grid container spacing={2} justifyContent="center">
              <FormControl fullWidth>
                <InputLabel id="title-select-roomName">Select Room</InputLabel>
                <Select
                  name='roomName'
                  id="roomName-select"
                  label="Room"
                //Find a way to set defaultvalue to room index
                >
                  {rooms.map((room, index) =>
                    <MenuItem value={index}>{room.name}</MenuItem>
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
                    defaultValue={reservation.guestNum}
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
                  <TextField
                    required
                    sx={{ width: 160 }}
                    defaultValue={arriveDateString}
                    InputProps={{ inputProps: { min: previousDateString } }}
                    type="date"
                    id="arrive"
                    name="arrive"
                    autoComplete="arrive"
                  />
                </Grid>
              </Grid>

              <Grid container spacing={1} justifyContent="center" sx={{ mt: 0 }}>
                <Grid item>
                  <h5>Date of Departure:</h5>
                </Grid>
                <Grid item>
                  <TextField
                    required
                    sx={{ width: 160 }}
                    defaultValue={departDateString}
                    InputProps={{ inputProps: { min: previousDateString } }}
                    type="date"
                    id="depart"
                    name="depart"
                    autoComplete="depart"
                  />
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
                  autoComplete="name"
                  defaultValue = {reservation.name}
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
                  defaultValue={reservation.phone}
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
                  defaultValue={reservation.email}
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
                  defaultValue={reservation.requests}
                />
              </Grid>
            </Grid>

            <Grid container spacing={0} justifyContent="center">
              <Grid item xs={3}>
                <h3>Grand Total: </h3>
              </Grid>
              <Grid item xs={3}>
                <h3 id="grand_total">0$</h3>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
//}