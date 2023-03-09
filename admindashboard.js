import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";

export default function Dashboard() {
  return (
    <Box sx={{ ml: "6%" }}>
      <h2
        style={{
          padding: "8px",
          marginTop: "10px",
          color: "#2C3333",
          fontSize: "30Px",
          textAlign: "center",
        }}
      >
        Dashboard
      </h2>
      <Box>
        <Grid
          container
          spacing={4}
          direction="row"
          alignItems="center"
          justifyContent="center"
          columnSpacing={4}
          sx={
            {
              // ml: '45px',
            }
          }
        >
          <Grid item xs={12} sm={7} md={5} lg={3.5}>
            <Box width="365px" topmargin="20px" padding="2px">
              <Card>
                <CardMedia
                  component="img"
                  alt="JavaScript"
                  height="170"
                  image="https://nbsl.org.uk/images/bullets/People/training-areas.jpg"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    L&D
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Make changes with regards to the L&D team
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => console.log("Enrolled")}
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      marginLeft: "80%",
                      border: "1px solid white",
                      backgroundColor: "#212E52",
                    }}
                  >
                    Modify
                  </Button>
                </CardActions>
              </Card>
            </Box>
          </Grid>
          <Grid item xs={12} sm={7} md={5} lg={3.5}>
            <Box width="365px" topmargin="20px" padding="2px">
              <Card>
                <CardMedia
                  component="img"
                  alt="JavaScript"
                  height="170"
                  image="https://www.villageofallouezwi.gov/wp-content/uploads/2013/04/departments.jpg"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    SGO
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                   Make changes related to a particular SGO
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => console.log("Enrolled")}
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      marginLeft: "80%",
                      border: "1px solid white",
                      backgroundColor: "#212E52",
                    }}
                  >
                    Modify
                  </Button>
                </CardActions>
              </Card>
            </Box>
          </Grid>
          <Grid item xs={12} sm={7} md={5} lg={3.5}>
            <Box width="365px" topmargin="20px" padding="2px">
              <Card>
                <CardMedia
                  component="img"
                  alt="JavaScript"
                  height="170"
                  image="https://akm-img-a-in.tosshub.com/indiatoday/images/bodyeditor/202009/e-learning_digital_education-1200x1080.jpg?XjMNHsb4gLoU_cC7110HB7jVghJQROOj"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Courses
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                   Add or remove any particular course
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => console.log("Enrolled")}
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      marginLeft: "80%",
                      border: "1px solid white",
                      backgroundColor: "#212E52",
                    }}
                  >
                    Modify
                  </Button>
                </CardActions>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
