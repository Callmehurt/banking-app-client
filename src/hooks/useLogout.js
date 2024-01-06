import {useDispatch, useSelector} from "react-redux";
import {axiosDefault} from '../api/axios'
import { logoutUser } from "../redux/actions/authentication-action";

const useLogout = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.authentication.role);

    const logout = async () => {
        try{
            let response = null;
            if(currentUser === 'customer'){
                response = await axiosDefault.get('/auth/customer/logout').catch((err) => {
                    console.log(err);
                });
            }else{
                response = await axiosDefault.get('/auth/user/logout');
            }
            if(response?.status === 200){
                dispatch(logoutUser())
            }
            return response;
        }catch (e){
            console.log(e)
        }
    }

    return logout;
}

export default useLogout;