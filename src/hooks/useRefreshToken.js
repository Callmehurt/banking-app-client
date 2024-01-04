import { axiosDefault } from "../api/axios";
import { useDispatch } from "react-redux";
import { updateToken } from "../redux/actions/authentication-action";

const useRefreshToken = () => {

    const dispatch = useDispatch();

    const refresh = async () => {
        try{
            const response = await axiosDefault.get('/auth/user/refresh-token', {
                withCredentials: true
            });

            const userDetail = {
                token: response.data.accessToken,
                user: response.data.user
            }

            dispatch(updateToken(userDetail));
            return response.data.accessToken;
        }catch(err){
            console.log(err);
            throw new Error(err);
        }
    }

    return refresh;
}

export default useRefreshToken;