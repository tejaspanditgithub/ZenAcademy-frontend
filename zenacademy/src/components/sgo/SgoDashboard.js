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
import { IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import "../../index.css";
import { Container } from "@mui/system";
import useData from "../../hooks/useData";
import { axiosUserPrivate } from "../../api/axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
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


const SgoDashboard=()=>{
    const { users, setUsers } = useData();
    const [searchResults, setSearchResults] = React.useState([]);
    const axiosPrivate = useAxiosPrivate(axiosUserPrivate);
    const [details, setDetails] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const location=useLocation();
    const [yes,setYes]=React.useState()
    const [modalOpen, setModalOpen] = React.useState(false);
    const [flag, setFlag] = React.useState(true);
    


    const handleOpen = () =>{
        // console.log(user.username);
        setOpen(true);
      } 
      
  const handleClose = () => setOpen(false);

  const handleModalOpen = () =>{
    // console.log(user.userName);
    setModalOpen(true);

  }   
  const handleModalClose = () =>{
    setModalOpen(false);
  }

    React.useEffect(()=>{
        let isMounted = true;
    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/user/sgoUsers");
        if (response?.data?.success) {
          isMounted && setUsers(response?.data?.data);
          setSearchResults(response?.data?.data);
          console.log(response.data.data);
        }
      } catch (error) {
        // navigate("/login", { state: { from: location }, replace: true });
        console.log(error)
      }
    };
    getUsers();
    return () => {
      isMounted = false;
    };
    }, [axiosPrivate, setUsers, navigate, location,flag])

    const deleteUser = async (id) => {
        try {
          console.log(id);
          const response = await axiosPrivate.delete(`/user/${id}`);
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
    if (!e.target.value) return setSearchResults(users);

    const resultsArray = users.filter(
      (user) =>
        user.userName
          .toString()
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        user.name
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
        const currUser = await users.find((user) => user._id === id);
  
        setDetails(currUser);
  
        handleOpen();
      } catch (error) {
        console.log(error);
      }
  }
  const handleDelete =(id)=>{
    setYes(id)
    handleModalOpen()
}
  

    return<>
    {ListPage}
      <h3 style={{ color: "#2C3333", fontSize: "25Px", textAlign: "center" }}>
        User List
      </h3>

    <Box id="box">
        
        <TextField
          id="search"
          style={{ marginLeft: "72%", width: '20%' }}
          // label="Search"
          type="text"
          name="Search"
          placeholder="Name or userName"
          onChange={handleSearchChange}
          InputProps={{
            endAdornment: (
              <InputAdornment id="magni" position="end">
                <IconButton>
                  <SearchIcon sx={{ color: 'black' }}/>
                </IconButton>
              </InputAdornment>
            ),
          }}
          variant="outlined"
          required
        />
      </Box>
    
      <Container id="container" style={{ maxWidth: "lg", marginTop: "10px" ,marginBottom:'3%'}}>
        <Paper elevation={12}>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              stickyHeader
              aria-label="sticky table"
              style={{ marginTop: "10px" }}
            >
              <TableHead sx={{ backgroundColor: "#D3D3D3", fontWeight: "bold" }}>
                <TableRow>
                  <TableCell>User Name</TableCell>

                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">Role</TableCell>
                  <TableCell align="center">SGO</TableCell>
                  <TableCell align="center">Assign Course</TableCell>
                  <TableCell align="center">View Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {searchResults.map((user) => (
                  <TableRow
                    className="table"
                    key={user._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" className="User">
                      <a>{user.userName}</a>
                    </TableCell>

                    <TableCell align="left">{user.name.charAt(0).toUpperCase()+user.name.slice(1)}</TableCell>
                    <TableCell align="left">{user.email}</TableCell>
                    <TableCell align="left" className="Userrole">
                      {user.userRoll.charAt(0).toUpperCase()+user.userRoll.slice(1)}
                    </TableCell>
                    <TableCell align="center">{user.sgo.toUpperCase()}</TableCell>

                    <TableCell align="center">
                      <IconButton
                        aria-label="delete"
                        onClick={() => navigate(`/sgo/assignCourse/${user._id}`)}
                      >
                        <EditIcon
                          style={{
                            color: "black",
                            padding: "0",
                          }}
                        />
                      </IconButton>
                      
                 
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="View Details">
                        <IconButton onClick={() => getDetails(user._id)}>
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
        open={open}
        onClose={handleClose}
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
            {details.name}'s Details
          </Typography>
          <CardContent>
            <Typography sx={{ mb: 1 }} color="text.secondary" gutterBottom>
            <span style={{ fontWeight: "bold" }}> Name: </span>{details.name}
            </Typography>
            <Typography sx={{ mb: 1 }} color="text.secondary" gutterBottom>
            <span style={{ fontWeight: "bold" }}> UserName: </span>{details.userName}
            </Typography>
            <Typography sx={{ mb: 1 }} color="text.secondary">
            <span style={{ fontWeight: "bold" }}> Email: </span>{details.email }
            </Typography>

            <Typography sx={{ mb: 1 }} color="text.secondary">
            <span style={{ fontWeight: "bold" }}> Role: </span>{details.userRoll}
            </Typography>
            <Typography sx={{ mb: 1 }} color="text.secondary">
            <span style={{ fontWeight: "bold" }}>SGO:</span> {details.sgo}
            </Typography>
            {/* <Typography sx={{ mb: 1 }} color="text.secondary">
            <span style={{ fontWeight: "bold" }}>Assigned Courses:</span> {details.assignedCourses}
            </Typography> */}
          </CardContent>
          <CardActions>
            <Button
              style={{
                color: 'white',
                fontWeight: 'bold',
                border: "1px solid white",
                marginLeft: '10px',
                backgroundColor: '#212E52',
                margin:'auto'
              }}
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
                          onClick={()=>deleteUser(yes)}
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
    </>
}

export default SgoDashboard