import React from "react";
import DepositForm from "./transactions/DepositForm";


const DepositTransaction = () => {
    return (
        <>
        <div className="page-title-box">
              <div className="row align-items-center">
                  <div className="col-sm-12">
                      <ol className="breadcrumb float-right">
                          <li className="breadcrumb-item active">Deposit Transactions</li>
                      </ol>
                  </div>
              </div>
          </div>

          <div className="row justify-content-center">
              <div className="col-lg-6">
                   <div className="card m-b-30">
                        <div className="card-body">
                            <DepositForm/>
                        </div>
                   </div>
              </div>
          </div>
        </>
    )
}

export default DepositTransaction;