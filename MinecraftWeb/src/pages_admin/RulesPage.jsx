import NavbarAdmin from "../components_admin/NavbarAdmin";
import ErrorAdmin from "../components_admin/ErrorAdmin";
import { useEffect, useState } from "react";
import TextArea from "../components_admin/TextArea";
import SuccessAdmin from "../components_admin/SuccessAdmin";
import ButtonLoading from "../components_admin/ButtonLoading";
import ButtonSubmit from "../components_admin/ButtonSubmit";
import ButtonNormal from "../components_admin/ButtonNormal";
import Preview from "../components_admin/Preview";
import ErrorForm from "../components_admin/ErrorForm";

const RulesPage = () => {
    const [formData, setFormData] = useState([]);
    const [update, setUpdate] = useState(false);
    const [finish, setFinish] = useState(false);
    const [error, setError] = useState(false);
    const [preview, setPreview] = useState(false);
    const [formError, setFormError] = useState({});

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

        const newErrors = validateForm(formData);
        setFormError(newErrors);

        if(Object.keys(newErrors).length === 0){
            console.log("Validierung okay");
        } else {
            setUpdate(false);
            return;
        }

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

    const handlePreview = () => {
        setPreview(prev => !prev);
    }

    const validateForm = (data) =>{
        const formErrors = {};

        if(!data.text.trim()){
            formErrors.text = "Input field has to have some Text!";
        }

        return formErrors;
    }

    return (
        <div className="p-4 mt-3 card-default danger-card">
            <NavbarAdmin />
            <h2>Rules Dashboard</h2>
            <form onSubmit={handleSubmit}>
                    <TextArea handleChange={handleChange} name="text" value={formData.text}/>
                    {formError.text && <ErrorForm text={formError.text} />}
                    {preview && <Preview text={formData.text} />}
                    { update ?
                        <ButtonLoading text="Updating ..." /> :
                        <ButtonSubmit text="Update" />
                    }
                    <ButtonNormal text="Preview" style="mt-3 ms-2 btn btn-secondary shadow" onClick={handlePreview}/>
                    {error && <ErrorAdmin /> }
                    {finish &&  <SuccessAdmin text="Rules Updated" />}
            </form>
        </div>
    )
}

export default RulesPage