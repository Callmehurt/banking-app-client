import React, {useState} from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { transferValidationSchema } from "../../../validation-schema";
import { notifyError, notifySuccess } from "../../toastNotification";
import { useFormik } from "formik";


const TransferTransaction = () => {


    const axiosPrivate = useAxiosPrivate();

    const [isLoading, setIsLoading] = useState(false);

    const initialValue = {
        senderAccountNumber: '',
        receiverAccountNumber: '',
        type: 'transfered-to',
        amount: '',
    }

    const {values, errors, handleBlur, handleChange, handleSubmit, touched} = useFormik({
        initialValues: initialValue,
        enableReinitialize: true,
        validationSchema: transferValidationSchema,
        onSubmit: async (values, action) => {

            console.log(values);
            setIsLoading(true);
            try{
                const res = await axiosPrivate.post('/account/staff/transfer/transaction', values);
                console.log(res);
                if(res.status === 200){
                    notifySuccess(res.data.message);
                    // action.resetForm();
                }else{
                    notifyError('Something went wrong!');
                }

            }catch(err){
                console.log('Error', err);
                notifyError(err?.response.data.message);
                notifyError(err?.response.data.error.description);
            }finally{
                setIsLoading(false);
            }
        }
    })

    return (
        <>
        <div className="page-title-box">
              <div className="row align-items-center">
                  <div className="col-sm-12">
                      <ol className="breadcrumb float-right">
                          <li className="breadcrumb-item active">Transfer Transactions</li>
                      </ol>
                  </div>
              </div>
          </div>

          <div className="row justify-content-center">
              <div className="col-lg-6">
                   <div className="card m-b-30">
                        <div className="card-body">
                            
                        <form>
                            <div className="form-group">
                                <label>Sender Account Number</label>
                                <input type="text"
                                        className="form-control"
                                        placeholder=""
                                        autoComplete={'off'}
                                        name={'senderAccountNumber'}
                                        value={values.senderAccountNumber}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                />
                                {
                                    touched.senderAccountNumber && errors.senderAccountNumber ? (
                                        <ul className="parsley-errors-list filled">
                                            <li>{errors.senderAccountNumber}</li>
                                        </ul>
                                    ): null
                                }
                            </div>
                            <div className="form-group">
                                <label>Receiver Account Number</label>
                                <input type="text"
                                        className="form-control"
                                        placeholder=""
                                        autoComplete={'off'}
                                        name={'receiverAccountNumber'}
                                        value={values.receiverAccountNumber}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                />
                                {
                                    touched.receiverAccountNumber && errors.receiverAccountNumber ? (
                                        <ul className="parsley-errors-list filled">
                                            <li>{errors.receiverAccountNumber}</li>
                                        </ul>
                                    ): null
                                }
                            </div>
                            <div className="form-group">
                                <label>Amount</label>
                                <input type="text"
                                        className="form-control"
                                        placeholder=""
                                        autoComplete={'off'}
                                        name={'amount'}
                                        value={values.amount}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                />
                                {
                                    touched.amount && errors.amount ? (
                                        <ul className="parsley-errors-list filled">
                                            <li>{errors.amount}</li>
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
          </div>
        </>
    )
}

export default TransferTransaction;