import React, { useEffect, useRef, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import CustomerList from "./CustomerList";
import { useDispatch } from "react-redux";
import { fetchCustomers } from "../../redux/actions/customer-action";

const Customers = () => {

    const axiosPrivate = useAxiosPrivate();
    const dispatch = useDispatch();

    const effectRun = useRef(false);

    useEffect(() => {

        const abortController = new AbortController();

        const fetchAllCustomers = async () => {

            const res = await axiosPrivate.get('/fetch/all/customers', {
                signal: abortController.signal
            })

            dispatch(fetchCustomers(res?.data))
        }

        if(effectRun.current){
            fetchAllCustomers();
        }

        return () => {
            effectRun.current = true;
            abortController.abort();
        }
    }, []);


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

          <div className="row">
              <div className="col-lg-12">
                   <div className="card m-b-30">
                        <div className="card-body">
                            <CustomerList/>
                        </div>
                   </div>
              </div>
          </div>
        </>
    )
}

export default Customers;