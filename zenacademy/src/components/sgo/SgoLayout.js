import React from "react";
import { Outlet } from 'react-router-dom';
import Footer from "../Footer";
import SgoSidebar from "./SgoSidebar";

const SgoLayout=()=>{
    return(<>
    <SgoSidebar/>
    <Outlet/>
    <Footer/>
    </>)
}

export default SgoLayout;