import {Link, useNavigate} from "react-router-dom";
import useLogout from '../../hooks/useLogout'
import {useSelector} from "react-redux";

import logo from '../../images/logo.png'
import avatar from '../../images/avatar.png'
import Navbar from "./Navbar";
import { useEffect, useState } from "react";


const Header = () => {

    const logout = useLogout();
    const navigate = useNavigate();
    const userDetail = useSelector((state) => state.authentication);

    const [mobileMenu, setMobileMenu] = useState('close');

     const signOut = async () => {
        const res = await logout();
        if(res){
            navigate('/user/login')
        }       
    }

    const handleMobileMenu = () => {
        if(mobileMenu === 'close'){
            setMobileMenu('open');
        }else{
            setMobileMenu('close');
        }
    }
  return (
      <>

          <div className="header-bg">
              <header id="topnav">
                  <div className="topbar-main">
                      <div className="container-fluid">
                          <div>
                              <Link to={`/system/dashboard`} className={'logo'}>
                                    <span className="logo-light" style={{fontFamily: 'Dancing Script', letterSpacing: '1px'}}>
                                           <img src={logo} alt="logo" height='45' className="rounded-circle" style={{ background: 'white' }} /> The ABC Bank
                                    </span>
                              </Link>
                          </div>

                          <div className="menu-extras topbar-custom navbar p-0">

                              <ul className="navbar-right ml-auto list-inline float-right mb-0">

                                  <li className="dropdown notification-list list-inline-item">
                                      <div className="dropdown notification-list nav-pro-img">
                                          <a className="dropdown-toggle nav-link arrow-none nav-user"
                                             data-toggle="dropdown" href="#" role="button" aria-haspopup="false"
                                             aria-expanded="false">
                                              <img src={avatar} alt="user"
                                                   className="rounded-circle" />
                                          </a>
                                          <div className="dropdown-menu dropdown-menu-right profile-dropdown ">
                                              <a className="dropdown-item" href="#"><i
                                                  className="mdi mdi-account-circle"></i>{userDetail.role !== 'customer' ? userDetail.user.username : userDetail.customer.name}</a>
                                              <div className="dropdown-divider"></div>
                                              <a className="dropdown-item text-danger" href="#" onClick={signOut}><i
                                                  className="mdi mdi-power text-danger"></i> Logout</a>
                                          </div>
                                      </div>
                                  </li>
                                  <li class="menu-item dropdown notification-list list-inline-item" onClick={() => handleMobileMenu()}>
                                    <a class={`navbar-toggle nav-link ${mobileMenu}`}>
                                        <div class="lines">
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </a>
                                </li>
                              </ul>

                          </div>

                          <div className="clearfix"></div>

                      </div>
                  </div>

                  <div className="navbar-custom">
                      <div className="container-fluid">
                        <Navbar userDetail={userDetail} menu={mobileMenu}/>
                      </div>
                  </div>
              </header>
          </div>
      </>
  )
}

export default Header;