import { Navigate } from "react-router-dom";

const PrivateRoute = ({children}) => {
    const expirationDate = sessionStorage.getItem("serverAdminTokenExp");
    const currentDate = new Date();
    
    if(Number(currentDate) < expirationDate){
        return children;
    } else {
        return(<>        
        <Navigate to="/login" />
        {sessionStorage.removeItem("serverAdminTokenExp")}
        </>)
    }
}

export default PrivateRoute