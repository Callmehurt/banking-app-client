import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { notifyError } from "../toastNotification";
import AccountPage from "../common/AccountPage";

const MyAccountPage = () => {

    const axiosPrivate = useAxiosPrivate();

    const [detail, setDetail] = useState({
        customer: null,
        account: null,
        balance: null
    })

    useEffect(() => {

        const abortController = new AbortController();

        const fetchAccountDetail = async () => {
            try{

                const res = await axiosPrivate.get('/account/customer/my/account', {
                    signal: abortController.signal
                })

                if(res.status === 200){
                    const newData = {...detail}
                    const {customerId, ...other} = res.data.account 
                    newData.customer = customerId;
                    newData.account = other;
                    newData.balance = res.data.balance;
                    setDetail(newData);
                    // action.resetForm();
                }else{
                    notifyError('Something went wrong!');
                }
                console.log(res);

            }catch(err){
                console.log(err);
                notifyError(err?.response?.data.message);
            }
        }

        fetchAccountDetail();

        return () => {
            abortController.abort();
        }


    }, [])

    
    return (
        <>
            <div className="page-title-box">
              <div className="row">
                  <div className="col-sm-12">
                      <ol className="breadcrumb float-right">
                          <li className="breadcrumb-item active">My Account</li>
                      </ol>
                  </div>
               </div>
            </div>

          <div className="row">
            {
                detail.customer ? (
                    <AccountPage customer={detail.customer} account={detail.account} balance={detail.balance}/>
                ): ''
              }
            </div>
        </>
    )
}

export default MyAccountPage;