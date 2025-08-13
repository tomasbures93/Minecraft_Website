import { useState, useEffect } from "react"
import NavbarAdmin from "../components_admin/NavbarAdmin"
import ErrorAdmin from "../components_admin/ErrorAdmin";
import SuccessAdmin from "../components_admin/SuccessAdmin";
import ButtonLoading from "../components_admin/ButtonLoading";
import ButtonSubmit from "../components_admin/ButtonSubmit";
import ErrorForm from "../components_admin/ErrorForm";
import SingleInput from "../components_admin/SingleInput";

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
    const [formError, setFormError] = useState({});

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
        console.log(formData);
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setUpdate(true);

        const newErrors = validateForm(formData);
        setFormError(newErrors);

        if(Object.keys(newErrors).length === 0){
            console.log("No Validation Errors");
        } else {
            setUpdate(false);
            return;
        }

        console.log(formData);

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

    const validateForm = (data) => {
        const errors = {};

        if(!data.serverName.trim()){
            errors.serverName = "Please insert Server Name";
        }
        if(!data.gameVersion.trim()){
            errors.gameVersion = "Please insert Game Version";
        }

        return errors;
    }

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
                <SingleInput 
                    labelText="Server name"
                    placeholder="Best Server"
                    idName="serverName"
                    value={formData.serverName}
                    handleChange={handleChange}/>
                {formError.serverName && <ErrorForm text={formError.serverName} />}
                <div className="mt-2">
                    <label htmlFor="IP" className="form-label">IP Address & Port</label>
                    <div className="d-flex">
                        <input type="text" name="ip" id="IP" className="form-control dark-input w-75 me-2 shadow" placeholder="192.0.0.1" value={formData.ip} onChange={handleChange}/>
                        <input type="text" name="port" id="port" className="form-control dark-input w-25 shadow" placeholder="25556" value={formData.port} onChange={handleChange}/>
                    </div>
                </div>
                <SingleInput
                    labelText="Game Version"
                    placeholder="Java Edition 1.24.4"
                    idName="gameVersion"
                    value={formData.gameVersion}
                    handleChange={handleChange} />
                {formError.gameVersion && <ErrorForm text={formError.gameVersion} />}
                <SingleInput
                    labelText="Discord Link"
                    placeholder="www.discord.gg"
                    idName="discord"
                    value={formData.discord}
                    handleChange={handleChange} />
                <SingleInput
                    labelText="Contact Email"
                    placeholder="email@email.com"
                    idName="email"
                    value={formData.email}
                    handleChange={handleChange} />
                { update ? 
                    <ButtonLoading text="Updating ..." /> : 
                    <ButtonSubmit text="Update" />
                }
                {error && <ErrorAdmin /> }
                {finish &&  <SuccessAdmin text="Website info Updated" />}
            </form>
        </div>
    </div>)}

export default AdminPage