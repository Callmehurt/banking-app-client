import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import { useSelector } from "react-redux";
import LoadingComponent from "./LoadingComponent";

const PersistLogin = () => {

    const refresh = useRefreshToken();
    const location = useLocation();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const authState = useSelector((state) => state.authentication);

    useEffect(() => {
        let isMounted = true;
        const verifyRefreshToken = async () => {
            try{
                await refresh();
            }catch(err){
                console.log(err);
                navigate('/', {state: {from: location}, replace: true})
            }finally{
                isMounted && setIsLoading(false)
            }
        }
        !authState?.token ? verifyRefreshToken() : setIsLoading(false);

        return () => isMounted = false;
    })

    return (
        <>
            {
                isLoading ? (
                    <LoadingComponent/>
                ): <Outlet/>
            }
        </>
    )
}

export default PersistLogin;