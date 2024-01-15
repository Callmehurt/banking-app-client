import React, { useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { depositValidationSchema } from "../../../validation-schema";
import { notifyError, notifySuccess } from "../../toastNotification";
import { useFormik } from "formik";


const DepositForm = () => {

    const axiosPrivate = useAxiosPrivate();

    const [isLoading, setIsLoading] = useState(false);

    const initialValue = {
        accountNumber: '',
        type: 'deposit',
        amount: '',
    }

    const {values, errors, handleBlur, handleChange, handleSubmit, touched} = useFormik({
        initialValues: initialValue,
        enableReinitialize: true,
        validationSchema: depositValidationSchema,
        onSubmit: async (values, action) => {

            setIsLoading(true);
            try{
                const res = await axiosPrivate.post('/account/staff/deposit/transaction', values);
                if(res.status === 200){
                    notifySuccess(res.data.message);
                    action.resetForm();
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
        </>
    )
}

export default DepositForm;