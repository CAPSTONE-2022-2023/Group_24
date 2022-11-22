import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import {useState} from "react";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const [input, setInput] = useState({
    name: '',
    phone: 0,
    address: '',
    username: '',
    password: '',
  })

  function handleChange(event) {
    const {name, value} = event.target;

    setInput(prevInput => {
      return {
        ...prevInput,
        [name]: value
      }
    })
  }

  function handleClick(event) {
    event.preventDefault();
    const newClient = {
      name: input.name,
      phone: input.phone,
      address: input.address,
      username: input.username,
      password: input.password
    }
    axios.post("http://localhost:3001/signup/customer", newClient);
  }

  return (
    <div className = 'container'>
      <h1> Signup for a Client Account</h1>
      <form>
        <div className = 'form-group'>
          <input onChange={handleChange} name ="name" autoComplete = "off" className = "form-control" placeholder = "Full Name"></input>
        </div>

        <div className = 'form-group'>
          <input onChange={handleChange} name ="phone" autoComplete = "off" className = "form-control" placeholder = "Phone Number"></input>
        </div>

        <div className = 'form-group'>
          <input onChange={handleChange} name ="address" autoComplete = "off" className = "form-control" placeholder = "Address"></input>
        </div>

        <div className = 'form-group'>
          <input onChange={handleChange} name ="username" autoComplete = "off" className = "form-control" placeholder = "Username"></input>
        </div>

        <div className = 'form-group'>
          <input onChange={handleChange} name ="password" autoComplete = "off" className = "form-control" placeholder = "Password"></input>
        </div>

        <button onClick={handleClick} className= "btn btn-lg btn-info" >Sign Up</button>
      </form>
    </div>
  );
}