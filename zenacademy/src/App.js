import Layout from './components/Layout';

import { BrowserRouter , Routes, Route } from "react-router-dom";
import Login from './Login';
import NotFound from './components/NotFound';
import Unauthorized from './components/Unauthorized';
import Udashboard from './components/user/Udashboard'
import Mylearning from './components/user/Mylearning'
import Myreport from './components/user/Myreport';
import Mycourse from './components/user/Mycourse';
import Bookmark from './components/user/Bookmark';
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
          {/* <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRole={'admin'} />}>
              <Route index element={<Dashboard />} />
              <Route path='panel'>
                <Route index element={<Panel />} />
                <Route path='register' element={<RegisterPanel />} />
                <Route path='edit/:id' element={<EditPanel />} />
              </Route>
              <Route path='candidate'>
                <Route index element={<Candidate />} />
                <Route path='register' element={<RegisterCandidate />} />
                <Route path='edit/:id' element={<EditCandidate />} />
              </Route>
            </Route>
            <Route path='interview'>
              <Route element={<RequireAuth allowedRole={'admin'} />}>
                <Route index element={<Interviews />} />
              </Route>
              <Route element={<RequireAuth allowedRole={'admin'} />}>
                <Route path='schedule' element={<ScheduleInterview />} />
              </Route>
              <Route element={<RequireAuth allowedRole={'tech hr admin'} />}>
                <Route path='edit/:id' element={<UpdateInterview />} />
              </Route>
            </Route>
            <Route path='interviewer'>
              <Route element={<RequireAuth allowedRole={'tech hr'} />}>
                <Route index element={<Interviewer />} />
              </Route>
            </Route>
          </Route> */}
          <Route path='unauthorized' element={<Unauthorized />} />
        </Route> 
        <Route path='*' element={<NotFound />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}


