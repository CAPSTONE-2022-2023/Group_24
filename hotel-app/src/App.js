import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#42daf5"
    }
  }
});

var accountType = 0;

function SignIn() {
  const navigate = useNavigate();
  const [clients, setClients] = useState([{
    name: '',
    phone: 0,
    address: '',
    username: '',
    password: ''
  }])

  const [employees, setEmployees] = useState([{
    name: '',
    phone: 0,
    address: '',
    username: '',
    password: ''
  }])

  useEffect(() => {
    fetch("http://localhost:3001/getAll/customer", {mode: 'cors'}).then(res => {
      if (res.ok) {
        return res.json()
      }
    }).then(jsonRes => setClients(jsonRes));

    fetch("http://localhost:3001/getAll/employee", {mode: 'cors'}).then(res => {
      if (res.ok) {
        return res.json()
      }
    }).then(jsonRes => setEmployees(jsonRes));
  })

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    var arrLength = 0;

    if (accountType == 0) {
      arrLength = clients.length;
      for (var i = 0; i < arrLength; i++) {
        console.log(clients[i].username);
        if (clients[i].username === data.get('username') && clients[i].password === data.get('password')) {
          localStorage.setItem("username", clients[i].username);
          localStorage.setItem("password", clients[i].password);
          navigate('/homepage/customer', { state: clients[i] });
        }
      }
    }

    if (accountType == 1) {
      arrLength = employees.length;
      for (var i = 0; i < arrLength; i++) {
        console.log(employees[i].username);
        if (employees[i].username === data.get('username') && employees[i].password === data.get('password')) {
          localStorage.setItem("username", employees[i].username);
          localStorage.setItem("password", employees[i].password);
          navigate('/homepage/employee', { state: employees[i] });
        }
      }
    }
  }

  const handleChange = (event) => {
    if (event.target.checked) {
      accountType = 1;
    } else {
      accountType = 0;
    }
    console.log("Account Type: " + accountType);
  };

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
            Client Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox onChange={handleChange} value="accType" color="primary" />}
              label="Are you an employee?"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid container>
                <Grid item>
                  <Link href="/Signup/Customer" variant="body2">
                    {"Are you a customer? Sign up here"}
                  </Link>
                </Grid>

                <Grid item>
                  <Link href="/Signup/Employee" variant="body2">
                    {"Employee? Sign up your account here"}
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignIn;