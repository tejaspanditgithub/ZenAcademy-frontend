import React from "react";
import { Outlet } from 'react-router-dom';
import Footer from "../Footer";
import AdminSidebar from "./AdminSidebar";

const AdminLayout=()=>{
    return(<>
    <AdminSidebar/>
    <Outlet/>
    <Footer/>
    </>)
}

export default AdminLayout;