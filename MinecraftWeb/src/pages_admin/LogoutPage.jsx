import { useEffect } from "react";

const LogoutPage = () => {
    
    useEffect(() => {
    const logout = async () => {
        try {
        const response = await fetch("http://localhost:5089/api/Auth/Logout", {
            method: 'POST',
            credentials: 'include'
        })

        if(response.ok){
            localStorage.removeItem("serverAdminToken");
            console.log("logged out")
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
