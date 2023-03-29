// import * as React from 'react';
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
import useData from './hooks/useData';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from './api/axios';


const theme = createTheme();

const defaultLogin = {
  userName: "",
  password: ""
}

export default function Login() {
  const { setAuth, err, setErr } = useData();
  const [login, setLogin] = useState(defaultLogin);

  const navigate = useNavigate();
  const location = useLocation();
  const fromForEmployee = location.state?.from?.pathname || "/employee";
  const fromForAdmin = location.state?.from?.pathname || "/admin";
  const fromForLd = location.state?.from?.pathname || "/l&d";
  const fromForSgo = location.state?.from?.pathname || "/sgo";

  useEffect(() => {
    setErr('');
  }, [login, setErr])


  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(login);
    if (!login.userName || !login.password) {
      setErr('please provide both the both the fields');
      return;
    }

    try {
      const response = await axios.post('/user/login',
        JSON.stringify(login),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      console.log(response)
      const accessToken = response?.data?.accessToken;
      const userRoll = response?.data?.userRoll;
      setAuth({ userRoll, accessToken });

      setLogin(defaultLogin);
      // userRoll==='employee'?navigate(fromForEmployee):navigate("/");
      if (userRoll === 'employee')
        navigate(fromForEmployee)
      else if (userRoll === 'admin')
        navigate(fromForAdmin)
      else if (userRoll === 'l&d')
        navigate(fromForLd)
      else if (userRoll === 'sgo')
        navigate(fromForSgo)
      else
        navigate("/")

    } catch (err) {
      if (!err?.response?.data) {
        setErr('No Server Response');
      } else if (err.response?.status === 400) {
        setErr(err.response.data.data);
      } else {
        setErr('Login Failed');
      }
    }
  };


  return (

    <div style={{ backgroundImage: "url(/coverimage.svg)", backgroundPosition: 'left', backgroundSize: "contain", backgroundRepeat: 'no-repeat' }} >

      {err && <p style={{ color: 'red' }}>{err}</p>}
      <div
        className="fadeIn first"
        style={{ float: "right", position: "absolute" }}
      >
        <h2
          style={{
            marginTop: "40px",
            marginLeft: "1000px",
            fontFamily: "Cambria",
            fontWeight: "bold",
            letterSpacing: "0.2rem",
            color: "white",
            fontSize: "40px"
          }}
        >
          ZenAcademy
        </h2>
      </div>


      {/* <div style={{  }}> */}

      <ThemeProvider theme={theme} >
        <Container component="div" maxWidth="xs" sx={{
          flexDirection: 'row', minWidth: '500px', marginRight: '0px', padding: '131px', backgroundColor: 'white', background: 'linear-gradient(180deg, #ED7B84 ,#6699FF)',
          backgroundColor: 'orange' /*this your primary color*/
        }}>
          <CssBaseline />
          {/* login box */}
          <Box
            sx={{
              ml: '60px',
              width: '80%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'white',
              padding: '10px',
              border: '1px solid white',
              borderRadius: '8px'
            }}
          >
            <Avatar sx={{ mb: 1, mt: 1, color: 'white', backgroundColor: 'grey' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold' }}>
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="userName"
                placeholder='Username'
                name="userName"
                value={login.userName}
                onChange={(e) => setLogin({ ...login, userName: e.target.value })}
                autoFocus
                sx={{ width: '90%', ml: '18px' }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                placeholder="Password"
                type="password"
                id="password"
                value={login.password}
                onChange={(e) => setLogin({ ...login, password: e.target.value })}
                sx={{ width: '90%', ml: '18px' }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3, mb: 3, ml: 11, width: '50%', color: 'white',
                  fontWeight: 'bold',
                  border: "0px solid ",
                  backgroundColor: '#212E52',
                }}
              >
                Sign In
              </Button>

            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
    // </div>
  );

}
