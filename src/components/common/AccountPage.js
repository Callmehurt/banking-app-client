import React, { useRef, useState } from "react";
import moment from 'moment';
import { useFormik } from "formik";
import { transactionFilterValidationSchema } from "../../validation-schema";
import { StatementPrintComponent } from "./StatementPrintComponent";
import { useReactToPrint } from "react-to-print";

const AccountPage = ({customer, account, balance}) => {

    const transactions = account.transaction.sort((a, b) => b.createdAt.localeCompare(a.createdAt));

    const [filteredTransactions, setFilteredTransactions] = useState(transactions);

    function getCurrentDate() {
        let date = new Date();
    
        return date.getFullYear()+'-'+date.getMonth()+1+'-'+date.getDate()
    }

    const initialValue = {
        startDate: getCurrentDate(),
        endDate: getCurrentDate(),
    }

    const {values, errors, handleBlur, handleChange, handleSubmit, touched} = useFormik({
        initialValues: initialValue,
        enableReinitialize: true,
        validationSchema: transactionFilterValidationSchema,
        onSubmit: async (values, action) => {

            const sd = new Date(values.startDate).getTime();
            const ed = new Date(values.endDate).getTime();

            if(sd === ed){
                const filteredData = transactions.filter((item) => {
                    const itemDate = new Date(item.createdAt);
                    itemDate.setHours(0, 0, 0, 0); 
                    return itemDate.getTime() === sd;
                });
                setFilteredTransactions(filteredData);
            }else{
                const filteredData = transactions.filter((item) => {
                    return new Date(item.createdAt).getTime() >= sd && new Date(item.createdAt).getTime() <= ed;
                  });
    
                setFilteredTransactions(filteredData); 
            }
        }
    })

    const componentRef = useRef();

    const handleStatementPrint = useReactToPrint({
        content: () => componentRef.current
    });


    return (
        <>
            <StatementPrintComponent transactions={filteredTransactions} ref={componentRef}/>
            <div className="col-lg-5">
                <div className="card m-b-30">
                    <div className="card-header" style={{ background: '#09669F' }}>
                            <h6 className="text-white">Customer Information</h6>
                        </div>
                    <div className="card-body">
                        <h6>Customer Detail</h6>
                        <hr/>
                        <p><strong>Account Number: {account.accountNumber}</strong></p>
                        <p><strong>Name:</strong> <span>{customer.name}</span></p>
                        <p><strong>Address:</strong> <span>{customer.address}</span></p>
                        <p><strong>Phone:</strong> <span>{customer.phone}</span></p>
                        <p><strong>Email:</strong> <span>{customer.email}</span></p>
                    </div>
                </div>
            </div>
            <div className="col-lg-7">
                <div className="card m-b-30">
                    <div className="card-header" style={{ background: '#09669F' }}>
                            <h6 className="text-white">FIlter Transactions</h6>
                        </div>
                    <div className="card-body">
                        <form>
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                    <label>Start Date</label>
                                    <input type="date"
                                            className="form-control"
                                            placeholder=""
                                            autoComplete={'off'}
                                            name={'startDate'}
                                            value={values.startDate}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                    />
                                    {
                                        touched.startDate && errors.startDate ? (
                                            <ul className="parsley-errors-list filled">
                                                <li>{errors.startDate}</li>
                                            </ul>
                                        ): null
                                    }
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                    <label>End Date</label>
                                    <input type="date"
                                            className="form-control"
                                            placeholder=""
                                            autoComplete={'off'}
                                            name={'endDate'}
                                            value={values.endDate}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                    />
                                    {
                                        touched.endDate && errors.endDate ? (
                                            <ul className="parsley-errors-list filled">
                                                <li>{errors.endDate}</li>
                                            </ul>
                                        ): null
                                    }
                                    </div>
                                </div>
                            </div>
                            <button onClick={handleSubmit} className={'btn btn-sm btn-primary'} type="submit">
                            Filter
                        </button>
                            <button onClick={() => handleStatementPrint()} className={'btn btn-sm btn-primary ml-2'} type="button">
                            Print
                        </button>
                            {/* <button onClick={() => setFilteredTransactions(transactions)} className={'btn btn-sm btn-primary ml-2'} type="button">
                            Remove Filter
                        </button> */}
                        </form>
                    </div>
                </div>
                <div className="card m-b-30">
                    <div className="card-header" style={{ background: '#09669F' }}>
                        <h6 className="text-white">Transactions</h6>
                    </div>
                    <div className="card-body">
                        <span><strong>Available Balance:</strong> £{balance.balance}</span>
                        <span className="float-right"><strong>Total Credit:</strong> £{parseFloat(balance.totalCredit).toFixed(2)}</span>
                        <span className="float-right mr-2"><strong>Total Debit:</strong> £{parseFloat(balance.totalDebit).toFixed(2)}</span>
                        <hr/>
                        {
                            filteredTransactions.map((obj) => {
                                if(obj.type === 'credit'){
                                    return (
                                        <div style={{ marginTop: '7px', borderBottom: '1px solid gainsboro', marginBottom: '15px' }}>
                                        <div style={{ height: '5px', background: 'green', borderRadius: '5px 5px 0 0' }}>
                                        </div>
                                        <div style={{ paddingTop: '7px' }}>
                                            <span>Type: {obj.type}</span>
                                            <br></br>
                                            <span>Date: {moment(obj.createdAt).format('MMM Do YYYY, h:mm:ss a')}</span>
                                            <span className="float-right">Amount: £{parseFloat(obj.amount).toFixed(2)}</span>
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
                                            <span className="float-right">Amount: £{parseFloat(obj.amount).toFixed(2)}</span>
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
                                            <span className="float-right">Amount: £{parseFloat(obj.amount).toFixed(2)}</span>
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