// import logo from './images/logo192.png';
import './App.css';
import './style.css';
import {Routes, Route} from 'react-router-dom'


import Layout from './components/Layout';
import Homepage from './components/Homepage';
import Login from './components/Login';
import NotFound from "./components/NotFound";
import PersistLogin from './components/PersitLogin';
import RequireAuth from './components/RequireAuth';
import AppLayout from './components/common/AppLayout';
import Dashboard from './components/admin/Dashboard';


function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>

        {/* Protected Routes */}
        <Route element={<PersistLogin/>}>

          <Route path={'/'} element={<Homepage/>}/>
          <Route exact path={'/user/login'} element={<Login/>}/>

          {/* Authenticated User Only */}
          <Route element={<RequireAuth allowedRole={['admin', 'staff']} />}>
            <Route element={<AppLayout/>}>

              <Route exact path='/system/dashboard' element={<Dashboard/>} />

            </Route>
          </Route>
        </Route>

        <Route path={'*'} element={<NotFound/>} />

      </Route>
    </Routes>
  );
}

export default App;
