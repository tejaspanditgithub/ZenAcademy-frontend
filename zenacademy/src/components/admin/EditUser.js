import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import Button from '@mui/material/Button';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import WorkIcon from '@mui/icons-material/Work';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import MenuItem from '@mui/material/MenuItem';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { axiosUserPrivate } from "../../api/axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const defaultCandidate = {
  name: "",
  userName: "",
  email: "",
  password: "",
  sgo: "",
  userRoll: "",
}

const rolls = [
    {
      value: 'admin',
      label: 'Admin'
    },
    {
      value: 'employee',
      label: 'Employee'
    },
    {
      value: 'l&d',
      label: 'L&D'
    },
    {
      value: 'sgo',
      label: 'SGO'
    },
  
  ];


  const sgos = [
    {
      value: 'AES',
      label: 'AES'
    },
    {
      value: 'DES',
      label: 'DES'
    },
    {
      value: 'FS',
      label: 'FS'
    },
    {
      value: 'AS',
      label: 'AS'
    },
    {
        value: 'ES',
        label: 'ES'
      },
  
  ];
  
export default function SimplePaper() {
  const [user, setUser] = useState(defaultCandidate)
  const [confirmPassword, setConfirmPassword] = useState('');
  const [open, setOpen] = React.useState(false);
  const [open_phone_error, setOpen_phone_error] = useState(false);
  const [open_userName_duplicate, setOpen_userName_duplicate] = useState(false);
  const [open_confirmPassword_error, setOpen_confirmPassword_error] = useState(false);
  const [open_email_error, set_email_error] = useState(false);
  const [open_experience_error, set_exeperience_error] = useState(false);

  const axiosPrivate = useAxiosPrivate(axiosUserPrivate);

  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/user/users");
        if (response?.data?.success) {
          const users = response.data.data;
          const currUser = users.find(user => user._id === id);
          console.log(currUser)
          if (!currUser) {
            navigate('/admin/user');
          } else {
            isMounted && setUser(currUser);
            
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
    return () => {
      isMounted = false;
    };
  }, [axiosPrivate, navigate, location, id, setConfirmPassword]);

  const handleCancelClick = (e) => {
    navigate('/admin/user');
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleClose_phoneError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen_phone_error(false);
  }

  const handleClose_usernameDuplicate = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen_userName_duplicate(false);
  };

  const handleClose_confirmPassword_error = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen_confirmPassword_error(false);
  };

  const handleClose_email_error = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    set_email_error(false);
  };
  const handleClose_exeperience_error = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    set_exeperience_error(false);
  };

  const updatePanelMember = async (user, id) => {
    console.log("Update")
    
    try {
      const response = await axiosPrivate.put(`/user/${id}`, JSON.stringify(user))
      console.log(response)
      if (response.data.success) {
        navigate('/admin/user');
        setOpen(true);
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  const handleClick = async (e) => {
    e.preventDefault();
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email))) {
      set_email_error(true)
    }
    
    
    else {
      await updatePanelMember(user, id);
    }
  }

  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleNavigate =()=>{
    navigate("/admin/user");
  }

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  

  return (
    <>
      <IconButton style={{ marginRight: '80%' }} 
        onClick={handleNavigate}>
        <ArrowBackIcon sx={{ width: 30, height: 30 }} />
      </IconButton>
      <Paper elevation={8} style={{ marginLeft: "8%", marginRight: "8%" }}>
        <h2
          style={{
            backgroundColor: "#0AA1DD",
            textAlign: "center",
            color: "white",
          }}
        >
          Edit User
        </h2>
        <form onSubmit={handleClick}>
          <div className="flex-container">
            <div className="flex-item-left">
              <TextField
                id="input-with-icon-textfield"
                label="Name"
                name="name"
                onChange={changeHandler}
                value={user.name}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                style={{ width: "80%" }}
                required
              />
            </div>
            
            <div className="flex-item-left">
              <TextField
                id="input-with-icon-textfield"
                label="UserName"
                name="userName"
                onChange={changeHandler}
                value={user.userName}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                style={{ width: "80%" }}
                required
                disabled
              />
            </div>
            <div className="flex-item-right">
              <TextField
                id="input-with-icon-textfield"
                label="e-mail"
                name="email"
                onChange={changeHandler}
                value={user.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                style={{ width: "80%" }}
                required
              />
            </div>
            
            <div className="flex-item-right">
              <TextField
                id="outlined-select-currency"
                select
                label="SGO"
                name="sgo"
                value={user.sgo}
                onChange={changeHandler}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <WorkIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                style={{
                  width: "80%"

                }}
                required>{sgos.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}</TextField>
            </div>
            
            <div className="flex-item-right">
              <TextField
                id="outlined-select-currency"
                select
                label="Role"
                name="userRoll"
                value={user.userRoll}
                onChange={changeHandler}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <WorkIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                style={{
                  width: "80%"

                }}
                required>{rolls.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}</TextField>
            </div>
            
          </div>
          <div className="flex-container">
            <div className="flex-item-left" >
              <Button variant="contained" endIcon={<HowToRegIcon />} type="submit"
                style={{ width: "35%" }}>
                Update
              </Button>
              <Button className="flex-item-right" variant="contained" endIcon={<CancelIcon />} onClick={handleCancelClick}
                style={{ marginLeft: "20%", width: "35%" }}>
                Cancel
              </Button>
            </div>
          </div>

        </form>
        
      </Paper>
      <Stack spacing={2} sx={{ width: '100%' }}>

        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Panel Member Details Edited Successfully!!!
          </Alert>
        </Snackbar>
        <Snackbar open={open_userName_duplicate} autoHideDuration={6000} onClose={handleClose_usernameDuplicate}>
          <Alert onClose={handleClose_usernameDuplicate} severity="error" sx={{ width: '100%' }}>
            This UserName is already taken!!!
          </Alert>
        </Snackbar>
        <Snackbar open={open_email_error} autoHideDuration={6000} onClose={handleClose_email_error}>
          <Alert onClose={handleClose_email_error} severity="error" sx={{ width: '100%' }}>
            Please Enter Valid Email!!!
          </Alert>
        </Snackbar>
        
      </Stack>
    </>
  );
}
