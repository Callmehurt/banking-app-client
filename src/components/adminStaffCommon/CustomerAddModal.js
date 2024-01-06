import React from "react";
import { Modal } from "react-bootstrap";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { fetchCustomers } from "../../redux/actions/customer-action";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { customerRegistrationSchema } from "../../validation-schema";
import {notifyError, notifySuccess} from '../toastNotification'
import { useState } from "react";

const CustomerAddModal = ({show, setShow}) => {

    const axiosPrivate = useAxiosPrivate();
    const dispatch = useDispatch();

    const customers = useSelector((state) => state.customers.availableCustomers);
    const [isLoading, setIsLoading] = useState(false);

    const initialValue = {
        name: '',
        address: '',
        phone: '',
        email: '',
        password: 'nepal123'
    }

    const {values, errors, handleBlur, handleChange, handleSubmit, touched} = useFormik({
        initialValues: initialValue,
        enableReinitialize: true,
        validationSchema: customerRegistrationSchema,
        onSubmit: async (values, action) => {
            try{

                const res = await axiosPrivate.post('/customer/register', values);
                if(res.status === 200){
                    notifySuccess('Customer registered successfully');
                    const newList = [...customers, res.data.customer]
                    dispatch(fetchCustomers(newList));
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
        <Modal show={show} onHide={() => setShow(false)} backdrop="static" keyboard={false}>
            <Modal.Header>
               <h5 className="modal-title mt-0">Add New Customer</h5>
                <button type="button" className="close" onClick={() => setShow(false)}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input type="text"
                               className="form-control"
                               placeholder=""
                               autoComplete={'off'}
                               name={'name'}
                               value={values.name}
                               onChange={handleChange}
                               onBlur={handleBlur}
                        />
                        {
                            touched.name && errors.name ? (
                                <ul className="parsley-errors-list filled">
                                    <li>{errors.name}</li>
                                </ul>
                            ): null
                        }
                    </div>
                    <div className="form-group">
                        <label>Phone</label>
                        <input type="text"
                               className="form-control"
                               placeholder=""
                               autoComplete={'off'}
                               name={'phone'}
                               value={values.phone}
                               onChange={handleChange}
                               onBlur={handleBlur}
                        />
                        {
                            touched.phone && errors.phone ? (
                                <ul className="parsley-errors-list filled">
                                    <li>{errors.phone}</li>
                                </ul>
                            ): null
                        }
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <input type="text"
                               className="form-control"
                               placeholder=""
                               autoComplete={'off'}
                               name={'address'}
                               value={values.address}
                               onChange={handleChange}
                               onBlur={handleBlur}
                        />
                        {
                            touched.address && errors.address ? (
                                <ul className="parsley-errors-list filled">
                                    <li>{errors.address}</li>
                                </ul>
                            ): null
                        }
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="text"
                               className="form-control"
                               placeholder=""
                               autoComplete={'off'}
                               name={'email'}
                               value={values.email}
                               onChange={handleChange}
                               onBlur={handleBlur}
                        />
                        {
                            touched.email && errors.email ? (
                                <ul className="parsley-errors-list filled">
                                    <li>{errors.email}</li>
                                </ul>
                            ): null
                        }
                    </div>
                    
                </form>
            </Modal.Body>
            <Modal.Footer>
              <button className={'btn btn-sm btn-danger'} onClick={() => setShow(false)}>
                Cancel
              </button>
                {
                    isLoading ? <button className={'btn btn-sm btn-primary'}>
                    Processing....
                  </button> : <button onClick={handleSubmit} className={'btn btn-sm btn-primary'} type="submit">
                    Submit
                  </button>
                }
            </Modal.Footer>
          </Modal>
        </>
    )
}

export default CustomerAddModal;