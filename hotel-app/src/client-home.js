import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useNavigate, Navigate } from "react-router-dom";


const theme = createTheme({
  palette: {
    primary: {
      main: "#42daf5"
    }
  }
});

export default function CHome() {
  const navigate = useNavigate();
  const handleClick = (event) => {
    event.preventDefault();
    localStorage.setItem("username", "");
    localStorage.setItem("password", "");
    navigate("/");
  };

  if (localStorage.getItem("username") === null || localStorage.getItem("username") === "") {
    return <Navigate to="/"/>;
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
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Client Home: {localStorage.getItem("username")}
            </Typography>
            <Button
                onClick={handleClick}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Logout
            </Button>
            
          </Box>
        </Container>
      </ThemeProvider>
    );
  }
}