import React from 'react'
import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import Sgocard from '../course/Sgocard'
import CourseCard from '../user/CourseCard'
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useData from "../../hooks/useData";
import { axiosUserPrivate } from "../../api/axios";
import { useNavigate, useLocation } from "react-router-dom";


export default function Dashboard() {

    const { courses, setCourses } = useData();
    const [searchResults, setSearchResults] = React.useState([]);
    const axiosPrivate = useAxiosPrivate(axiosUserPrivate);
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
        const response = await axiosPrivate.get("/user/bookmarked");
        if (response?.data?.success) {
          isMounted && setCourses(response?.data?.data);
          setSearchResults(response?.data?.data);
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
    }, [axiosPrivate, setCourses, navigate, location,flag,courses])


    return (
        <Box sx={{ ml: '6%' }}>
            <h2 style={{ padding: '8px', marginTop: '10px', color: "#2C3333", fontSize: "30Px", textAlign: "center" }}>
                My Bookmarks
            </h2>
            <Box>
                <Grid container
                    spacing={4}
                    direction="row"
                    alignItems="center"
                    justifyContent="center" columnSpacing={4} sx={{
                        // ml: '45px',

                    }}
                >
                    {courses.map(course => (
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
    )
}