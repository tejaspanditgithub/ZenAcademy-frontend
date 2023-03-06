import Layout from './components/Layout';
import { BrowserRouter , Routes, Route } from "react-router-dom";
import Login from './Login';
import NotFound from './components/NotFound';
// import Unauthorized from './components/Unauthorized';
import Udashboard from './components/user/Userdashboard'
import Mylearning from './components/user/Mylearning'
import Myreport from './components/user/Myreport';
import Mycourse from './components/user/Mycourse';
import Bookmark from './components/user/Bookmark';
import LdDashboard from './components/LearningAndDevlopment/LdDashboard';
import Addlink from './components/LearningAndDevlopment/Addlink';
import Profile from './components/Profile';
export default function App() {

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Layout />}>
        <Route path='/user/dashboard' element={<Udashboard />} />
        <Route path='/user/mylearning' element={<Mylearning />} />
        <Route path='/user/myreport' element={<Myreport />} />
        <Route path='/user/mycourse' element={<Mycourse />} />
        <Route path='/user/bookmark' element={<Bookmark />} />
        <Route path='/user/profile' element={<Profile />} />
        <Route path='/l&d/dashboard' element={<LdDashboard />} />
        <Route path='/l&d/addlink' element={<Addlink />} />
        </Route> 
        <Route path='*' element={<NotFound />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}


