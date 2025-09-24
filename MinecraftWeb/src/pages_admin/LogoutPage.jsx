import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL, API_AUTH_ENDPOINTS } from '../api'

const LogoutPage = () => {
    const navigate = useNavigate();

    const logout = async () => {
        try {
            const response = await fetch(`${BASE_URL}${API_AUTH_ENDPOINTS.LOGOUT}`, {
                method: 'POST',
                credentials: 'include'
            });

            if(response.ok){
                sessionStorage.removeItem("serverAdminTokenExp");
                navigate("/Login");
            } else {
                sessionStorage.removeItem("serverAdminTokenExp");
                console.log("Something went wrong!");
                navigate("/Login");
            }
        } catch(error){
            sessionStorage.removeItem("serverAdminTokenExp");
            console.log("Something went wrong",error);
            navigate("/Login");
        }
    }

    useEffect(() => {
        logout();
    }, [])
    return (
        <div className="p-4 mt-3 card-default danger-card">
            You are logged out!
        </div>
    )
}

export default LogoutPage