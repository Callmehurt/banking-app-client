import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {axiosDefault} from "../api/axios";
import {authenticateUser, authenticateCustomer} from "../redux/actions/authentication-action";
import {useDispatch} from "react-redux";
import {useNavigate, useLocation, Link} from "react-router-dom";
import logo from '../images/logo.png'


const Login = () => {

    const authenticatedUser = useSelector((state) => state.authentication);

    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || '/';

    const dispatch = useDispatch();

    const [loginCredential, setLoginCredential] = useState({
       email: '',
       password: ''
    });

    const [isLoading, setIsLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');


    const formHandler = (e) => {
        const credential = {...loginCredential};
        credential[e.target.name] = e.target.value;
        setLoginCredential(credential);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        try{

            let res = null;
            if(loginType === 'User'){
                res = await axiosDefault.post('/auth/user/signin', loginCredential);
                const userDetail = {
                    token: res?.data.accessToken,
                    role: res?.data.user.role,
                    user: res?.data.user
                }
                dispatch(authenticateUser(userDetail));

            }else{
                res = await axiosDefault.post('/auth/customer/signin', loginCredential);
                const customer = res?.data.customer.detail;
                customer.accountNumber = res?.data.customer.account.accountNumber;
                const customerDetail = {
                    token: res?.data.accessToken,
                    role: 'customer',
                    customer: customer
                }

                dispatch(authenticateCustomer(customerDetail));
            }
            from = '/system/dashboard';
            navigate(from, {replace: true});

        }catch(err){
            console.log(err);
            setErrMsg(err.response?.data.message);
        }finally{
            setIsLoading(false);
        }
    }

    const [loginType, setLoginType] = useState('User');


    useEffect(() => {
        if(authenticatedUser.isAuthenticated){
            navigate(`/system/dashboard`)
        }
    }, [authenticatedUser, navigate])

    return (
        <>
            <div className="wrapper-page">
                <div className="card card-pages shadow-none">
                    <div className="card-body">
                        <div className="text-center m-t-0 m-b-15">
                            <Link to={'/'} className="logo logo-admin">
                                <img src={logo} alt="" height="130" style={{borderRadius: '50%'}} />
                            </Link>
                        </div>
                        <h5 className="font-18 text-center">{loginType} Sign in</h5>

                        <form className="form-horizontal m-t-30" onSubmit={handleSubmit}>

                            <div className="form-group">
                                <div className="col-12">
                                <ul className="nav nav-pills nav-justified" role="tablist">
                                    <li className="nav-item waves-effect waves-light">
                                        <a className={loginType === 'User' ? 'nav-link active' : 'nav-link'} onClick={() => setLoginType('User')}>
                                            <span className="d-none d-md-block">User</span><span className="d-block d-md-none">
                                        </span>
                                        </a>
                                    </li>
                                    <li className="nav-item waves-effect waves-light">
                                        <a className={loginType === 'Customer' ? 'nav-link active' : 'nav-link'} onClick={() => setLoginType('Customer')}>
                                            <span className="d-none d-md-block">Customer</span><span className="d-block d-md-none">
                                        </span>
                                        </a>
                                    </li>
                                </ul>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="col-12">
                                    <label>Email</label>
                                    <input className="form-control" type="text" name={'email'} placeholder="Email" value={loginCredential.email} onChange={(e) => formHandler(e)} autoComplete={'off'} />
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="col-12">
                                    <label>Password</label>
                                    <input className="form-control" type="password" name={'password'} placeholder="Password" value={loginCredential.password} onChange={(e) => formHandler(e)} />
                                </div>
                            </div>

                            <div className="form-group">
                               <div className="col-12">
                                   {
                                    errMsg ? (
                                        <ul className="parsley-errors-list filled">
                                            <li>{errMsg}</li>
                                        </ul>
                                    ): null
                                }
                               </div>
                            </div>

                            <div className="form-group text-center m-t-20">
                                <div className="col-12">
                                    {
                                        isLoading ? (
                                            <button className="btn btn-primary btn-block btn-lg waves-effect waves-light">
                                                Logging in..
                                            </button>
                                        ):
                                            (
                                                <button className="btn btn-primary btn-block btn-lg waves-effect waves-light"
                                                        type="submit">Log In
                                                </button>
                                            )
                                    }
                                </div>
                            </div>
                            <div className="form-group row m-t-30 m-b-0">
                                <div className="col-sm-7">
                                    <Link to={'/'} className="text-muted"><i
                                        className="mdi mdi-lock m-r-5"></i> Forgot your password?</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            </>
    )
}

export default Login;