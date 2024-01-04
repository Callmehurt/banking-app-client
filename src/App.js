// import logo from './images/logo192.png';
import './App.css';
import './style.css';
import {Routes, Route} from 'react-router-dom'


import Layout from './components/Layout';
import Homepage from './components/Homepage';
import Login from './components/Login';
import NotFound from "./components/NotFound";
import PersistLogin from './components/PersitLogin';


function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>

        {/* Protected Routes */}
        <Route element={<PersistLogin/>}>

          <Route path={'/'} element={<Homepage/>}/>
          <Route path={'/user/login'} element={<Login/>}/>

        </Route>

        <Route path={'*'} element={<NotFound/>} />

      </Route>
    </Routes>
  );
}

export default App;
