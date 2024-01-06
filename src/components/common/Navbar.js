import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDashboard, faUsers} from "@fortawesome/free-solid-svg-icons";

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

              {/* <li className="has-submenu">
                  <a href="#"><FontAwesomeIcon icon={faCalculator} className={'mr-1'} /> Accounting <i
                      className="mdi mdi-chevron-down mdi-drop"></i></a>
                  <ul className="submenu megamenu">
                      <li>
                          <ul>
                              <li><Link to={'/admin/expenses'}>Expenses</Link></li>
                              <li><Link to={'/admin/cash-flows'}>Cash FLow History</Link></li>
                          </ul>
                      </li>
                  </ul>
              </li> */}
          </ul>
      </div>
    )
}

export default Navbar;