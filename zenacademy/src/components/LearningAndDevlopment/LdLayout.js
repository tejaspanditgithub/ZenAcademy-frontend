import React from "react";
import { Outlet } from 'react-router-dom';
import Footer from "../Footer";

const LdLayout=()=>{
    return(<>
    <Outlet/>
    <Footer/>
    </>)
}

export default LdLayout;