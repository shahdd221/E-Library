import { Navigate } from "react-router-dom";

function AdminRoute({userRole, children}){
    if(userRole != "admin"){
        return <Navigate to="/home" />;
    }
    return children;
}
export default AdminRoute;