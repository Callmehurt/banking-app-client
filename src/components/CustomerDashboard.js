import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const CustomerDashboard = ({userDetail}) => {

    const axiosPrivate = useAxiosPrivate();
    const [balance, setBalance] = useState(0);


    useEffect(() => {

        const abortController = new AbortController();

        const fetchAccountDetail = async () => {
            try{

                const res = await axiosPrivate.get('/account/customer/my/account', {
                    signal: abortController.signal
                })

                if(res.status === 200){
                    setBalance(res.data?.balance.balance);
                }

            }catch(err){
                console.log(err);
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
              <div className="row align-items-center">
                  <div className="col-sm-12">
                      <ol className="breadcrumb float-right">
                          <li className="breadcrumb-item active">Dashboard</li>
                      </ol>
                  </div>
              </div>
        </div>
        <div className="row">

            <div className="col-sm-6 col-xl-3">
                <div className="card">
                    <div className="card-heading p-4">
                        <div className="mini-stat-icon float-right">
                            <i className="mdi mdi-cube-outline bg-primary text-white"></i>
                        </div>
                        <div>
                            <h5 className="font-16">Account Number</h5>
                        </div>
                        <h3 className="mt-4">{userDetail?.customer.accountNumber}</h3>
                    </div>
                </div>
            </div>
            <div className="col-sm-6 col-xl-3">
                    <div className="card">
                        <div className="card-heading p-4">
                            <div className="mini-stat-icon float-right">
                                <i className="mdi mdi-cash-multiple bg-success text-white"></i>
                            </div>
                            <div>
                                <h5 className="font-16">Total Balance</h5>
                            </div>
                            <h3 className="mt-4">£{balance}</h3>
                        </div>
                    </div>
                </div>
        </div>

        </>
    )
}

export default CustomerDashboard;