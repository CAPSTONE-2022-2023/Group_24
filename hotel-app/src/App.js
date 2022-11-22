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
import axios from "axios";
import {useEffect, useState} from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#42daf5"
    }
  }
});

export default function SignIn() {
  const [clients, setClients] = useState([{
    name: '',
    phone: 0,
    address: '',
    username: '',
    password: ''
  }])

  useEffect(() => {
    fetch("http://localhost:3001").then(res => {
      if(res.ok) {
        return res.json()
      }
    }).then(jsonRes => setClients(jsonRes));
  })

  return (
    <div className='container'>
      <h1>Sign In</h1>
      {clients.map(client =>
        <div>
          <h1>{client.username}</h1>
          <h1>{client.password}</h1>
        </div>
      )}
    </div>
  );
}