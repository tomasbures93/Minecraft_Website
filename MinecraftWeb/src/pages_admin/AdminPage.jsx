import { useState, useEffect } from "react"
import NavbarAdmin from "../components_admin/NavbarAdmin"
import { CheckCircle, Checks, SpinnerGap } from "phosphor-react";
import ErrorAdmin from "../components_admin/ErrorAdmin";

const AdminPage = ({data}) => {
    const [formData, setformData] = useState({
            serverName: "",
            ip: "",
            port: "",
            gameVersion: "",
            discord: "",
            email: ""
        });
    const [update, setUpdate] = useState(false);
    const [error, setError] = useState(false);
    const [finish, setFinished] = useState(false);

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
        setUpdate(true);
        try{
            const response = await fetch('https://localhost:7198/api/Website/UpdateServerInfo',{
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
                credentials: 'include'
            });            
            
            if(response.ok){
                setUpdate(false);
                setFinished(true);
            } else {
                setError(true);
                setUpdate(false);
                throw new Error('Error');
            }
        } catch(error){
            console.log('Something went wrong');
            setUpdate(false);
            setError(true);
        }
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
            <h2 >Website Setup</h2>
            <form onSubmit={handleSubmit}>
               <div className="mt-2">
                    <label htmlFor='serverName' className="form-label">Server name</label> 
                    <input type="text" name="serverName" id="serverName" className="form-control dark-input shadow" placeholder="Best Server" value={formData.serverName} onChange={handleChange}/>
               </div>
               <div className="mt-2">
                    <label htmlFor="IP" className="form-label">IP Address & Port</label>
                    <div className="d-flex">
                        <input type="text" name="ip" id="IP" className="form-control dark-input w-75 me-2 shadow" placeholder="192.0.0.1" value={formData.ip} onChange={handleChange}/>
                        <input type="text" name="port" id="port" className="form-control dark-input w-25 shadow" placeholder="25556" value={formData.port} onChange={handleChange}/>
                    </div>
               </div>
               <div className="mt-2">
                    <label htmlFor="gameVersion" className="form-label">Game Version</label>
                    <input type="text" name="gameVersion" id="gameVersion" className="form-control dark-input shadow" placeholder="Java Edition 1.24.4" value={formData.gameVersion} onChange={handleChange} />
               </div>
               <div className="mt-2">
                    <label htmlFor="discord" className="form-label">Discord Link</label>
                    <input type="text" id="discord" name="discord" className="form-control dark-input shadow" placeholder="www.discord.gg" onChange={handleChange} value={formData.discord} />
               </div>
               <div className="mt-2">
                    <label htmlFor="email" className="form-label">Contact Email</label>
                    <input type="email" id="email" name="email" className="form-control dark-input shadow" placeholder="email@email.com" onChange={handleChange} value={formData.email} />
               </div>
                { update ? 
                    <button type="submit" className="btn btn-warning mt-3 shadow"><SpinnerGap size={20} className="spin"/> Updating ...</button> : 
                    <button type="submit" className="btn btn-primary mt-3 shadow">Update</button> 
                }
                {error && <ErrorAdmin /> }
                {finish &&  <div className='mt-3 text-center mc-color'><CheckCircle size={20} /> Info Updated</div>}
            </form>
        </div>
    </div>)}

export default AdminPage