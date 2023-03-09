import Layout from './components/Layout';
import { Routes, Route } from "react-router-dom";
import Login from './Login';
import NotFound from './components/NotFound';
import Unauthorized from './components/Unauthorized';
import Udashboard from './components/user/Userdashboard'
import Mylearning from './components/user/Mylearning'
import Myreport from './components/user/Myreport';
import Mycourse from './components/user/Mycourse';
import Bookmark from './components/user/Bookmark';
import LdDashboard from './components/LearningAndDevlopment/LdDashboard';
import Addlink from './components/LearningAndDevlopment/Addlink';
import Profile from './components/Profile';
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin';
export default function App() {

  return (
    <div>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Layout/>}>
          <Route element={<PersistLogin/>}>
            <Route element={<RequireAuth allowedRole={'employee'}/>}>
              <Route index element={<Udashboard/>}/>
            </Route>

          </Route>

        </Route>
      </Routes>

    </div>
  );
}


