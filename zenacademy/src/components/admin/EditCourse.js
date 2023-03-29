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
import { axiosCoursePrivate } from "../../api/axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const defaultCandidate = {
  courseName: "",
  sgo: "",
  description: "",
}



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
  const [course, setCourse] = useState(defaultCandidate)
  const [confirmPassword, setConfirmPassword] = useState('');
  const [open, setOpen] = React.useState(false);
  const [open_phone_error, setOpen_phone_error] = useState(false);
  const [open_courseName_duplicate, setOpen_courseName_duplicate] = useState(false);
  const [open_confirmPassword_error, setOpen_confirmPassword_error] = useState(false);
  const [open_email_error, set_email_error] = useState(false);
  const [open_experience_error, set_exeperience_error] = useState(false);

  const axiosPrivate = useAxiosPrivate(axiosCoursePrivate);

  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const getCourses = async () => {
      try {
        const response = await axiosPrivate.get("/course");
        if (response?.data?.success) {
          const courses = response.data.data;
          console.log(courses)
          const currCourse = courses.find(course => course._id === id);
          console.log(currCourse)
          if (!currCourse) {
            navigate('/admin/course');
          } else {
            isMounted && setCourse(currCourse);
            
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCourses();
    return () => {
      isMounted = false;
    };
  }, [axiosPrivate, navigate, location, id, setConfirmPassword]);

  const handleCancelClick = (e) => {
    navigate('/admin/course');
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

  const handleClose_coursenameDuplicate = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen_courseName_duplicate(false);
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

  const updateCourse = async (course, id) => {
    console.log("Update")
    
    try {
      const response = await axiosPrivate.put(`/course/${id}`, JSON.stringify(course))
      console.log(response)
      if (response.data.success) {
        navigate('/admin/course');
        setOpen(true);
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  const handleClick = async (e) => {
    e.preventDefault();
    
      await updateCourse(course, id);
  }

  const changeHandler = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value })
  }

  const handleNavigate =()=>{
    navigate("/admin/course");
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
          Edit Course
        </h2>
        <form onSubmit={handleClick}>
          <div className="flex-container">
            <div className="flex-item-left">
              <TextField
                id="input-with-icon-textfield"
                label="Course-Name"
                name="name"
                onChange={changeHandler}
                value={course.courseName}
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
            
            
            
            <div className="flex-item-right">
              <TextField
                id="outlined-select-currency"
                select
                label="SGO"
                name="sgo"
                value={course.sgo}
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
            <TextField id="outlined-basic" 
      label="Description" 
      name="description"
      variant="outlined" 
      style={{width:"80%",marginLeft:"10%"}}
      multiline="true" 
      minRows={3}
      value={course.description}
      onChange={(e)=>setCourse({...course,description:e.target.value})}
      />
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
        <Snackbar open={open_courseName_duplicate} autoHideDuration={6000} onClose={handleClose_coursenameDuplicate}>
          <Alert onClose={handleClose_coursenameDuplicate} severity="error" sx={{ width: '100%' }}>
            This CourseName is already taken!!!
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
