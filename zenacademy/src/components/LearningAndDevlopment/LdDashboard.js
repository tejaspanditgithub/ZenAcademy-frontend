import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/system';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import { Link } from 'react-router-dom';
import useData from "../../hooks/useData";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { axiosUserPrivate } from "../../api/axios";
import InfoIcon from '@mui/icons-material/Info';
import CardActions from "@mui/material/CardActions";

import CardContent from "@mui/material/CardContent";

function createData(course, sgo, author, link) {
    return { course, sgo, author, link };
}

const rows = [
    createData('HTML from scrach', 'MERN Full Stack', 'Vivek Pawde', 'www.pawde.com'),
    createData('CSS from scrach', 'MERN Full Stack', 'Vivek Pawde', 'www.pawde.com'),
    createData('Javascript from scrach', 'MERN Full Stack', 'Vivek Pawde', 'www.pawde.com'),
    createData('MongoDB from scrach', 'MERN Full Stack', 'Vivek Pawde', 'www.pawde.com'),
    createData('ReactJS from scrach', 'MERN Full Stack', 'Vivek Pawde', 'www.pawde.com'),
    createData('ExpressJS from scrach', 'MERN Full Stack', 'Vivek Pawde', 'www.pawde.com'),
    createData('Angular from scrach', 'MERN Full Stack', 'Vivek Pawde', 'www.pawde.com'),
    createData('Node from scrach', 'MERN Full Stack', 'Vivek Pawde', 'www.pawde.com'),

];

export default function LdDashboard() {
    const { courses, setCourses } = useData();
    // const []
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [details, setDetails] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const axiosPrivate = useAxiosPrivate(axiosUserPrivate);
    const [flag, setFlag] = useState(true);


    // this.handleOpenModal = this.handleOpenModal.bind(this)
    // this.handleCloseModal = this.handleCloseModal.bind(this);

    useEffect(() => {
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
    }, [])

    const getDetails = async (id) => {
        try {
            const currUser = courses.find((course) => course._id === id);

            setDetails(currUser);

            handleOpen();
        } catch (error) {
            console.log(error);
        }
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'white',
        border: '1px solid white',
        borderRadius: '5px',
        boxShadow: 24,
        p: 4,
    };

    // const handleOpenModal(val)=() {
    //     this.setState({ activeModal: val });
    //     this.setState({ showModal: true });
    // }

    // const handleCloseModal() = {
    //     this.setState({ showModal: false });
    //     this.setState({ showModal: "" });
    // }


    return (<>
        <Box sx={{ alignItems: "center", justifyContent: "center" }}>
            <div style={{
                padding: '8px',
                marginTop: '10px',
                marginBottom: '30px',
                color: "#2C3333",
                fontSize: "30Px",
                textAlign: "center",
                fontweight: '3'
            }}>Learning And Development Dashboard</div>
            <div >

                {/* <Button component={Link} to="addlink"
                    style={{
                        color: 'white',
                        marginLeft: '83.5%',
                        marginBottom: '10px',
                        border: "1px solid white",
                        backgroundColor: '#212E52'
                    }}>
                    Add link
                </Button> */}

            </div>

            <TableContainer component={Paper} elevation={3}
                sx={{
                    minWidth: 650,
                    width: "80%",
                    margin: 'auto',

                }}>

                <Table aria-label="simple table" sx={{
                    minWidth: 650, border: '1px'
                }}>
                    <TableHead sx={{ backgroundColor: "#D3D3D3", fontWeight: "bold" }}>
                        <TableRow >
                            <TableCell align="center">Course Name</TableCell>
                            <TableCell align="center">Description</TableCell>
                            {/* <TableCell align="center">Author</TableCell> */}
                            {/* <TableCell align="center">Link</TableCell> */}
                            <TableCell align="center">Actions</TableCell>
                            <TableCell align="center">Details</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {courses.map((row) => (
                            <TableRow
                                key={row.courseName}

                            >
                                <TableCell align="center">{row.courseName}</TableCell>
                                <TableCell align="center">{row.description}</TableCell>
                                {/* <TableCell align="left">{row.recordingLink[0]}</TableCell> */}

                                <TableCell align="center">
                                    <Button sx={{ color: 'black' }} onClick={() => navigate(`/l&d/addLink/${row._id}`)} ><EditIcon /> </Button>
                                    {/* <Button sx={{ color: 'black' }} onClick={handleOpen}><DeleteIcon /></Button> */}

                                </TableCell>
                                <TableCell align="center"><Button sx={{ color: 'black' }} onClick={() => getDetails(row._id)} ><InfoIcon /> </Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </TableContainer>

        </Box>
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
                        }}
                        onClick={handleClose}
                        size="small"
                    >
                        Close
                    </Button>
                </CardActions>
            </Box>
        </Modal>

    </>
    );
}