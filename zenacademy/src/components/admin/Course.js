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
import { axiosCoursePrivate } from "../../api/axios";
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


const Course = () => {
  const { courses, setCourses } = useData();
  const [searchResults, setSearchResults] = React.useState([]);
  const axiosPrivate = useAxiosPrivate(axiosCoursePrivate);
  const [details, setDetails] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [yes, setYes] = React.useState()
  const [modalOpen, setModalOpen] = React.useState(false);
  const [flag, setFlag] = React.useState(true);



  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => setOpen(false);

  const handleModalOpen = () => {
    setModalOpen(true);

  }
  const handleModalClose = () => {
    setModalOpen(false);
  }

  React.useEffect(() => {
    let isMounted = true;
    const getCourses = async () => {
      try {
        const response = await axiosPrivate.get("/course");
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
  }, [axiosPrivate, setCourses, navigate, location, flag])

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
          .includes(e.target.value.toLowerCase()) ||
        course.name
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

  const getDetails = async (id) => {
    try {
      const currCourse = courses.find((course) => course._id === id);

      setDetails(currCourse);

      handleOpen();
    } catch (error) {
      console.log(error);
    }
  }
  const handleDelete = (id) => {
    setYes(id)
    handleModalOpen()
  }
  const goBack = () => {
    navigate('/admin')
  }


  return <>
    {ListPage}
    <h3 style={{ color: "#2C3333", fontSize: "25Px", textAlign: "center" }}>
      Course List
    </h3>

    <Box id="box">
      <Button variant="outlined" style={{
        color: 'white',
        fontWeight: 'bold',
        border: "1px solid white",
        marginLeft: '10%',
        backgroundColor: '#212E52',

      }} onClick={goBack} >Go Back</Button>

      <Button
        variant="contained"
        id="btn"
        style={{ marginLeft: "10px" }}
        endIcon={<AddCircleRoundedIcon />}
        onClick={() => { navigate('register') }}
      >
        Add Course
      </Button>
      <TextField
        id="search"
        // label="Search"
        type="text"
        name="Search"
        style={{ marginLeft: "43%", width: '20%' }}
        placeholder="Course Name"
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

    <Container id="container" style={{ maxWidth: "lg", marginTop: "10px", marginBottom: '3%' }}>
      <Paper elevation={12} >
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 650 }}
            stickyHeader
            aria-label="sticky table"
            style={{ marginTop: "10px" }}
          >
            <TableHead style={{ backgroundColor: "#EEEEEE" }}>
              <TableRow>
                <TableCell align="left">Course Name</TableCell>
                <TableCell align="left">SGO</TableCell>
                <TableCell align="center">Action</TableCell>
                <TableCell align="center">View Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {searchResults.map((course) => (
                <TableRow
                  className="table"
                  key={course._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {/* <TableCell component="th" scope="row" className="User">
                      <a>{course.CourseName}</a>
                    </TableCell> */}

                  <TableCell align="left">{course.courseName}</TableCell>

                  <TableCell align="left">{course.sgo}</TableCell>

                  <TableCell align="center">
                    <IconButton
                      aria-label="delete"
                      onClick={() => navigate(`/admin/course/edit/${course._id}`)}
                    >
                      <EditIcon
                        style={{
                          color: "rgb(70 67 229 / 54%)",
                          padding: "0",
                        }}
                      />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDelete(course._id)}
                    >
                      <DeleteIcon style={{ color: "red", padding: "0" }} />
                    </IconButton>

                  </TableCell>
                  <TableCell align="center">
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
            <span style={{ fontWeight: "bold" }}> Description: </span>{details.description}
          </Typography>

        </CardContent>
        <CardActions>
          <Button
            style={{
              color: 'white',
              fontWeight: 'bold',
              border: "1px solid white",
              marginLeft: '10px',
              backgroundColor: '#212E52',
              margin: 'auto'
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
        <Typography id="modal-modal-description" sx={{ mt: 2, mb: 3 }}>
          Do you really want to Delete ?
        </Typography>
        <Button
          startIcon={<DeleteIcon />}
          style={{
            color: 'white',
            fontWeight: 'bold',
            border: "1px solid white",
            backgroundColor: '#212E52',

          }}
          onClick={() => deleteCourse(yes)}
        >
          Delete
        </Button>
        <Button
          startIcon={<CancelIcon />}
          style={{
            color: 'white',
            fontWeight: 'bold',
            border: "1px solid white",
            marginLeft: '10px',
            backgroundColor: '#212E52',
            marginLeft: '20%'
          }}
          onClick={handleModalClose}
        >
          Cancel
        </Button>
      </Box>
    </Modal>
  </>
}

export default Course