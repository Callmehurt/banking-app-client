import { axiosDefault } from "../api/axios";
import { useDispatch } from "react-redux";
import { updateUserToken } from "../redux/actions/authentication-action";

const useRefreshToken = () => {

    const dispatch = useDispatch();

    const refresh = async () => {
        try{
            const userResponse = await axiosDefault.get('/auth/user/refresh-token', {
                withCredentials: true
            });
            const customerResponse = await axiosDefault.get('/auth/customer/refresh-token', {
                withCredentials: true
            });

            Promise.resolve({userResponse, customerResponse});

            console.log('finally', {userResponse, customerResponse} );
            if(userResponse?.data){
                const userDetail = {
                    token: userResponse.data.accessToken,
                    user: userResponse.data.user,
                    role: userResponse.data.user.role
                }
    
                console.log('refresh', userDetail);
                dispatch(updateUserToken(userDetail));
                return userResponse.data.accessToken;
            }else{

            }
            
        }catch(err){
            console.log(err);
            throw new Error(err);
        }
    }

    return refresh;
}

export default useRefreshToken;