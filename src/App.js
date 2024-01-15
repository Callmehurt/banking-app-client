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
import Dashboard from './components/Dashboard';
import Customers from './components/adminStaffCommon/Customers';
import Transaction from './components/adminStaffCommon/DepositTransaction';
import ViewAccount from './components/adminStaffCommon/ViewAccount';
import WithdrawTransaction from './components/adminStaffCommon/transactions/WithdrawTransaction';
import TransferTransaction from './components/adminStaffCommon/transactions/TransferTransaction';
import SingleAccountPage from './components/common/SingleAccountPage';
import MyAccountPage from './components/customer/MyAccountPage';
import Payment from './components/customer/Payment';


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
              <Route exact path='/system/account/detail' element={<ViewAccount/>} />
              <Route exact path='/system/account/:accountNumber/detail' element={<SingleAccountPage/>} />
              <Route exact path='/system/transaction/deposit' element={<Transaction/>} />
              <Route exact path='/system/transaction/withdraw' element={<WithdrawTransaction/>} />
              <Route exact path='/system/transaction/transfer' element={<TransferTransaction/>} />


            </Route>
          </Route>
          <Route element={<RequireAuth allowedRole={['customer']} />}>
            <Route element={<AppLayout/>}>
              <Route exact path='/system/customer/account' element={<MyAccountPage/>} />
              <Route exact path='/system/customer/payment' element={<Payment/>} />
            </Route>
          </Route>
        </Route>

        <Route path={'*'} element={<NotFound/>} />

      </Route>
    </Routes>
  );
}

export default App;
