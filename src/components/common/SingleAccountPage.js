import React, { useEffect, useState } from "react";
import AccountPage from "./AccountPage";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";


const SingleAccountPage = () => {

    const {accountNumber} = useParams();

    const axiosPrivate = useAxiosPrivate();

    const [detail, setDetail] = useState({
        customer: null,
        account: null,
        balance: null
    })

    useEffect(() => {
        const abortController = new AbortController();

        const fetchAccountDetail = async (accountNumber) => {
            try{

                const res = await axiosPrivate.get(`/account/detail/${accountNumber}`, {
                    signal: abortController.signal
                });
                console.log(res);
                if(res.status === 200){
                    const newData = {...detail}
                    const {customerId, ...other} = res.data.account 
                    newData.customer = customerId;
                    newData.account = other;
                    newData.balance = res.data.balance;
                    setDetail(newData);
                }
            }catch(err){
                console.log('Error', err);
            }
        }

        fetchAccountDetail(accountNumber);

        return () => {
            abortController.abort();
        }
    }, [accountNumber])


    return (
        <>
        <div className="page-title-box">
              <div className="row align-items-center">
                  <div className="col-sm-12">
                      <ol className="breadcrumb float-right">
                          <li className="breadcrumb-item active">Customers</li>
                      </ol>
                  </div>
              </div>
          </div>

          <div className="row justify-content-center">
                    {
                        detail.customer ? (
                            <AccountPage customer={detail.customer} account={detail.account} balance={detail.balance}/>
                        ): ''
                    }
          </div>
        </>
    )
}

export default SingleAccountPage;