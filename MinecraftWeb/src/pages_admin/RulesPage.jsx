import { SpinnerGap, TextBolder, TextHThree, TextItalic, CheckCircle, TextStrikethrough } from "phosphor-react"
import NavbarAdmin from "../components_admin/NavbarAdmin";
import ErrorAdmin from "../components_admin/ErrorAdmin";
import { useEffect, useState, useRef } from "react";

const RulesPage = () => {
    const [formData, setFormData] = useState([]);
    const [update, setUpdate] = useState(false);
    const [finish, setFinish] = useState(false);
    const [error, setError] = useState(false);
    const textareaRef = useRef(null);

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

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    const handleBold = () => {
        const textarea = textareaRef.current;

        const start = textarea.selectionStart;  // start
        const end = textarea.selectionEnd;      // end

        const text = textarea.value.substring(start, end);

        const before = textarea.value.substring(0, start);
        const after = textarea.value.substring(end);

        const insertText = before + "**" + text + "**" + after;

        setFormData({text: insertText});
    }

    const handleItalic = () => {
        const textarea = textareaRef.current;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        const text = textarea.value.substring(start, end);

        const before = textarea.value.substring(0, start);
        const after = textarea.value.substring(end);

        const insertText = before + "*" + text + "*" + after;
        
        setFormData({text: insertText});
    }

    const handleH3 = () => {
        const textarea = textareaRef.current;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        const text = textarea.value.substring(start, end);

        const before = textarea.value.substring(0, start);
        const after = textarea.value.substring(end);

        const insertText = before + "##" + text + after;

        setFormData({text: insertText});
    }

    return (
        <div className="p-4 mt-3 card-default danger-card">
            <NavbarAdmin />
            <h2>Rules Dashboard</h2>
            <form onSubmit={handleSubmit}>
                <p>
                    <button onClick={handleBold} className="btn text-white border me-1 mb-1"><TextBolder size={20}/></button>
                    <button onClick={handleItalic} className="btn text-white border me-1 mb-1"><TextItalic size={20} className="markDown"/></button>
                    <button onClick={handleH3} className="btn text-white border me-1 mb-1"><TextHThree size={20} className="markDown" /></button>
                    <textarea ref={textareaRef} className="form-control dark-input shadow" name="text" rows="15" onChange={handleChange} value={formData.text}></textarea>
                    { update ?
                        <button type="submit" className="btn btn-warning mt-3 shadow"><SpinnerGap size={20} className="spin"/>  Updating ...</button> :
                        <button className="mt-3 btn btn-primary shadow">Update</button>
                    }
                    {error && <ErrorAdmin /> }
                    {finish && <div className='mt-3 text-center mc-color'><CheckCircle size={20} /> Rules Updated</div>}
                </p>
            </form>
        </div>
    )
}

export default RulesPage