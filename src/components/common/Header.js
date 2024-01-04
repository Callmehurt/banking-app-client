import {Link, useNavigate} from "react-router-dom";
import useLogout from '../../hooks/useLogout'
import {useSelector} from "react-redux";

import logo from '../../images/logo.png'
import avatar from '../../images/avatar.png'
import Navbar from "./Navbar";


const Header = () => {

    const logout = useLogout();
    const navigate = useNavigate();
    const userDetail = useSelector((state) => state.authentication)

     const signOut = async () => {
        const res = await logout();
        if(res){
            navigate('/user/login')
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
                                           <img src={logo} alt="logo" height='45' className="rounded-circle" /> The ABC Bank
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
                                                  className="mdi mdi-account-circle"></i>{userDetail.role !== 'customer' ? userDetail.user.username : ''}</a>
                                              <div className="dropdown-divider"></div>
                                              <a className="dropdown-item text-danger" href="#" onClick={signOut}><i
                                                  className="mdi mdi-power text-danger"></i> Logout</a>
                                          </div>
                                      </div>
                                  </li>

                                  {/*<li className="menu-item dropdown notification-list list-inline-item">*/}
                                  {/*    <a className="navbar-toggle nav-link">*/}
                                  {/*        <div className="lines">*/}
                                  {/*            <span></span>*/}
                                  {/*            <span></span>*/}
                                  {/*            <span></span>*/}
                                  {/*        </div>*/}
                                  {/*    </a>*/}
                                  {/*</li>*/}

                              </ul>

                          </div>

                          <div className="clearfix"></div>

                      </div>
                  </div>

                  <div className="navbar-custom">
                      <div className="container-fluid">
                        <Navbar userDetail={userDetail}/>
                      </div>
                  </div>
              </header>
          </div>
      </>
  )
}

export default Header;