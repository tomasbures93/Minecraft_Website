import { useEffect, useState } from "react";
import NavbarAdmin from "../components_admin/NavbarAdmin";
import ErrorAdmin from "../components_admin/ErrorAdmin";
import SuccessAdmin from "../components_admin/SuccessAdmin";
import ArticleList from "../components_admin/ArticleList";
import Form from "../components_admin/Form";
import ModalDialog from "../components_admin/ModalDialog";

const HomePage = () => {
    const [whatToDo, setwhatToDo] = useState(true);
    const [formData, setFormData] = useState({title: '', text: '', datum: new Date().toLocaleDateString()});
    const [error, setError] = useState(false);
    const [finish, setFinish] = useState(false);
    const [update, setUpdate] = useState(false);
    const [formError, setFormError] = useState({});
    const [articles, setArticles] = useState([]);
    const [edit, setEdit] = useState(false);
    const [preview, setPreview] = useState(false);
    const [delte, setDelete] = useState(false);
    const [id, setId] = useState(0);

    const fetchData = () => {
        fetch('https://localhost:7198/api/Website/GetHomePage')
            .then(response => response.json())
            .then(json => {
                setArticles(json.sort((a , b) => b.id - a.id));
                })
            .catch(() => {
                console.log("something went wrong");
                })
    }

    useEffect(() => {
                    fetchData();
                } ,[]);

    const handleClick = (e) => {
        e.preventDefault();

        const button = e.currentTarget;
        const formatType = button.getAttribute('data-format');

        fetchData();
        setFinish(false);
        setError(false);
        setUpdate(false);
        setEdit(false);
        setFormError({});
        setDelete(false);

        switch(formatType){
            case 'new':
                setwhatToDo(true);
                setFormData({title: '', text: '', datum: new Date().toLocaleDateString()})
                break;
            case 'edit':
                setwhatToDo(false);
                break;
            default:
                return;
        }
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const newErrors = validateForm(formData);
        setFormError(newErrors);
        setUpdate(true);
        
        if(Object.keys(newErrors).length === 0){
            console.log("No Validation Errors");
        } else {
            setUpdate(false);
            return;
        }

        try {
            const response = await fetch('https://localhost:7198/api/Website/AddArticle', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if(response.ok){
                setFinish(true);
                setFormData({title: '', text: '', datum: new Date().toLocaleDateString()});
            } else {
                setError(true);
                throw new Error("Something went wrong");
            }

        } catch(error){
            console.log("Something went wrong", error);
            setError(true);
        }

        setUpdate(false);
    }

    const validateForm = (data) => {
        const formError = {};

        if(!data.title.trim()){
            formError.title = "Title required!";
        } else if(data.title.length < 3){
            formError.title = "Title has to have atleast 3 characters!";
        }

        if(!data.text.trim()){
            formError.text = "Article has to have some text!";
        }

        return formError;
    }

    const handleDelete = async (id) =>{
        setEdit(false);
        const url = 'https://localhost:7198/api/Website/DeleteArticle?id=' + id;
        try{
            const response = await fetch(url, {
                method: 'Delete',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            });

            if(response.ok){
                console.log("ok");
                setDelete(true);
                setArticles(prev => prev.filter(item => item.id !== id))
            } else {
                console.log("something went wrong");
                setError(true);
                throw new Error("Something went wrong!");
            }
        } catch(error) {
            console.log("Something went wrong", error);
            setError(true);
        }
    }

    const handleEdit = (id) =>{
        setEdit(true);
        setDelete(false);

        const article = articles.find(item => item.id === id);
        setFormData(article);
    }

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm(formData);
        setFormError(newErrors);
        setUpdate(true);

        if(Object.keys(newErrors).length === 0){
            console.log("No Validation Errors");
        } else {
            setUpdate(false);
            return;
        }

        try {
            const response = await fetch('https://localhost:7198/api/Website/EditArticle', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
                credentials: 'include'
            });

            if(response.ok){
                console.log("Alles gut");
                setFinish(true);
            } else {
                setError(true);
                throw new Error("Something went wrong");
            }
        } catch(error) {
            console.log("Something went wrong.", error);
            setError(true);
        }
        setUpdate(false);
        setFormData({ title: '', text: '', datum: new Date().toLocaleDateString() });
        fetchData();
    }

    const handlePreview = () => {
        setPreview(prev => !prev);
    }

    const handleId = (id) => {
        setId(id);
    }

    return (
        <div className="p-4 mt-3 card-default danger-card">
            <NavbarAdmin />
            <h2>HomePage Dashboard</h2>
            <div>
                <button onClick={handleClick} data-format="new" className="btn btn-primary shadow">Create new post</button>
                <button onClick={handleClick} data-format="edit" className="btn btn-primary ms-2 shadow">Edit / Delete posts</button>
            </div>
            <hr />
            {whatToDo ? 
                    <div className="mt-4">
                        <Form 
                            handleSubmit={handleSubmit} 
                            handleChange={handleChange} 
                            formData={formData}
                            formError={formError}
                            preview={preview}
                            update={update}
                            handlePreview={handlePreview}
                            textSubmit="Create"
                            textLoading="Creating ..."/>   
                        {error && <ErrorAdmin />}  
                        {finish && <SuccessAdmin text="Article Created" />}  
                    </div>
            :
                    <div className="mt-4 container">
                        <ArticleList data={articles} handleEdit={handleEdit} handleId={handleId}  toggle="modal" target="#exampleModal" />
                        <ModalDialog handleDelete={handleDelete} id={id} text="Article"/>
                        {delte && <SuccessAdmin text="Article deleted!" />}
                        {edit && 
                        <>
                            <hr />
                            <Form
                                handleSubmit={handleEditSubmit}
                                handleChange={handleChange}
                                formData={formData}
                                formError={formError}
                                preview={preview}
                                update={update}
                                handlePreview={handlePreview} 
                                textSubmit="Update"
                                textLoading="Updating ..."/>
                            {error && <ErrorAdmin />}  
                            {finish && <SuccessAdmin text="Article Updated" />}  
                        </>}
                    </div> 
            }
        </div>
)
}

export default HomePage;