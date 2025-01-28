import {Navigate, Outlet} from "react-router-dom";

const ProtectedRoute = ({isLoggedIn}) => {
    console.log(isLoggedIn);
    return isLoggedIn ? <Outlet/> : <Navigate to={"/login"}/>;
}
export default ProtectedRoute;