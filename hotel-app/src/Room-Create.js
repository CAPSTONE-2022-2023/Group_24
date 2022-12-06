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
import axios from "axios";

const theme = createTheme();

export default function Room_Create() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const equipments = [];
    for (let i = 1; i < 11; i++) {
      if (data.get(`equip${i}`) != "") {
        equipments.push(data.get(`equip${i}`).trim())
      }
    }

    console.log({
      name: data.get('name'),
      overview: data.get('overview').trim(),
      guestNum: data.get('guestNum'),
      size: data.get('size'),
      price: parseFloat(Number(data.get('price'))).toFixed(2),
      beds: data.get('bedNum') + " " + data.get('bedType'),
      equips: equipments
    });

    const newRoom = {
      name: data.get('name'),
      overview: data.get('overview').trim(),
      guestNum: data.get('guestNum'),
      size: data.get('size'),
      price: parseFloat(Number(data.get('price'))).toFixed(2),
      beds: data.get('bedNum') + " " + data.get('bedType'),
      equips: equipments
    }

    axios.post("http://localhost:3001/room/create", newRoom);
    alert(`Room ${data.get("name")} successful`);
    navigate('/room/view');
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
              Create Hotel Room
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, width: 500 }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 6 }}
              >
                Create Room
              </Button>
              <Grid container spacing={0} justifyContent="center">
                <Grid item xs={3} >
                  <h5>Room Name:</h5>
                </Grid>
                <Grid item xs={9}>
                  <TextField
                    required
                    fullWidth
                    id="name"
                    label="Room Name"
                    name="name"
                    autoComplete="name"
                  />
                </Grid>
              </Grid>

              <Grid container spacing={0} justifyContent="center" sx={{ mt: 1 }}>
                <Grid item xs={3} >
                  <h5>Room Overview:</h5>
                </Grid>
                <Grid item xs={9}>
                  <TextField
                    required
                    fullWidth
                    multiline
                    minRows={3}
                    id="overview"
                    name="overview"
                    autoComplete="overview"
                  />
                </Grid>
              </Grid>

              <Grid container spacing={1} justifyContent="center" sx={{ mt: 1 }}>
                <Grid item>
                  <h5>Number of Guest Recommend:</h5>
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
                  <h5>Size of Room:</h5>
                </Grid>
                <Grid item>
                  <TextField
                    required
                    sx={{ width: 80 }}
                    defaultValue={0}
                    InputProps={{ inputProps: { min: 1 } }}
                    type="number"
                    id="size"
                    name="size"
                    autoComplete="size"
                  />
                </Grid>
                <Grid item>
                  <h5>sq. ft</h5>
                </Grid>
              </Grid>

              <Grid container spacing={1} justifyContent="center" sx={{ mt: 0 }}>
                <Grid item>
                  <h5>Room Price:</h5>
                </Grid>
                <Grid item>
                  <TextField
                    required
                    sx={{ width: 80 }}
                    defaultValue={parseFloat(0).toFixed(2)}
                    InputProps={{ inputProps: { min: 0 } }}
                    id="price"
                    name="price"
                    autoComplete="price"
                  />
                </Grid>
                <Grid item>
                  <h5>CAD/night</h5>
                </Grid>
              </Grid>

              <Grid container spacing={1} justifyContent="center" sx={{ mt: 0 }}>
                <Grid item>
                  <h5>Bed(s):</h5>
                </Grid>
                <Grid item>
                  <TextField
                    required
                    sx={{ width: 75 }}
                    defaultValue={1}
                    InputProps={{ inputProps: { min: 1, max: 10 } }}
                    type="number"
                    id="bedNum"
                    name="bedNum"
                    autoComplete="bedNum"
                  />
                </Grid>
                <Grid item>
                  <FormControl fullWidth>
                    <InputLabel id="bedType-select-label">Bed Type</InputLabel>
                    <Select
                      required
                      sx={{ width: 160 }}
                      name='bedType'
                      labelId="bedType-select-label"
                      id="bedType-select"
                      label="Bed Type"
                      defaultValue={"Single"}
                    >
                      <MenuItem value={"Single"}>Single</MenuItem>
                      <MenuItem value={"Double"}>Double</MenuItem>
                      <MenuItem value={"Queen"}>Queen</MenuItem>
                      <MenuItem value={"King"}>King</MenuItem>
                      <MenuItem value={"California King"}>California King</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container spacing={1} justifyContent="center" sx={{ mt: 1 }}>
                <Grid container direction="column" justifyContent="space-evenly" alignItems="center">
                  <h5>Equipments (Enter up to 10) :</h5>
                  {/* <Button
                  onClick={handleSubmitEquipment}
                  fullWidth
                  variant="contained"
                  sx={{ mb: 3, width: 150 }}
                >
                  Add Equipment
                </Button> */}
                </Grid>
                <Grid id="equipment_grid" container rowGap={2} direction="column" justifyContent="space-evenly" alignItems="center">
                  <TextField
                    required
                    sx={{ width: 350 }}
                    id="equip1"
                    name="equip1"
                  />

                  <TextField
                    required
                    sx={{ width: 350 }}
                    id="equip2"
                    name="equip2"
                  />

                  <TextField
                    required
                    sx={{ width: 350 }}
                    id="equip3"
                    name="equip3"
                  />

                  <TextField
                    required
                    sx={{ width: 350 }}
                    id="equip4"
                    name="equip4"
                  />

                  <TextField
                    required
                    sx={{ width: 350 }}
                    id="equip5"
                    name="equip5"
                  />

                  <TextField
                    required
                    sx={{ width: 350 }}
                    id="equip6"
                    name="equip6"
                  />

                  <TextField
                    required
                    sx={{ width: 350 }}
                    id="equip7"
                    name="equip7"
                  />

                  <TextField
                    required
                    sx={{ width: 350 }}
                    id="equip8"
                    name="equip8"
                  />

                  <TextField
                    required
                    sx={{ width: 350 }}
                    id="equip9"
                    name="equip9"
                  />

                  <TextField
                    required
                    sx={{ width: 350 }}
                    id="equip10"
                    name="equip10"
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