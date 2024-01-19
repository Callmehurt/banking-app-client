import React from "react";
import moment from "moment";
import avatar from '../../images/customerAvatar.png'
import { Link } from "react-router-dom";

const SingleCustomer = ({name, registrationDate, accountNumber}) => {

    return (
        <>
            <a href="#" className="friends-suggestions-list">
                <div className="border-bottom position-relative">
                    <div className="float-left mb-0 mr-3">
                        <img src={avatar} alt="" className="rounded-circle thumb-md" />
                    </div>
                    <div className="suggestion-icon float-right mt-2 pt-1">
                        <Link to={`/system/account/${accountNumber}/detail`}><i className="mdi mdi-information"></i></Link>
                    </div>

                    <div className="desc">
                        <h5 className="font-14 mb-1 pt-2 text-dark">{name} - {accountNumber}</h5>
                        <p className="text-muted">{moment(registrationDate).format('MMM Do YYYY, h:mm:ss a')}</p>
                    </div>
                </div>
            </a>
        </>
    )
}

export default SingleCustomer;