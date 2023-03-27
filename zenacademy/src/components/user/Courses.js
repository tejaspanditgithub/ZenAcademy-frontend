import React from 'react'
import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import Sgocard from '../course/Sgocard'
import CourseCard from '../user/CourseCard'
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useData from "../../hooks/useData";
import { axiosCoursePrivate } from "../../api/axios";
import { useNavigate, useLocation } from "react-router-dom";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";


export default function Dashboard() {

    const { courses, setCourses } = useData();
    const [searchResults, setSearchResults] = React.useState([]);
    const axiosPrivate = useAxiosPrivate(axiosCoursePrivate);
    const [details, setDetails] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const location=useLocation();
    const [yes,setYes]=React.useState()
    const [modalOpen, setModalOpen] = React.useState(false);
    const [flag, setFlag] = React.useState(true);


    React.useEffect(()=>{
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
    }, [axiosPrivate, setCourses, navigate, location,flag])

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



    return (
      <>
      
        <Box sx={{ ml: '6%' }}>
            <h2 style={{ padding: '8px', color: "#2C3333", fontSize: "30Px", textAlign: "center" }}>
                  Courses
            </h2>
    {ListPage}

            <TextField
          id="search"
          label="Search"
          type="text"
          name="Search"
          style={{marginLeft:"40%"}}
          placeholder="search by Course-Name"
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


            <Box>
                <Grid container
                    spacing={4}
                    direction="row"
                    alignItems="center"
                    justifyContent="center" columnSpacing={4} sx={{
                        // ml: '45px',

                    }}
                    style={{marginTop:"10px"}}

                >
                    {searchResults.map(course => (
            <CourseCard key={course._id} course={course} />
          ))}

                    {/* <Grid item xs={12} sm={7} md={5} lg={3.5} >
                        <Sgocard />
                    </Grid>
                    <Grid item xs={12} sm={7} md={5} lg={3.5} >
                        <Sgocard />
                    </Grid>
                    <Grid item xs={12} sm={7} md={5} lg={3.5} >
                        <Sgocard />
                    </Grid> */}

                </Grid>
            </Box>
        </Box>
      </>
    )
}