import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
    const logout = async () => {
        try {
        const response = await fetch("https://localhost:7198/api/Auth/Logout", {
            method: 'POST',
            credentials: 'include'
        });

        if(response.ok){
            sessionStorage.removeItem("serverAdminToken");
            console.log("logged out")
            navigate("/Login");
        } else {
            console.log("wtf");
        }
        } catch(error){

        }
    }
    logout();
    }, [])
    return (<>PAPAPA</>)
}


export default LogoutPage
