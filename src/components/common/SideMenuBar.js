import React from "react";
import {useSelector} from "react-redux";
import MainNav from "./MainNav";

const SideMenuBar = () => {

    const userDetail = useSelector((state) => state.authentication.user);
    console.log('user details', userDetail);

    return (
        <>
            <div className="left side-menu">
                <div className="slimscroll-menu" id="remove-scroll">

                    <div id="sidebar-menu">
                        {
                            userDetail.role === 'admin' ? <MainNav/> : ''
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default SideMenuBar;