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
import React,{useState,useEffect} from 'react';
import {useNavigate,useLocation} from 'react-router-dom';
import axios from './api/axios';


const theme = createTheme();

const defaultLogin={
    userName:"",
    password:""
  }

export default function Login() {
    const {setAuth,err,setErr}=useData();
  const [login,setLogin]=useState(defaultLogin);
  
  const navigate = useNavigate();
  const location = useLocation();
  const fromForEmployee = location.state?.from?.pathname || "/employee";
  const fromForAdmin = location.state?.from?.pathname || "/admin";
  const fromForLd=location.state?.from?.pathname || "/l&d";
  const fromForSgo=location.state?.from?.pathname || "/sgo";

  useEffect(() => {
    setErr('');
  }, [login,setErr])

  
    const handleSubmit = async(event) => {
        event.preventDefault();
        console.log(login);
        if(!login.userName || !login.password){
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
            if(userRoll==='employee')
            navigate(fromForEmployee)
            else if(userRoll==='admin')
            navigate(fromForAdmin)
            else if(userRoll==='l&d')
            navigate(fromForLd)
            else if(userRoll==='sgo')
            navigate(fromForSgo)
            else
            navigate("/")
      
          }catch (err) {
            if (!err?.response?.data) {
              setErr('No Server Response');
            } else if (err.response?.status === 400) {
              setErr(err.response.data.data);
            }else {
              setErr('Login Failed');
            }
          }
    };

    
    return (
        <>
        {err && <p style={{color:'red'}}>{err}</p>}
        <ThemeProvider theme={theme} >
            <Container component="main" maxWidth="xs" sx={{ backgroundColor: '#FAF5EF', borderRadius: '16px' }}>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1 }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="userName"
                            label="User Name"
                            name="userName"
                            value={login.userName}
                            onChange={(e)=>setLogin({...login,userName:e.target.value})}
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
                            value={login.password}
                            onChange={(e) => setLogin({...login,password:e.target.value})}
                            />
                        
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            >
                            Sign In
                        </Button>
                       
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
                            </>
    );
}
