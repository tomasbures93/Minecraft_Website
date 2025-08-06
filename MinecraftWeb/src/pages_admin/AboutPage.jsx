import NavbarAdmin from "../components_admin/NavbarAdmin";
import { useState, useEffect } from "react";
import TextArea from "../components_admin/TextArea";
import ErrorAdmin from "../components_admin/ErrorAdmin";
import SuccessAdmin from "../components_admin/SuccessAdmin";
import ButtonLoading from "../components_admin/ButtonLoading";
import ButtonNormal from "../components_admin/ButtonNormal";

const AboutPage = () => {
    const [formData, setFormData] = useState([]);
    const [update, setUpdate] = useState(false);
    const [finish, setFinish] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch('https://localhost:7198/api/Website/GetAboutPage')
            .then(response => response.json())
            .then(json => {
                setFormData(json);
            })
            .catch(() => {
                console.log("Problem while fetching data");
            });
    }
    ,[]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdate(true);

        try {
            const response = await fetch('https://localhost:7198/api/Website/UpdateAboutPage', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
                credentials: 'include'
            });

            if(response.ok){
                setFinish(true);
            } else {
                setError(true);
                throw new Error("CRUD - PUT error")
            }
        } catch (error){
            setUpdate(false);
            setError(true);
            console.log("Somehting went wrong", error);
        }
        setUpdate(false);
    }

    return (
        <div className="p-4 mt-3 shadow card-default danger-card">
            <NavbarAdmin />
            <h2>About Dashboard</h2>
            <form onSubmit={handleSubmit}>
                <TextArea handleChange={handleChange} name="text" value={formData.text} /> 
                {update ? 
                    <ButtonLoading text="Updating ..." /> : 
                    <ButtonNormal text="Update" />
                }
                {error && <ErrorAdmin />}
                {finish && <SuccessAdmin text="About Updated" />}
                </form>
        </div>
    )
}

export default AboutPage;