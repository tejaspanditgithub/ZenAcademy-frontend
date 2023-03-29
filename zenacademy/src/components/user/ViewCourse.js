import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { axiosCoursePrivate } from "../../api/axios";

const ViewCourse=()=>{
    
    
    const { id } = useParams();
    const[courseR,setCourse]=useState({})
    const [recordingLinkN,setRecordingLinkN]=useState([])
    const navigate = useNavigate();
    const location = useLocation();
    const axiosPrivate = useAxiosPrivate(axiosCoursePrivate);

    useEffect(() => {
        let isMounted = true;
        const getCourse = async () => {
          try {
            const response = await axiosPrivate.get(`/course/${id}`);
            if (response?.data?.success) {
              const course = response.data.data;
            //   const currUser = users.find(user => user._id === id);
              setCourse(course)
              setRecordingLinkN(course.recordingLink)
            //   if (!currUser) {
            //     navigate('/admin/user');
            //   } else {
            //     isMounted && setUser(currUser);
                
            //   }
            }
          } catch (error) {
            console.log(error);
          }
        };
        getCourse();
        return () => {
          isMounted = false;
        };
      }, [axiosPrivate, navigate, location, id]);

    return(
        <>
        <h2
          style={{
            textAlign: "center",
          }}
        >
          {courseR.courseName}
        </h2>
          <div style={{
            marginLeft:"13%",
            marginRight:"13%"
        }}>
            <p><b>SGO : </b>{courseR.sgo}</p>

        <p ><b>Description : </b>{courseR.description}</p>
        <p ><b>Link: </b></p>
        <a href={courseR.recordingLink} target="_blank">{courseR.courseName}</a>
        
        </div>
        </>
    )
}

export default ViewCourse