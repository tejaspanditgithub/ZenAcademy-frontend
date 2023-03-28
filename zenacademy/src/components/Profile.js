import React, { useEffect , useState} from 'react'
import { Box } from '@mui/system'
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { axiosUserPrivate } from "../api/axios";
import useData from "../hooks/useData";
import Paper from '@mui/material/Paper';import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';




function Profile() {

    const {users, setUsers } = useData();
    
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const location = useLocation();
    const axiosPrivate = useAxiosPrivate(axiosUserPrivate);

    useEffect(() => {
        let isMounted = true;
        const getUser = async () => {
            try {
                const response = await axiosPrivate.get("/user");
                if (response?.data?.success) {
                    isMounted && setUsers(response?.data?.data);
                    console.log(response.data.data);
                    setUser(response.data.data)
                }
            console.log(users)
            } 
            catch (error) {
            //  navigate("/login", { state: { from: location }, replace: true });
                console.log(error)
            }
        };
        getUser();
        return () => {
            isMounted = false;
        };
    }, [])


    return (
        <Box sx={{ ml: '5%' }}>
            <div style={{ padding: '8px', marginTop: '10px', color: "#2C3333", fontSize: "30Px", textAlign: "center" }}>Profile</div>
            
      
      <TableContainer component={Paper} elevation={3}
                sx={{
                    minWidth: 650,
                    width: "80%",
                    margin: 'auto',
                    
                }}>

                <Table aria-label="simple table" sx={{
                    minWidth: 650, border: '1px'
                }}>
                    <TableBody>
                        <TableRow >
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">{users.name}</TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell align="left">UserName</TableCell>
                            <TableCell align="left">{users.userName}</TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell align="left">ID</TableCell>
                            <TableCell align="left">{users._id}</TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell align="left">EMail</TableCell>
                            <TableCell align="left">{users.email}</TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell align="left">SGO</TableCell>
                            <TableCell align="left">{users.sgo}</TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell align="left">Role</TableCell>
                            <TableCell align="left">{users.userRoll}</TableCell>
                        </TableRow>
                    </TableBody>
                    
                </Table>

            </TableContainer>
         
        </Box>
    )
}

export default Profile