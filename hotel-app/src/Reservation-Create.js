import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
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

export default function Reservation_Create() {
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const requests = [];
    for (let i = 1; i < 11; i++) {
      if (data.get(`requests${i}`) != "") {
        requests.push(data.get(`requests${i}`).trim())
      }
    }

    function getRandomInt() {
        return Math.floor(Math.random() * 1000);
    }

    function getPrice(roomName) {
        /*
        get price according to the room selected and multiply it with the nights staying. result should be the price charged to customer
        */
    }

    console.log({
        id:getRandomInt(),
        name: data.get('name'),
        phone: data.get('phone'),
        guestNum: data.get('guestNum'),
        arrive: data.get('arrive'),
        depart: data.get('depart'),
        price: getPrice(roomName),
        roomName: data.get('roomName'),
        requests: requests
    });

    const newReservation = {
        id:getRandomInt(),
        name: data.get('name'),
        phone: data.get('phone'),
        guestNum: data.get('guestNum'),
        arrive: data.get('arrive'),
        depart: data.get('depart'),
        price: getPrice(roomName),
        roomName: data.get('roomName'),
        requests: requests
    }

    var ipAddress;

    if (process.env.REACT_APP_VERCEL_URL) {
      ipAddress = "https://capstone-group24-server.onrender.com/";
    }
    else {
      ipAddress = "http://localhost:3001/"
    }

    axios.post(ipAddress + "create/reservation", newReservation);
    alert(`Reservations ${data.get("id")} successful`);
    navigate('/reservations');
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
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
            <Grid container spacing={0} justifyContent="center">
              <Grid item xs={3} >
                <h5>Name:</h5>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                />
              </Grid>
            </Grid>

            <Grid container spacing={0} justifyContent="center" sx={{ mt: 1 }}>
              <Grid item xs={3} >
                <h5>Phone:</h5>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  required
                  fullWidth
                  multiline
                  minRows={3}
                  id="phone"
                  name="phone"
                  autoComplete="phone"
                />
              </Grid>
            </Grid>

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
                <TextField
                  required
                  sx={{ width: 80 }}
                  defaultValue={0}
                  InputProps={{ inputProps: { min: 1 } }}
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
                  sx={{ width: 80 }}
                  defaultValue={0}
                  InputProps={{ inputProps: { min: 1 } }}
                  type="date"
                  id="depart"
                  name="depart"
                  autoComplete="depart"
                />
              </Grid>
            </Grid>


            <Grid container spacing={1} justifyContent="center" sx={{ mt: 0 }}>
              <Grid item>
                <h5>Room Name:</h5>
              </Grid>
              <Grid item>
                Import room names from DB and show here.
              </Grid>
              
            </Grid>

            <Grid container spacing={1} justifyContent="center" sx={{ mt: 1 }}>
              <Grid container direction="column" justifyContent="space-evenly" alignItems="center">
                <h5>Requests:</h5>
              </Grid>
              <Grid id="request_grid" container rowGap={2} direction="column" justifyContent="space-evenly" alignItems="center">
                <TextField
                  required
                  sx={{ width: 350 }}
                  id="requests"
                  name="requests"
                />
              </Grid>
            </Grid>

          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
//}