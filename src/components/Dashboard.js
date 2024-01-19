import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CustomerDashboard from "./CustomerDashboard";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import SingleCustomer from "./adminStaffCommon/SingleCustomer";

const Dashboard = () => {

    const userDetail = useSelector((state) => state.authentication);
    const axiosPrivate = useAxiosPrivate();

    const [totalCustomer, setTotalCustomer] = useState(0);
    const [customers, setCustomers] = useState([]);

    useEffect(() => {

        const fetchCustomer = async () => {
            const res = await axiosPrivate.get('/fetch/all/customers');
            const list = res?.data.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
            setCustomers(list);
            setTotalCustomer(res.data.length);
        }


        if(userDetail.role !== 'customer'){
            fetchCustomer();
        }
    }, [])

    return (
        <>
        {
            userDetail.role === 'customer' ? (
                <CustomerDashboard userDetail={userDetail}/>
            ):(
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
                            <i className="mdi mdi-account-multiple bg-primary text-white"></i>
                        </div>
                        <div>
                            <h5 className="font-16">Total Customer</h5>
                        </div>
                        <h3 className="mt-4">{totalCustomer}</h3>
                    </div>
                </div>
            </div>
            <div className="col-xl-4">
                    <div className="card m-b-30">
                    <div className="card-header" style={{ background: '#09669F' }}>
                            <h6 className="text-white">Newly Registered Customers</h6>
                        </div>
                        <div className="card-body">
                            <div className="friends-suggestions">
                                {
                                    customers.map((cus) => {
                                        return <SingleCustomer name={cus.name} registrationDate={cus.createdAt} accountNumber={cus.accountNumber} />
                                    })
                                }
                                
                            </div>
                        </div>
                    </div>
                </div>

            </div>
                </>
            )
        }
        </>
    )
}

export default Dashboard;