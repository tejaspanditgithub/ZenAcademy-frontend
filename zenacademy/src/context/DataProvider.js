import { createContext, useState } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [err,setErr]=useState('');
    const [users,setUsers]=useState([]);
    const [courses,setCourses]=useState([]);

    return (
        <DataContext.Provider value={{ 
            auth, setAuth,
            err,setErr ,
            users,setUsers,
            courses,setCourses
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;