import { Navigate } from "react-router-dom";

function UserRoute({userRole, children}){
    if(userRole != "user"){
        return <Navigate to="admin/booksM" />;
    }
    return children;
}
export default UserRoute;