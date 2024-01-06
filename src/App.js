// import logo from './images/logo192.png';
import './App.css';
import './style.css';
import 'react-toastify/dist/ReactToastify.css';
import {Routes, Route} from 'react-router-dom'


import Layout from './components/Layout';
import Homepage from './components/Homepage';
import Login from './components/Login';
import NotFound from "./components/NotFound";
import PersistLogin from './components/PersitLogin';
import RequireAuth from './components/RequireAuth';
import AppLayout from './components/common/AppLayout';
import Dashboard from './components/admin/Dashboard';
import Customers from './components/adminStaffCommon/Customers';


function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>

      ``<Route path={'/'} element={<Homepage/>}/>
        {/* Protected Routes */}
        <Route element={<PersistLogin/>}>

          <Route exact path={'/user/login'} element={<Login/>}/>

          {/* Authenticated User Only */}
          <Route element={<RequireAuth allowedRole={['admin', 'staff', 'customer']} />}>
            <Route element={<AppLayout/>}>

              <Route exact path='/system/dashboard' element={<Dashboard/>} />
              <Route exact path='/system/customers/list' element={<Customers/>} />

            </Route>
          </Route>
        </Route>

        <Route path={'*'} element={<NotFound/>} />

      </Route>
    </Routes>
  );
}

export default App;
