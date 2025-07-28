import { SpinnerGap, TextBolder, TextHThree, TextItalic, TextUnderline, CheckCircle } from "phosphor-react"
import NavbarAdmin from "../components_admin/NavbarAdmin";
import ErrorAdmin from "../components_admin/ErrorAdmin";
import { useEffect, useState } from "react";

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
                console.log(json);
            })
            .catch(() => {
                console.log("problem while fetching data");
            })
    }
    ,[]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdate(true);
        console.log(formData);
        try{
            const response = await fetch('https://localhost:7198/api/Website/UpdateRulesPage',{
                method: 'PUT', 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
                credentials: 'include'
            });

            if(response.ok){
                console.log("update okay");
                setFinish(true);
            } else {
                console.log("something went wrong");
                setError(true);
                throw new Error("Error from fetch");
            }
        } catch (error){
            console.log("something went wrong", error)
            setUpdate(false);
            setError(true);
        }
        setUpdate(false);
    }

    return (
        <div className="p-4 mt-3 card-default danger-card">
            <NavbarAdmin />
            <h2>Rules Dashboard</h2>
            <form onSubmit={handleSubmit}>
                <p>
                    <TextBolder size={20} /> 
                    <TextItalic size={20} />
                    <TextUnderline size={20} />
                    <TextHThree size={20} />
                </p>
                <textarea className="form-control dark-input shadow" name="text" rows="15" onChange={handleChange} value={formData.text}></textarea>
                { update ?
                    <button type="submit" className="btn btn-warning mt-3 shadow"><SpinnerGap size={20} className="spin"/>  Updating ...</button> :
                    <button className="mt-3 btn btn-primary shadow">Update</button>
                }
                {error && <ErrorAdmin /> }
                {finish && <div className='mt-3 text-center mc-color'><CheckCircle size={20} /> Rules Updated</div>}
            </form>
        </div>
    )
}

export default RulesPage