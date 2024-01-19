import React from "react";
import { Navigate } from "react-router-dom";


const Homepage = () => {
    return (
        <>
        <Navigate to={'/user/login'} />
        </>
    )
}

export default Homepage;