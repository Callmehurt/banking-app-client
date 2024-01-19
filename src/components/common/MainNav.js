import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBoxesStacked, faDashboard, faDolly, faPhotoFilm} from "@fortawesome/free-solid-svg-icons";

const MainNav = () => {
    return (
        <>
            <ul className="metismenu" id="side-menu">
                <li className="menu-title">Menu</li>
                <li>
                    <Link to={`/admin/dashboard`}><FontAwesomeIcon icon={faDashboard} className={'mr-1'} /> Dashboard</Link>
                </li>
                <li className="has-submenu">
                    <Link to={`/admin/medias`}><FontAwesomeIcon icon={faPhotoFilm} className={'mr-1'} /> Medias</Link>
                </li>
                <li className="has-submenu">
                    <Link to={`/admin/providers`}><FontAwesomeIcon icon={faPhotoFilm} className={'mr-1'} /> Providers</Link>
                </li>
                <li className="has-submenu">
                        <a href="#"><FontAwesomeIcon icon={faPhotoFilm} className={'mr-1'} /> Transactions <i
                            className="mdi mdi-chevron-down mdi-drop"></i></a>
                        <ul className="submenu megamenu">
                            <li>
                                <ul>
                                    <li><Link to={'/system/transaction/deposit'}>Deposit Amount</Link></li>
                                    <li><Link to={'/system/transaction/withdraw'}>Withdraw Amount</Link></li>
                                    <li><Link to={'/system/transaction/transfer'}>Transfer Amount</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
            </ul>
        </>
    )
}

export default MainNav;