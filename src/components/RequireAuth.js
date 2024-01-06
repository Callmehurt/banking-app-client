import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = ({allowedRole}) => {
    
    const userAuth = useSelector((state) => state.authentication);
    const auth = userAuth.isAuthenticated;
    const location = useLocation();

    const rolesAllowed = [...allowedRole];
    return (
        auth && rolesAllowed.includes(userAuth?.role) ? <Outlet/>
        : auth ?
        <Navigate to={'/unauthorized'} state={{ from: location }} replace />
        : <Navigate to={'/user/login'} state={{from: location}} replace />
    )
}

export default RequireAuth;