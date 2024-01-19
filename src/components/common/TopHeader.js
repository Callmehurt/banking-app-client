import React from "react";
import {Link, useNavigate} from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import {useSelector} from "react-redux";

import logo from '../../images/logo.png'
import avatar from '../../images/avatar.png'

const TopHeader = () => {

    const logout = useLogout();
    const navigate = useNavigate();
    const userDetail = useSelector((state) => state.authentication.user)

    const signOut = async () => {
        await logout();
        navigate('/user/login')
    }

    return (
        <>
            <div className="topbar">

                <div className="topbar-left">
                    <Link to={`/${userDetail.role}/dashboard`} className={'logo'}>
                        <span className="logo-light" style={{fontFamily: 'Dancing Script', letterSpacing: '1px', fontSize: '12px'}}>
                               <img src={logo} alt="logo" height='45' className="rounded-circle" /> The Chiya Station  2.0
                        </span>
                  </Link>
                </div>

                <nav className="navbar-custom">
                    <ul className="navbar-right list-inline float-right mb-0">


                        <li className="dropdown notification-list list-inline-item">
                            <a className="nav-link dropdown-toggle arrow-none waves-effect" data-toggle="dropdown"
                               href="#" role="button" aria-haspopup="false" aria-expanded="false">
                                <i className="mdi mdi-bell-outline noti-icon"></i>
                                <span className="badge badge-pill badge-danger noti-icon-badge">3</span>
                            </a>
                            <div
                                className="dropdown-menu dropdown-menu-right dropdown-menu-animated dropdown-menu-lg px-1">
                                <h6 className="dropdown-item-text">
                                    Notifications
                                </h6>
                                <div className="slimscroll notification-item-list">
                                    <a href="" className="dropdown-item notify-item active">
                                        <div className="notify-icon bg-success"><i className="mdi mdi-cart-outline"></i>
                                        </div>
                                        <p className="notify-details"><b>Your order is placed</b><span
                                            className="text-muted">Dummy text of the printing and typesetting industry.</span>
                                        </p>
                                    </a>

                                    <a href="" className="dropdown-item notify-item">
                                        <div className="notify-icon bg-danger"><i
                                            className="mdi mdi-message-text-outline"></i></div>
                                        <p className="notify-details"><b>New Message received</b><span
                                            className="text-muted">You have 87 unread messages</span></p>
                                    </a>

                                    <a href="" className="dropdown-item notify-item">
                                        <div className="notify-icon bg-info"><i className="mdi mdi-filter-outline"></i>
                                        </div>
                                        <p className="notify-details"><b>Your item is shipped</b><span
                                            className="text-muted">It is a long established fact that a reader will</span>
                                        </p>
                                    </a>

                                    <a href="" className="dropdown-item notify-item">
                                        <div className="notify-icon bg-success"><i
                                            className="mdi mdi-message-text-outline"></i></div>
                                        <p className="notify-details"><b>New Message received</b><span
                                            className="text-muted">You have 87 unread messages</span></p>
                                    </a>
                                    <a href="" className="dropdown-item notify-item">
                                        <div className="notify-icon bg-warning"><i className="mdi mdi-cart-outline"></i>
                                        </div>
                                        <p className="notify-details"><b>Your order is placed</b><span
                                            className="text-muted">Dummy text of the printing and typesetting industry.</span>
                                        </p>
                                    </a>

                                </div>
                                <a href=""
                                   className="dropdown-item text-center notify-all text-primary">
                                    View all <i className="fi-arrow-right"></i>
                                </a>
                            </div>
                        </li>

                        <li className="dropdown notification-list list-inline-item">
                            <div className="dropdown notification-list nav-pro-img">
                                <a className="dropdown-toggle nav-link arrow-none nav-user" data-toggle="dropdown"
                                   href="#" role="button" aria-haspopup="false" aria-expanded="false">
                                    <img src={avatar} alt="user" className="rounded-circle" />
                                </a>
                                <div className="dropdown-menu dropdown-menu-right profile-dropdown ">
                                    <a className="dropdown-item" href="#"><i className="mdi mdi-account-circle"></i> {userDetail.username}</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item text-danger" href="#" onClick={signOut}><i
                                        className="mdi mdi-power text-danger"></i> Logout</a>
                                </div>
                            </div>
                        </li>

                    </ul>

                    <ul className="list-inline menu-left mb-0">
                        <li className="float-left">
                            <button className="button-menu-mobile open-left waves-effect">
                                <i className="mdi mdi-menu"></i>
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default TopHeader;