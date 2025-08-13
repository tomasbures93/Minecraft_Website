import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
    const navigate = useNavigate();

    const logout = async () => {
        try {
        const response = await fetch("https://localhost:7198/api/Auth/Logout", {
            method: 'POST',
            credentials: 'include'
        });

        if(response.ok){
            sessionStorage.removeItem("serverAdminToken");
            navigate("/Login");
        } else {
            sessionStorage.removeItem("serverAdminToken");
            console.log("Something went wrong!");
            navigate("/Login");
        }
        } catch(error){
            console.log("Something went wrong",error)
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