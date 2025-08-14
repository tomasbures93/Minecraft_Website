import { useEffect, useState } from "react";
import NavbarAdmin from "../components_admin/NavbarAdmin";
import TextArea from "../components_admin/TextArea";
import ButtonSubmit from "../components_admin/ButtonSubmit";
import ButtonNormal from "../components_admin/ButtonNormal";
import ButtonLoading from "../components_admin/ButtonLoading";
import Preview from "../components_admin/Preview";
import ErrorAdmin from "../components_admin/ErrorAdmin";
import SuccessAdmin from "../components_admin/SuccessAdmin";
import ErrorForm from "../components_admin/ErrorForm";
import ArticleList from "../components_admin/ArticleList";

const ChangelogPage = () => {
    const [formData, setFormData] = useState({text: '', title: new Date().toLocaleDateString()});
    const [changeLog, setChangeLog] = useState([]);
    const [whatToDo, setWhatToDo] = useState(true);
    const [update, setUpdate] = useState(false);
    const [preview, setPreview] = useState(false);
    const [finish, setFinish] = useState(false); 
    const [error, setError] = useState(false);
    const [formError, setFormError] = useState({});
    const [edit, setEdit] = useState(false);
    const [delte, setDelete] = useState(false);

    const fetchData = () => {
        fetch('https://localhost:7198/api/Website/GetChangeLogPage')
            .then(response => response.json())
            .then(json => setChangeLog(json.sort((a, b) => b.id - a.id)))
            .catch(() => console.log("Something went wrong !! Fetching data."))
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleWhatToDo = (what) => {
        fetchData();
        setUpdate(false);
        setPreview(false);
        setError(false);
        setFinish(false);
        setEdit(false);
        setFormError({});
        setDelete(false);

        switch(what){
            case "add":
                setFormData({text: '', title: new Date().toLocaleDateString()});
                setWhatToDo(true);
                break;
            case "edit":
                setWhatToDo(false);
                break;
            default:
                setWhatToDo(true);
        }
    }

    const handlePreview = () => {
        setPreview(prev => !prev);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdate(true);
        const newErrors = validateForm(formData);
        setFormError(newErrors);

        if(Object.keys(newErrors).length === 0){
            console.log("Validierung OK");
        } else {
            setUpdate(false);
            return;
        }

        try{
            const response = await fetch('https://localhost:7198/api/Website/AddChangeLog',{
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

        if(response.ok){
            setUpdate(false);
            setFinish(true);
        } else {
            setError(true);
            setUpdate(false);
            throw new Error("Something went wrong");
        }
        } catch(error){
            console.log("Somehting went wrong", error);
        }
    }

    const validateForm = (data) => {
        const errors = {};

        if(!data.text.trim()){
            errors.text = "Input field has to have some text!";
        }

        return errors;
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    const handleEdit = (id) => {
        setEdit(true);

        const change = changeLog.find(item => item.id == id);
        setFormData(change); 
        console.log("Edit button", id);
    }

    const handleDelete = async (id) => {
        setEdit(false);
         const url = 'https://localhost:7198/api/Website/DeleteChangeLog?id=' + id;
        try {
            const response = await fetch(url, {
                method: 'Delete',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            });

            if(response.ok){
                setChangeLog(prev => prev.filter(item => item.id !== id));
                setDelete(true);
            } else {
                setError(true);
                throw new Error("Something went wrong, Deleting");
            }
        } catch(error){
            console.log("Problem by deleting", error);
            setError(true);
        }
    }

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        const newErrors = validateForm(formData);
        setFormError(newErrors);

        if(Object.keys(newErrors).length === 0){
            console.log("Validierung OK");
        } else {
            setUpdate(false);
            return;
        }

        try {
            const response = await fetch('https://localhost:7198/api/Website/UpdateChangeLog', {
                method: 'PUT',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if(response.ok){
                console.log("Update okay");
                setFinish(true);
                setError(false);
            } else {
                setError(true);
                throw new Error("Something went wrong, udpating");
            }
        } catch(error){
            console.log("Something went wrong", error);
            setError(true);
        }
        setUpdate(false);
        setFormData({text: '', title: new Date().toLocaleDateString()});
        fetchData();
    }

    return(
        <div className="p-4 mt-3 card-default danger-card">
            <NavbarAdmin />
            <h2>ChangeLog Dashboard</h2>
            <div>
                <button onClick={() => handleWhatToDo("add")} type="button" className="btn btn-primary shadow">Add Changelog</button>
                <button onClick={() => handleWhatToDo("edit")} type="button" className="btn btn-primary shadow ms-2">Edit / Delete Changelog</button>
            </div>
            <hr />
            {whatToDo ?
                <div className="mt-4">
                    <form onSubmit={handleSubmit}>
                        <TextArea name="text" handleChange={handleChange} value={formData.text} />
                        {formError.text && <ErrorForm text={formError.text} />}
                        {preview && <Preview text={formData.text}/> }
                        {update ?
                            <ButtonLoading text="Adding ..." />:
                            <ButtonSubmit text="Add" />
                        }
                        <ButtonNormal onClick={handlePreview} style="mt-3 ms-2 btn btn-secondary shadow" text="Preview" />
                    </form>
                    {error && <ErrorAdmin />}
                    {finish && <SuccessAdmin text="Changelog added" />}
                </div>
                :
                <div className="mt-4">
                    <ArticleList data={changeLog} handleEdit={handleEdit} handleDelete={handleDelete}/>
                    {delte && <SuccessAdmin text="ChangeLog deleted" />}
                    {edit && <>
                        <form onSubmit={handleEditSubmit}>
                            <TextArea name="text" handleChange={handleChange} value={formData.text} />
                            {formError.text && <ErrorForm text={formError.text} />}
                            {preview && <Preview text={formData.text}/> }
                            {update ?
                                <ButtonLoading text="Updating ..." />:
                                <ButtonSubmit text="Update" />
                            }
                            <ButtonNormal onClick={handlePreview} style="mt-3 ms-2 btn btn-secondary shadow" text="Preview" />
                        </form>
                        {error && <ErrorAdmin />}
                        {finish && <SuccessAdmin text="Changelog updated" />}
                    </>}
                </div>
            }
        </div>
    )
}

export default ChangelogPage;