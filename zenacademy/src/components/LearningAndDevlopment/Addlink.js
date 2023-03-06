import { Box } from '@mui/system'
import { useState } from 'react';
import './Addlink.css'
import Paper from '@mui/material/Paper';
import { Button, FormControl, Select, TextField, MenuItem } from '@mui/material';



function Addlink() {
    const [course, setCourse] = useState('');
    const [sgo, setSgo] = useState('');
    const [link, setLink] = useState('');



    const handleSgo = (event) => {
        setSgo(event.target.value);
        console.log(sgo)
    };
    const handleCourse = (event) => {
        setCourse(event.target.value);
        console.log(course)
    };
    const handleLink = (event) => {
        setLink(event.target.value);
        console.log(link)
    };


    return (
        <Box component={Paper} elevation={3}
            sx={{
                minWidth: 650,
                width: "60%",
                mt: '5%',
                ml: '20%',
            }}>
            <div className="Addlink" style={{ width: '70%', margin: 'auto' }}>


                <Box sx={{ width: '100%', marginBottom: '10px', zIndex: 'tooltip' }}>
                    <FormControl fullWidth>
                        <Select
                            value={sgo}
                            onChange={handleSgo}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem value="">
                                <span>Select SGO</span>
                            </MenuItem>
                            <MenuItem value={1}>AES</MenuItem>
                            <MenuItem value={2}>DEA</MenuItem>
                            <MenuItem value={3}>AS</MenuItem>
                            <MenuItem value={4}>FS</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ width: '100%', marginBottom: '10px', zIndex: 'tooltip' }}>
                    <FormControl fullWidth>
                        <Select
                            value={course}
                            onChange={handleCourse}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem value=''>
                                <span>Select Course</span>
                            </MenuItem>
                            <MenuItem value={1}>AES</MenuItem>
                            <MenuItem value={2}>DEA</MenuItem>
                            <MenuItem value={3}>AS</MenuItem>
                            <MenuItem value={4}>FS</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box >
                    <TextField
                        required
                        id="outlined-required"
                        placeholder='Enter Link'
                        onClick={handleLink}
                        sx={{ width: '100%', marginBottom: '10px' }}
                    />
                </Box>
                <Box textAlign='center'>
                    <Button variant='contained' sx={{ backgroundColor: '#212E52' }}>
                        Submit
                    </Button>
                </Box>

            </div>
        </Box >
    );
}

export default Addlink;
