import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDashboard, faUsers, faReceipt, faUser, faSterlingSign} from "@fortawesome/free-solid-svg-icons";

const Navbar = ({userDetail, menu}) => {

    return (
        <div id="navigation" className={menu === 'open' ? 'active' : ''}>
          <ul className="navigation-menu">
              <li className="has-submenu">
                  <Link to="/system/dashboard"><FontAwesomeIcon icon={faDashboard} className={'mr-1'} /> Dashboard</Link>
              </li>
              {
                userDetail.role !== 'customer' ? (
                    <>
                    <li className="has-submenu">
                        <Link to="/system/customers/list"><FontAwesomeIcon icon={faUsers} className={'mr-1'} /> Customers</Link>
                    </li>
                    <li className="has-submenu">
                        <Link to="/system/account/detail"><FontAwesomeIcon icon={faSterlingSign} className={'mr-1'} /> Account Detail</Link>
                    </li>
                    <li className={menu === 'open' ? `has-submenu ${menu}` : 'has-submenu'}>
                        <a href="#"><FontAwesomeIcon icon={faReceipt} className={'mr-1'} /> Transactions <i
                            className="mdi mdi-chevron-down mdi-drop"></i></a>
                        <ul className={menu === 'open' ? `submenu megamenu ${menu}` : 'submenu megamenu'}>
                            <li>
                                <ul>
                                    <li><Link to={'/system/transaction/deposit'}>Deposit Amount</Link></li>
                                    <li><Link to={'/system/transaction/withdraw'}>Withdraw Amount</Link></li>
                                    <li><Link to={'/system/transaction/transfer'}>Transfer Amount</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    </>
                ): (
                    <>
                        <li className="has-submenu">
                            <Link to="/system/customer/account"><FontAwesomeIcon icon={faUser} className={'mr-1'} /> My Account</Link>
                        </li>
                        <li className="has-submenu">
                        <Link to="/system/customer/payment"><FontAwesomeIcon icon={faSterlingSign} className={'mr-1'} /> Payments</Link>
                        </li>
                    </>
                )
              }
          </ul>
      </div>
    )
}

export default Navbar;