import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system'
import { Grid } from '@mui/material'
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { axiosUserPrivate } from '../../api/axios';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { IconButton, Stack } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useNavigate, useLocation } from "react-router-dom";

const defaultBookmark = {
  userName: "",
  bookmarkedCourses: ""
}

export default function ImgMediaCard(course) {

  const [bookmarked, setBookmarked] = React.useState(defaultBookmark)
  const axiosPrivate = useAxiosPrivate(axiosUserPrivate);
  const [open, setOpen] = React.useState(false);
  const [sopen, setSOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();



  const bookmark = async () => {
    try {
      console.log("Bookmark")
      const response = await axiosPrivate.get("/user");
      const userName = response.data.data.userName
      const bookmarkedCourses = course.course._id

      const bookmarked1 = {
        userName: userName,
        bookmarkedCourses: bookmarkedCourses
      }

      console.log(bookmarked1)
      setBookmarked(bookmarked1)
      console.log(bookmarked)

      try {
        const response = await axiosPrivate.put(`/user/bookmark`, JSON.stringify(bookmarked))
        if (response.data.xyz === 1) {
          setSOpen(true);
        }
        else if (response.data.xyz === 0) {
          setOpen(true)
        }
      }
      catch (err) {
        console.log(err.message)
      }

    }
    catch (err) {
      console.log(err)
    }
  }

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => setOpen(false);

  const handleSClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSOpen(false);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });



  return (<>
    <Grid item xs={12} sm={7} md={5} lg={3.5} >

      <Card sx={{ maxWidth: 345 }}>

        <CardMedia
          component="img"
          alt="javascript"
          height="140"
          image="/course.jfif"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {course.course.courseName}
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
          {course.course.description}
        </Typography> */}
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => navigate(`course/${course.course._id}`)} style={{
            color: 'white',
            fontWeight: 'bold',
            border: "1px solid white",
            marginLeft: '10px',
            backgroundColor: '#212E52',
          }}>VIEW</Button>
          <Button size="small" style={{
            color: '#212E52',
            marginLeft:'200px',
            fontWeight: 'bold',
            border: "1px solid white",

          }}><BookmarkIcon color='#000000'
            onClick={bookmark}
            /></Button>
        </CardActions>
      </Card>
    </Grid>

    <Stack>
      <Snackbar open={sopen} autoHideDuration={6000} onClose={handleSClose}>
        <Alert onClose={handleSClose} severity="success" sx={{ width: '100%' }}>
          Bookmark Added!!!
        </Alert>
      </Snackbar>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Bookmark Removed!!!
        </Alert>
      </Snackbar>

    </Stack>
  </>
  );
}