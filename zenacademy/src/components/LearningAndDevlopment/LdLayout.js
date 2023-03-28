import React from "react";
import { Outlet } from 'react-router-dom';
// import Footer from "../Footer";
import LdSidebar from './LdSidebar'

const LdLayout=()=>{
    return(<>
    <LdSidebar />
    <Outlet/>
    
    </>)
}

export default LdLayout;