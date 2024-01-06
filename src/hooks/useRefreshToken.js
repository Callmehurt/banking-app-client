import { axiosDefault } from "../api/axios";
import { useDispatch } from "react-redux";
import { updateUserToken,updateCustomerToken } from "../redux/actions/authentication-action";

const useRefreshToken = () => {

    const dispatch = useDispatch();

    const refresh = async () => {
        try{
            const userResponse = await axiosDefault.get('/auth/user/refresh-token', {
                withCredentials: true
            }).catch((err) => {
                console.log(err);
            });

            const customerResponse = await axiosDefault.get('/auth/customer/refresh-token', {
                withCredentials: true
            }).catch((err) => {
                console.log(err);
            });

            Promise.resolve({userResponse, customerResponse});
            if(userResponse?.data){
                const userDetail = {
                    token: userResponse.data.accessToken,
                    user: userResponse.data.user,
                    role: userResponse.data.user.role
                }    
                dispatch(updateUserToken(userDetail));
                return userResponse.data.accessToken;
            }
            if(customerResponse?.data){
                const customer = customerResponse?.data.customer.detail;
                customer.accountNumber = customerResponse?.data.customer.account.accountNumber;
                const customerDetail = {
                    token: customerResponse?.data.accessToken,
                    role: 'customer',
                    customer: customer
                }

                dispatch(updateCustomerToken(customerDetail));
                return customerResponse.data.accessToken;
            }

            return null;
            
        }catch(err){
            console.log(err);
            throw new Error(err);
        }
    }

    return refresh;
}

export default useRefreshToken;