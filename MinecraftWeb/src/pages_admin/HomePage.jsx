import { useEffect, useState } from "react";
import NavbarAdmin from "../components_admin/NavbarAdmin";
import TextArea from "../components_admin/TextArea";
import ErrorAdmin from "../components_admin/ErrorAdmin";
import { CheckCircle, Pencil, SpinnerGap, Trash } from "phosphor-react";

const HomePage = () => {
    const [whatToDo, setwhatToDo] = useState(true);
    const [formData, setFormData] = useState({title: '', text: '', datum: new Date().toLocaleDateString()});
    const [error, setError] = useState(false);
    const [finish, setFinish] = useState(false);
    const [update, setUpdate] = useState(false);
    const [formError, setFormError] = useState({});
    const [articles, setArticles] = useState([]);
    const [edit, setEdit] = useState(false);

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

        switch(formatType){
            case 'new':
                setwhatToDo(true);
                fetchData();
                setFinish(false);
                setError(false);
                setUpdate(false);
                setEdit(false);
                setFormData({title: '', text: '', datum: new Date().toLocaleDateString()})
                break;
            case 'edit':
                setwhatToDo(false);
                fetchData();
                setFinish(false);
                setError(false);
                setUpdate(false);
                setEdit(false);
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

    const handleDelete = async (e) =>{
        const button = e.currentTarget;
        const id = Number(button.getAttribute('data-id'));

        const url = 'https://localhost:7198/api/Website/DeleteArticle?id=' + id;
        try{
            const response = await fetch(url, {
                method: 'Delete',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            });

            if(response.ok){
                console.log("ok");
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

    const handleEdit = (e) =>{
        setEdit(true);
        const button = e.currentTarget;
        const id = Number(button.getAttribute('data-id'));

        const article = articles.find(item => item.id === id);
        setFormData(article);
    }

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        setUpdate(true);

        try {
            const response = await fetch('https://localhost:7198/api/Website/EditArticle', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
                credentials: 'include'
            });

            console.log(formData);

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
                        <form onSubmit={handleSubmit}>
                            <input type="text" id="title" onChange={handleChange} className="form-control dark-input shadow mt-2" value={formData.title} name="title" placeholder="Title"/>
                            {formError.title && <p className="mt-2 text-danger">{formError.title}</p>}
                            <TextArea handleChange={handleChange} value={formData.text}/>
                            {formError.text && <p className="mt-2 text-danger">{formError.text}</p>}
                            {update ?
                            <button type="submit" className="btn btn-warning mt-3 shadow"><SpinnerGap size={20} className="spin"/> Creating...</button>
                            :
                            <button type="Submit" className="btn btn-primary mt-2">Create</button>}                       
                        </form>    
                        {error && <ErrorAdmin />}  
                        {finish && <div className='mt-3 text-center mc-color'><CheckCircle size={20} /> Article Created</div>}  
                    </div>
            :
                    <div className="mt-4 container">
                        {articles.map(item =>
                            <div className="row mb-2" key={item.id}>
                                <div className="col-sm middle-sm">
                                    <b>{item.title}</b> - {item.datum} 
                                </div>
                                <div className="col-sm middle-sm normal-end">
                                    <button className="none" onClick={handleEdit} data-id={item.id}><Pencil size={20} /></button> 
                                    <button className="none" onClick={handleDelete} data-id={item.id}><Trash size={20} /></button>
                                </div>
                            </div>
                        )}
                        {edit && 
                        <>
                            <form onSubmit={handleEditSubmit}>
                                <input type="text" id="title" onChange={handleChange} className="form-control dark-input shadow mt-2" value={formData.title} name="title" placeholder="Title"/>
                                {formError.title && <p className="mt-2 text-danger">{formError.title}</p>}
                                <TextArea handleChange={handleChange} value={formData.text}/>
                                {formError.text && <p className="mt-2 text-danger">{formError.text}</p>}
                                {update ?
                                <button type="submit" className="btn btn-warning mt-3 shadow"><SpinnerGap size={20} className="spin"/> Updating...</button>
                                :
                                <button type="Submit" className="btn btn-primary mt-2">Update</button>}                       
                            </form> 
                            {error && <ErrorAdmin />}  
                            {finish && <div className='mt-3 text-center mc-color'><CheckCircle size={20} /> Article Updated</div>}  
                        </>}
                    </div> 
            }
        </div>
)
}

export default HomePage;