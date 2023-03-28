import React, { useEffect } from 'react'
import { Box } from '@mui/system'
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { axiosUserPrivate } from "../api/axios";
import useData from "../hooks/useData";




function Profile() {

    const { user, setUser } = useData();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosPrivate = useAxiosPrivate(axiosUserPrivate);

    useEffect(() => {
        let isMounted = true;
        const getUser = async () => {
            try {
                const response = await axiosPrivate.get("/user");
                console.log(response.data.data)
                setUser(response.data.data)
            //     if (response?.data?.success) {
            //         isMounted && setUser(response?.data?.data)
            //     }
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

        </Box>
    )
}

export default Profile