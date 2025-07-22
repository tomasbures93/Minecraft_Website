import { SpinnerGap, Warning } from "phosphor-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ErrorAdmin from "../components_admin/ErrorAdmin";

const Login = () => {
    const [formData, setFormData] = useState({ username: "", password: "", pin: ""});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const token = sessionStorage.getItem('serverAdminToken');

    useEffect(() => {
        if(token === "true") {
            navigate('/AdminPage');
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try{
            const response = await fetch("https://localhost:7198/api/Auth/Login", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
                credentials: 'include'
            });

            if(!response.ok){
                setError(true);
                setLoading(false);
                throw new Error("Request failed");
            }

            const data = response;
            setError(false);
            setLoading(false);
            sessionStorage.setItem("serverAdminToken", true);
            navigate('/AdminPage');
        }catch(error){
            setLoading(false);
        }
    };
    
    return (
    <div className="p-5 mt-3 d-flex justify-content-center card-default danger-card">
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" className="form-control dark-input shadow" id="username" placeholder="username" value={formData.username} onChange={handleChange} />
            <input type="password" name="password" className="form-control dark-input mt-3 shadow" id="password" placeholder="password" value={formData.password} onChange={handleChange}/>
            <input type="password" name="pin" className="form-control dark-input mt-3 shadow" id="pin" placeholder="PIN" value={formData.pin} onChange={handleChange}/>
            {loading ? 
                <button type="submit" className="form-control btn btn-warning shadow mt-3" disabled><SpinnerGap className="spin" /> Loading...</button>
                :
                <input type="submit" value="Login" className="form-control btn btn-success shadow mt-3" />
            }
            {error && <ErrorAdmin />}
        </form>
    </div>)
}

export default Login