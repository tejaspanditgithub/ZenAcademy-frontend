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



function Addlink() {
    const [course, setCourse] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('');
    const [open, setOpen] = React.useState(false);
    const [open_phone_error, setOpen_phone_error] = useState(false);
    const [open_courseName_duplicate, setOpen_courseName_duplicate] = useState(false);
    const [open_confirmPassword_error, setOpen_confirmPassword_error] = useState(false);
    const [open_email_error, set_email_error] = useState(false);
    const [open_experience_error, set_exeperience_error] = useState(false);
    const [recordingLinkN,setRecordingLinkN]=useState([])
  
    const axiosPrivate = useAxiosPrivate(axiosCoursePrivate);
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const getCourse = async () => {
            try {
                const response = await axiosPrivate.get(`/course/${id}`);
                if (response?.data?.success) {
                    const course = response.data.data;
                    if(course)
                    {
                        isMounted&&setCourse(course)
                        setRecordingLinkN(course.recordingLink)
                    }
                    // const currUser = users.find(user => user._id === id);
                    // console.log(currUser)
                    // if (!currUser) {
                    //     navigate('/admin/user');
                    // } else {
                    //     isMounted && setUser(currUser);

                    // }
                }
            } catch (error) {
                console.log(error);
            }
        };
        getCourse();
        return () => {
            isMounted = false;
        };
    }, [axiosPrivate, navigate, location, id]);



    const handleCancelClick = (e) => {
        navigate('/l&d');
      }
    
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };


      const updateCourse = async (course, id) => {
        console.log("Update")
        
        try {
          const response = await axiosPrivate.put(`/course/${id}`, JSON.stringify(course))
          console.log(response)
          if (response.data.success) {
            navigate('/l&d');
            setOpen(true);
          }
        } catch (err) {
          console.log(err.message);
        }
      }
    
    
      const handleClick = async (e) => {
        e.preventDefault();
        console.log(course)
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
          Add/Update Link
        </h2>
        <form onSubmit={handleClick}>
          <div >
            <div>
              <TextField
                id="input-with-icon-textfield"
                disabled
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
            
            
            
            
            <div>
            <TextField id="outlined-basic" 
      label="Links" 
      name="links"
      autoFocus
      variant="outlined" 
      style={{width:"80%" , marginTop:'15px'}}
      multiline="true" 
      minRows={3}
      value={course.recordingLink}
      onChange={(e)=>setCourse({...course,recordingLink:e.target.value})}
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
            Links Edited Successfully!!!
          </Alert>
        </Snackbar>
       
        
        
      </Stack>
    </>    );
}

export default Addlink;
