import React from "react";
import moment from 'moment';

const AccountPage = ({customer, account, balance}) => {

    const transactions = account.transaction.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    // console.log('trans', account.transaction);


    return (
        <>
            <div className="col-lg-6">
                <div className="card m-b-30">
                    <div className="card-body">
                        <h6>Customer Detail</h6>
                        <hr/>
                        <p><strong>Name:</strong> <span>{customer.name}</span></p>
                        <p><strong>Address:</strong> <span>{customer.address}</span></p>
                        <p><strong>Phone:</strong> <span>{customer.phone}</span></p>
                        <p><strong>Email:</strong> <span>{customer.email}</span></p>
                    </div>
                </div>
            </div>
            <div className="col-lg-6">
                <div className="card m-b-30">
                    <div className="card-body">
                        <h6>Transactions</h6>
                        <hr/>
                        <span><strong>Available Balance:</strong> £{balance.balance}</span>
                        <span className="float-right"><strong>Total Credit:</strong> £{balance.totalCredit}</span>
                        <span className="float-right mr-2"><strong>Total Debit:</strong> £{balance.totalDebit}</span>
                        <hr/>
                        {
                            transactions.map((obj) => {
                                if(obj.type === 'credit'){
                                    return (
                                        <div style={{ marginTop: '7px', borderBottom: '1px solid gainsboro', marginBottom: '15px' }}>
                                        <div style={{ height: '5px', background: 'green', borderRadius: '5px 5px 0 0' }}>
                                        </div>
                                        <div style={{ paddingTop: '7px' }}>
                                            <span>Type: {obj.type}</span>
                                            <br></br>
                                            <span>Date: {moment(obj.createdAt).format('MMM Do YYYY, h:mm:ss a')}</span>
                                            <span className="float-right">Amount: £{parseFloat(obj.amount)}</span>
                                        </div>
                                    </div>
                                    )
                                }else if(obj.type === 'debit'){
                                    return (
                                        <div style={{ marginTop: '7px', borderBottom: '1px solid gainsboro', marginBottom: '15px' }}>
                                        <div style={{ height: '5px', background: 'red', borderRadius: '5px 5px 0 0' }}>
                                        </div>
                                        <div style={{ paddingTop: '7px' }}>
                                            <span>Type: {obj.type}</span>
                                            <br></br>
                                            <span>Date: {moment(obj.createdAt).format('MMM Do YYYY, h:mm:ss a')}</span>
                                            <span className="float-right">Amount: £{parseFloat(obj.amount)}</span>
                                        </div>
                                    </div>
                                    )
                                }else{
                                    return (
                                        <div style={{ marginTop: '7px', borderBottom: '1px solid gainsboro', marginBottom: '15px' }}>
                                        <div style={{ height: '5px', background: 'blue', borderRadius: '5px 5px 0 0' }}>
                                        </div>
                                        <div style={{ paddingTop: '7px' }}>
                                            <span>Type: {obj.type}</span>
                                            <br></br>
                                            <span>Date: {moment(obj.createdAt).format('MMM Do YYYY, h:mm:ss a')}</span>
                                            <span className="float-right">Amount: £{parseFloat(obj.amount)}</span>
                                        </div>
                                    </div>
                                    )
                                }
                            })
                        }
                    </div>
                </div>
            </div>        
        </>
    )
}

export default AccountPage;