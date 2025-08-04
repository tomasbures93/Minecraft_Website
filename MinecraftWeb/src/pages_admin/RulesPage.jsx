import { SpinnerGap, CheckCircle } from "phosphor-react"
import NavbarAdmin from "../components_admin/NavbarAdmin";
import ErrorAdmin from "../components_admin/ErrorAdmin";
import { useEffect, useState } from "react";
import TextArea from "../components_admin/TextArea";

const RulesPage = () => {
    const [formData, setFormData] = useState([]);
    const [update, setUpdate] = useState(false);
    const [finish, setFinish] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch('https://localhost:7198/api/Website/GetRulesPage')
            .then(response => response.json())
            .then(json => {
                setFormData(json);
            })
            .catch(() => {
                console.log("problem while fetching data");
            })
    }
    ,[]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdate(true);
        try{
            const response = await fetch('https://localhost:7198/api/Website/UpdateRulesPage',{
                method: 'PUT', 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
                credentials: 'include'
            });

            if(response.ok){
                setFinish(true);
            } else {
                setError(true);
                throw new Error("CRUD - PUT error");
            }
        } catch (error){
            setUpdate(false);
            setError(true);
        }
        setUpdate(false);
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    return (
        <div className="p-4 mt-3 card-default danger-card">
            <NavbarAdmin />
            <h2>Rules Dashboard</h2>
            <form onSubmit={handleSubmit}>
                    <TextArea handleChange={handleChange} name="text" value={formData.text}/>

                    { update ?
                        <button type="submit" className="btn btn-warning mt-3 shadow" disabled><SpinnerGap size={20} className="spin"/>  Updating ...</button> :
                        <button type="submit" className="mt-3 btn btn-primary shadow">Update</button>
                    }
                    {error && <ErrorAdmin /> }
                    {finish && <div className='mt-3 text-center mc-color'><CheckCircle size={20} /> Rules Updated</div>}
            </form>
        </div>
    )
}

export default RulesPage