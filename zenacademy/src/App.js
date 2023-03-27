import Layout from './components/Layout';
import { Routes, Route } from "react-router-dom";
import Login from './Login';
import NotFound from './components/NotFound';
import Unauthorized from './components/Unauthorized';
import Udashboard from './components/user/Userdashboard'
import Mylearning from './components/user/Mylearning'
import Myreport from './components/user/Myreport';
import Courses from './components/user/Courses';
import Bookmark from './components/user/Bookmark';
import LdDashboard from './components/LearningAndDevlopment/LdDashboard';
import Addlink from './components/LearningAndDevlopment/Addlink';
import Profile from './components/Profile';
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminLayout from './components/admin/AdminLayout';
import LdLayout from './components/LearningAndDevlopment/LdLayout';
import SgoDashboard from './components/sgo/SgoDashboard';
import SgoLayout from './components/sgo/SgoLayout';
import User from './components/admin/User';
import RegisterUser from './components/admin/RegisterUser';
import EditUser from './components/admin/EditUser';
import Course from './components/admin/Course';
import AssignCourse from './components/sgo/AssignCourse'
import EditCourse from'./components/admin/EditCourse';
import RegisterCourse from './components/admin/RegisterCourse';


export default function App() {

  return (
    <div>
      <Routes>
        <Route path='/login' element={<Login/>}/>

        <Route path='/employee' element={<Layout/>}>
          <Route element={<PersistLogin/>}>
            <Route element={<RequireAuth allowedRole={'employee'}/>}>
              <Route index element={<Udashboard/>}/>
              <Route path='myLearning' element={<Mylearning/>}/>
              <Route path='courses' element={<Courses/>}/>
              <Route path='bookmark' element={<Bookmark/>}/>
              <Route path='report' element={<Myreport/>}/>
            </Route>
          </Route>
        </Route>
        <Route path='/admin' element={<AdminLayout/>}>
          <Route element={<PersistLogin/>}>
            <Route element={<RequireAuth allowedRole={'admin'}/>}>
              <Route index element={<AdminDashboard/>}/>
              <Route path='user'>
                <Route index element={<User/>}/>
                <Route path='register' element={<RegisterUser/>}/>
                <Route path='edit/:id' element={<EditUser/>}/>
              </Route>
              <Route path='course'>
                <Route index element={<Course/>}/>
                <Route path='register' element={<RegisterCourse/>}/>
                <Route path='edit/:id' element={<EditCourse/>}/>
              </Route>
            </Route>
          </Route>
        </Route>
        <Route path='/l&d' element={<LdLayout/>}>
          <Route element={<PersistLogin/>}>
            <Route element={<RequireAuth allowedRole={'l&d'}/>}>
              <Route index element={<LdDashboard/>}/>
            </Route>
          </Route>
        </Route>
        <Route path='/sgo' element={<SgoLayout/>}>
          <Route element={<PersistLogin/>}>
            <Route element={<RequireAuth allowedRole={'sgo'}/>}>
              <Route index element={<SgoDashboard/>}/>
              <Route path='assignCourse/:id' element={<AssignCourse/>}/>
            </Route>
          </Route>
        </Route>
      </Routes>

    </div>
  );
}


