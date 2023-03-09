import { useState } from 'react';
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

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 340,
        bgcolor: 'white',
        border: '1px solid white',
        borderRadius: '5px',
        boxShadow: 24,
        p: 4,
    };


    return (
        <Box sx={{ alignItems: "center", justifyContent: "center" }}>
            <div style={{
                padding: '8px',
                marginTop: '10px',
                color: "#2C3333",
                fontSize: "30Px",
                textAlign: "center",
                fontweight: '3'
            }}>Learning And Development</div>
            <div >

                <Button component={Link} to="/l&d/addlink"
                    style={{
                        color: 'white',
                        marginLeft: '83.5%',
                        marginBottom: '10px',
                        border: "1px solid white",
                        backgroundColor: '#212E52'
                    }}>
                    Add
                </Button>

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
                    <TableHead sx={{ backgroundColor: 'lightgrey' }}>
                        <TableRow >
                            <TableCell align="center">Course Name</TableCell>
                            <TableCell align="center">SGO</TableCell>
                            <TableCell align="center">Author</TableCell>
                            <TableCell align="center">Link</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.course}

                            >
                                <TableCell align="left">{row.course}</TableCell>
                                <TableCell align="left">{row.sgo}</TableCell>
                                <TableCell align="left">{row.author}</TableCell>
                                <TableCell align="left">{row.link}</TableCell>
                                <TableCell align="center">
                                    <Button sx={{ color: 'black' }} ><EditIcon /> </Button>
                                    <Button sx={{ color: 'black' }} onClick={handleOpen}><DeleteIcon /></Button>

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </TableContainer>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-titl"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Do you really want to Delete?
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 3 }}>
                        <Button onClick={handleClose} sx={{
                            color: 'white',
                            border: '1px solid',
                            backgroundColor: '#212E52',
                            '&:hover': {
                                backgroundColor: '#212E52',
                                boxShadow: 'none',
                            }
                        }}>Delete</Button>

                        <Button onClick={handleClose} sx={{
                            ml: '110px',
                            color: 'white',
                            border: '1px solid',
                            backgroundColor: '#212E52',
                            '&:hover': {
                                backgroundColor: '#212E52',
                                boxShadow: 'none',
                            }
                        }}>Cancel</Button>
                    </Typography>
                </Box>
            </Modal>
        </Box>
    );
}
