import React from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {

    const userDetail = useSelector((state) => state.authentication);

    return (
        <>
        {userDetail.role} Dashboard
        </>
    )
}

export default Dashboard;