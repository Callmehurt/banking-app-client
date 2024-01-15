import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDashboard, faUsers, faReceipt} from "@fortawesome/free-solid-svg-icons";

const Navbar = ({userDetail}) => {

    return (
        <div id="navigation">
          <ul className="navigation-menu">
              <li className="has-submenu">
                  <Link to="/system/dashboard"><FontAwesomeIcon icon={faDashboard} className={'mr-1'} /> Dashboard</Link>
              </li>
              <li className="has-submenu">
                  <Link to="/system/customers/list"><FontAwesomeIcon icon={faUsers} className={'mr-1'} /> Customers</Link>
              </li>
              <li className="has-submenu">
                  <Link to="/system/account/detail"><FontAwesomeIcon icon={faUsers} className={'mr-1'} /> Account Detail</Link>
              </li>
              <li className="has-submenu">
                  <a href="#"><FontAwesomeIcon icon={faReceipt} className={'mr-1'} /> Transactions <i
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
      </div>
    )
}

export default Navbar;