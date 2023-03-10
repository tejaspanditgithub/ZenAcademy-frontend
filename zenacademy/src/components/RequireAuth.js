import { useLocation, Navigate, Outlet } from "react-router-dom";
import useData from "../hooks/useData";

const RequireAuth = ({ allowedRole }) => {
    const { auth } = useData();
    const location = useLocation();
    console.log(auth);
    console.log(allowedRole)
    return (
        allowedRole.includes(auth?.userRoll) 
        ?<Outlet />
        : auth?.userRoll 
            ? <Navigate to="/unauthorized" state={{ from: location }} replace />
            : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;