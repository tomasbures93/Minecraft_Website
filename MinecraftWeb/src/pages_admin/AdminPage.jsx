import { useState, useEffect } from "react"
import NavbarAdmin from "../components_admin/NavbarAdmin"

const AdminPage = ({data}) => {
    const [formData, setformData] = useState({
            serverName: "",
            ip: "",
            port: "",
            gameVersion: "",
            discord: "",
            email: ""
        });

    useEffect(() => {
        if (data) {
            setformData({
                serverName: data.serverName || "",
                ip: data.ip || "",
                port: data.port || "",
                gameVersion: data.gameVersion || "",
                discord: data.discord || "",
                email: data.email || ""
                });
        }
    }, [data]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setformData({...formData, [name]: value});
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        console.log("submited");
    };

    return (
    <div className="p-4 mt-3 card-default danger-card">
        <NavbarAdmin />
        <div className='p-2'>
            <h1>Admin Dashboard</h1>
            <p>
                Welcome to the Admin Panel. Here you can manage your website’s content and server info.<br />
                Use the navigation menu to edit homepage articles, changelogs, website info, and more.
            </p>
            <hr />
            <h2>Website Setup</h2>
            <form onSubmit={handleSubmit}>
               Server name: <input type="text" name="serverName" placeholder="Best Server" value={formData.serverName} onChange={handleChange}/><br/>
               
               Server IP + Port {data.ip} : {data.port}<br/>
               Game Version {data.gameVersion}<br />
               Discord Link {data.discord}<br />
               Contact Email {data.email} <br />
               <button type="submit">Change</button>
            </form>
        </div>
    </div>)}

export default AdminPage