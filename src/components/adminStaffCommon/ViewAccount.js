import React, { useState } from "react";
import { viewAccountValidationSchema } from "../../validation-schema";
import { notifyError, notifySuccess } from "../toastNotification";
import { useFormik } from "formik";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import AccountPage from "../common/AccountPage";


const ViewAccount = () => {

    const axiosPrivate = useAxiosPrivate();

    const [isLoading, setIsLoading] = useState(false);
    const [detail, setDetail] = useState({
        customer: null,
        account: null,
        balance: null
    })

    const initialValue = {
        accountNumber: '',
    }

    const {values, errors, handleBlur, handleChange, handleSubmit, touched} = useFormik({
        initialValues: initialValue,
        enableReinitialize: true,
        validationSchema: viewAccountValidationSchema,
        onSubmit: async (values, action) => {
            try{

                const res = await axiosPrivate.get(`/account/detail/${values.accountNumber}`);
                console.log(res);
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

            }catch(err){
                console.log('Error', err);
                notifyError(err?.response.data.message);
            }finally{
                setIsLoading(false);
            }
        }
    })

    return (
        <>
        <div className="page-title-box">
              <div className="row">
                  <div className="col-sm-12">
                      <ol className="breadcrumb float-right">
                          <li className="breadcrumb-item active">View Account</li>
                      </ol>
                  </div>
              </div>
          </div>

          <div className="row">
              <div className="col-lg-4">
                   <div className="card m-b-30">
                        <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label>Account Number</label>
                                <input type="text"
                                    className="form-control"
                                    placeholder=""
                                    autoComplete={'off'}
                                    name={'accountNumber'}
                                    value={values.accountNumber}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {
                                    touched.accountNumber && errors.accountNumber ? (
                                        <ul className="parsley-errors-list filled">
                                            <li>{errors.accountNumber}</li>
                                        </ul>
                                    ): null
                                }
                            </div>
                            {
                                isLoading ? <button className={'btn btn-sm btn-primary'}>
                                Processing....
                            </button> : <button onClick={handleSubmit} className={'btn btn-sm btn-primary'} type="submit">
                                Submit
                            </button>
                            }
                            </form>
                        </div>
                   </div>
              </div>
              <div className="col-12">

              </div>
              {
                detail.customer ? (
                    <AccountPage customer={detail.customer} account={detail.account} balance={detail.balance}/>
                ): ''
              }
              
          </div>
        </>
    )
}

export default ViewAccount;