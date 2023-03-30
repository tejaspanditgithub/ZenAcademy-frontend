import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import "../../index.css";
import { Container } from "@mui/system";
import useData from "../../hooks/useData";
import { axiosUserPrivate } from "../../api/axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import { Modal, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Tooltip } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const defaultAssign={
    userID:"",
    assignedCourses:""
  }


const Course=()=>{
    const { courses, setCourses } = useData();
    const [assigned,setAssigned]=React.useState(defaultAssign)
    const [searchResults, setSearchResults] = React.useState([]);
    const axiosPrivate = useAxiosPrivate(axiosUserPrivate);
    const [details, setDetails] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [dopen, setdOpen] = React.useState(false);
    const [sopen,setSOpen]=React.useState(false);
    const navigate = useNavigate();
    const location=useLocation();
    const [yes,setYes]=React.useState()
    const [modalOpen, setModalOpen] = React.useState(false);
    const [flag, setFlag] = React.useState(true);
    
    const {id}=useParams();

    const handleOpen = () =>{
        setOpen(true);
      } 
      
  const handleClose = () => setOpen(false);

  const handleModalOpen = () =>{
    setModalOpen(true);

  }
  const handledOpen = () =>{
    setdOpen(true);

  }   
  const handleModalClose = () =>{
    setModalOpen(false);
  }
  const handledClose = () =>{
    setdOpen(false);
  }
  const handleSClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSOpen(false);
  };

    React.useEffect(()=>{
        let isMounted = true;
    const getCourses = async () => {
      try {
        const response = await axiosPrivate.get("/user/sgoCourse");
        if (response?.data?.success) {
          isMounted && setCourses(response?.data?.data);
          setSearchResults(response?.data?.data);
          console.log(response.data.data);
        }
      } catch (error) {
        // navigate("/login", { state: { from: location }, replace: true });
        console.log(error)
      }
    };
    getCourses();
    return () => {
      isMounted = false;
    };
    }, [axiosPrivate, setCourses, navigate, location,flag])

    const deleteCourse = async (id) => {
        try {
          console.log(id);
          const response = await axiosPrivate.delete(`/course/${id}`);
          if (response?.data?.success) {
            setFlag((prev) => !prev);
            handleModalClose();
    
            return response.data;
          }
    
          const data = response.data.data;
    
          return data;
        } catch (err) {
          console.log(err.message);
        }
      };

    
  const handleSearchChange = (e) => {
    if (!e.target.value) return setSearchResults(courses);

    const resultsArray = courses.filter(
      (course) =>
        course.courseName
          .toString()
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
    );

    setSearchResults(resultsArray);
  };

  const ListPage = ({ searchResults }) => {
    const result = searchResults.map((result) => result);
    if (result?.length) {
      const content = result.map((result) => result);
      return <main>{content}</main>;
    } else {
      return (
        <article>
          <p>No Matching name</p>
        </article>
      );
    }
  };

  const getDetails=async(id)=>{
    try {
        const currCourse = courses.find((course) => course._id === id);
  
        setDetails(currCourse);
  
        handledOpen();
      } catch (error) {
        console.log(error);
      }
  }
  const handleDelete =(id)=>{
    setYes(id)
    handleModalOpen()
}


const Assign=async(cid)=>{
  console.log(id,cid)
  const assigned1={
    userID:id,
    assignedCourses:cid
  }
  console.log(assigned1)
  setAssigned(assigned1)
  console.log(assigned)
  try{
    const response=await axiosPrivate.put(`/user/assignCourse`, JSON.stringify(assigned))
    console.log(response)
    if(response.data.success){
      // navigate('/sgo');
      setOpen(true);
    }
    else if(response.status===209){
      setSOpen(true)
    }
  }
  catch(err){
    console.log(err.message)
  }
  
}

const goBack=()=>{
  navigate('/sgo')
}
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

    return<>
    {ListPage}
      <h3 style={{ color: "#2C3333", fontSize: "25Px", textAlign: "center" }}>
        Course List
      </h3>

      <Button variant="outlined" style={{marginLeft:"10%"}} onClick={goBack} >Go Back</Button>
        

    <Box id="box" >
        
        <TextField
          id="search"
          label="Search"
          type="text"
          name="Search"
          style={{marginLeft:"40%"}}
          placeholder="search by name or skills"
          onChange={handleSearchChange}
          InputProps={{
            endAdornment: (
              <InputAdornment id="magni" position="end">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          variant="outlined"
          required
        />
      </Box>
    
      <Container id="container" style={{ maxWidth: "lg", marginTop: "10px" ,marginBottom:'3%', marginLeft:"5%"}}>
        <Paper elevation={12}>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              stickyHeader
              aria-label="sticky table"
              style={{ marginTop: "10px" }}
            >
              <TableHead style={{ backgroundColor: "#EEEEEE" }}>
                <TableRow>
                  <TableCell>Course Name</TableCell>
                  <TableCell align="left">SGO</TableCell>
                  <TableCell align="left">Assign</TableCell>
                  <TableCell align="left">View Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {searchResults.map((course) => (
                  <TableRow
                    className="table"
                    key={course._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >

                    <TableCell align="left">{course.courseName}</TableCell>
                    
                    <TableCell align="left">{course.sgo}</TableCell>

                    <TableCell align="left"><Button variant="contained" onClick={()=>Assign(course._id)}>ASSIGN</Button></TableCell>
                    <TableCell align="left">
                      <Tooltip title="View Details">
                        <IconButton onClick={() => getDetails(course._id)}>
                          <VisibilityIcon style={{ padding: "0" }} />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
      <Modal
        open={dopen}
        onClose={handledClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h2"
            align="center"
          >
            {details.courseName}'s Details
          </Typography>
          <CardContent>
            <Typography sx={{ mb: 1 }} color="text.secondary" gutterBottom>
            <span style={{ fontWeight: "bold" }}> Course-Name: </span>{details.courseName}
            </Typography>
            <Typography sx={{ mb: 1 }} color="text.secondary" gutterBottom>
            <span style={{ fontWeight: "bold" }}> SGO: </span>{details.sgo}
            </Typography>
            <Typography sx={{ mb: 1 }} color="text.secondary">
            <span style={{ fontWeight: "bold" }}> Description: </span>{details.description }
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              style={{ marginLeft: "90%" }}
              onClick={handleClose}
              size="small"
            >
              Close
            </Button>
          </CardActions>
        </Box>
      </Modal>

      <Modal
                      open={modalOpen}
                      onClose={handleModalOpen}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <Typography
                          id="modal-modal-title"
                          variant="h6"
                          component="h2"
                        >
                          Are You Sure ?
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          Do you really want to Delete ?
                        </Typography>
                        <Button
                          startIcon={<DeleteIcon />}
                          style={{ color: "red" }}
                          onClick={()=>deleteCourse(yes)}
                        >
                          Delete
                        </Button>
                        <Button
                          startIcon={<CancelIcon />}
                          onClick={handleModalClose}
                        >
                          Cancel
                        </Button>
                      </Box>
                    </Modal>
        <Stack>
                    <Snackbar open={sopen} autoHideDuration={6000} onClose={handleSClose}>
          <Alert onClose={handleSClose} severity="error" sx={{ width: '100%' }}>
            Already Assigned!!!
          </Alert>
        </Snackbar>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Assigned!!!
          </Alert>
        </Snackbar>

        </Stack>
    </>
}

export default Course