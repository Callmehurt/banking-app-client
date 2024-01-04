import {useDispatch} from "react-redux";
import {axiosDefault} from '../api/axios'
import { logoutUser } from "../redux/actions/authentication-action";

const useLogout = () => {
    const dispatch = useDispatch();

    const logout = async () => {
        try{
            // const response = await axiosDefault.get('/user/logout');
            // if(response.status === 200){
            //     dispatch(logoutUser())
            // }
            // return null;
        }catch (e){
            console.log(e)
        }
    }

    return logout;
}

export default useLogout;