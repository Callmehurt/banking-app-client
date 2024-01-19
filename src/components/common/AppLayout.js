import {Outlet} from 'react-router-dom'
import Header from './Header';
import {ToastContainer} from "react-toastify";

const Layout = () => {
    return (
        <>
        <ToastContainer/>
            <Header/>
            <div className="wrapper">
                <div className="container-fluid">
                    <Outlet/>
                </div>
            </div>
            <footer class="footer">
                © {new Date().getFullYear()} ABC Banking Group <span class="d-none d-sm-inline-block"> - Developed By Sandip Shrestha</span>.
            </footer>
        </>
    )
}

export default Layout;