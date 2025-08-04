import { useEffect, useState } from "react";
import NavbarAdmin from "../components_admin/NavbarAdmin";
import TextArea from "../components_admin/TextArea";
import ErrorAdmin from "../components_admin/ErrorAdmin";
import { CheckCircle, SpinnerGap } from "phosphor-react";

const HomePage = () => {
    const [whatToDo, setwhatToDo] = useState(true);
    const [formData, setFormData] = useState({title: '', text: '', datum: new Date().toLocaleDateString()});
    const [error, setError] = useState(false);
    const [finish, setFinish] = useState(false);
    const [update, setUpdate] = useState(false);

    const [articles, setArticles] = useState([]);

    useEffect(() => {
                    fetch('https://localhost:7198/api/Website/GetHomePage')
                        .then(response => response.json())
                        .then(json => {
                            setArticles(json.sort((a , b) => b.id - a.id));
                            console.log(json);
                        })
                        .catch(() => {
                            console.log("something went wrong");
                        })
                } ,[]);

    const handleClick = (e) => {
        e.preventDefault();

        const button = e.currentTarget;
        const formatType = button.getAttribute('data-format');

        switch(formatType){
            case 'new':
                setwhatToDo(true);
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
        setUpdate(true);
        
        try {
            const response = await fetch('https://localhost:7198/api/Website/AddArticle', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if(response.ok){
                console.log("Went thru");
                setFinish(true);
            } else {
                console.log("NOPE");
                setError(true);
                throw new Error("Something went wrong");
            }

        } catch(error){
            console.log("Something went wrong", error);
            setError(true);
        }

        setUpdate(false);
    }

    return (
        <div className="p-4 mt-3 card-default danger-card">
            <NavbarAdmin />
            <h2>HomePage Dashboard</h2>
            <div>
                <button onClick={handleClick} data-format="new" className="btn btn-primary">Create new post</button>
                <button onClick={handleClick} data-format="edit" className="btn btn-primary ms-2">Edit / Delete posts</button>
            </div>
            {whatToDo ? 
                <>
                    <div className="mt-4">
                        <form onSubmit={handleSubmit}>
                            <input type="text" id="title" onChange={handleChange} className="form-control dark-input shadow mt-2" value={formData.title} name="title" placeholder="Title"/>
                            <TextArea handleChange={handleChange} value={formData.text}/>
                            {update ?
                            <button type="submit" className="btn btn-warning mt-3 shadow"><SpinnerGap size={20} className="spin"/> Creating...</button>
                            :
                            <button type="Submit" className="btn btn-primary mt-2">Create</button>}                       
                        </form>    
                        {error && <ErrorAdmin />}  
                        {finish && <div className='mt-3 text-center mc-color'><CheckCircle size={20} /> Article Created</div>}  
                    </div>
                </>
            :
                <>
                    <div className="mt-4">
                        <h2>WORKING ON IT</h2>
                            {articles.map(item => 
                            <div key={item.id}>{item.title} {item.datum} - Edit / Delete</div>
                            )}
                    </div>
                </>    
            }
        </div>
)
}

export default HomePage;