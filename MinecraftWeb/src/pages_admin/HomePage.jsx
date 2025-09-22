import { useEffect, useState, useReducer } from "react";
import NavbarAdmin from "../components_admin/NavbarAdmin";
import ErrorAdmin from "../components_admin/ErrorAdmin";
import SuccessAdmin from "../components_admin/SuccessAdmin";
import ArticleList from "../components_admin/ArticleList";
import Form from "../components_admin/Form";
import ModalDialog from "../components_admin/ModalDialog";

const ACTION = {
    CREATE_POST: "CREATE_POST",
    UPDATE_POST: "UPDATE_POST",
    UPDATE_FIELD: "UPDATE_FIELD",
    SET_FORM_ERROR: "SET_FORM_ERROR",
    RESET_FORM_ERROR: "RESET_FORM_ERROR",
    FETCH_START: "FETCH_START",
    FETCH_SUCCESS: "FETCH_SUCCESS",
    FETCH_ERROR: "FETCH_ERROR",
    SUBMIT_START: "SUBMIT_START",
    SUBMIT_SUCCESS: "SUBMIT_SUCCESS",
    SUBMIT_ERROR: "SUBMIT_ERROR",
    REMOVE_ARTICLE: "REMOVE_ARTICLE"
}

const UDACTION = {
    UPDATE_FIELD: "UPDATE_FIELD",
    SET_FORM_ERROR: "SET_FORM_ERROR",
    RESET_FORM_ERROR: "RESET_FORM_ERROR",
    SET_VALUE: "SET_VALUE",
    UPDATE_START: "UPDATE_START",
    UPDATE_ERROR: "UPDATE_ERROR",
    UPDATE_SUCCESS: "UPDATE_SUCCESS",
    DELETE_START: "DELETE_START",
    DELETE_ERROR: "DELETE_ERROR",
    DELETE_SUCCESS: "DELETE_SUCCESS",
}

const initialFormData = {
    title: '', 
    text: '', 
    datum: new Date().toLocaleDateString()
}

const initialState = {
    fetch: {
        loading: false,
        error: null,
        artikel: [],
    },
    submit: {
        loading: false,
        error: null,
        success: false,
    },
    formData: initialFormData,
    formError: {},
    mode: "new",
}

function homePageReducer(state, action){
    switch(action.type){
        case ACTION.CREATE_POST:
            return { 
                ...state,
                submit: { loading: false, error: null, success: false }, 
                formData: initialFormData,
                mode: "new"
            }
        case ACTION.UPDATE_POST:
            return { 
                ...state,
                mode: "edit" 
            }
        case ACTION.UPDATE_FIELD:
            return {
                ...state,
                formData: {
                    ...state.formData,
                    [action.field]: action.value,
                }
            }
        case ACTION.SET_FORM_ERROR:
            return {
                ...state,
                submit: { loading: false, error: null, success: false},
                formError: action.payload,
            }
        case ACTION.RESET_FORM_ERROR:
            return {
                ...state,
                formError: {}
            }
        case ACTION.FETCH_START:
            return {
                ...state,
                fetch: { loading: true, error: null, article: [] }
            }
        case ACTION.FETCH_SUCCESS:
            return {
                ...state,
                fetch: { loading: false, error: null, article: action.payload }
            }
        case ACTION.FETCH_ERROR:
            return {
                ...state,
                fetch: { loading: false, error: action.payload, article: [] }
            }
        case ACTION.SUBMIT_START:
            return {
                ...state,
                submit: { loading: true, error: null, success: false }
            }
        case ACTION.SUBMIT_SUCCESS:
            return {
                ...state,
                submit: { loading: false, error: null, success: true }
            }
        case ACTION.SUBMIT_ERROR:
            return {
                ...state,
                submit: { loading: false, error: action.payload, success: false }
            }
        case ACTION.REMOVE_ARTICLE:
            return{
                ...state,
                fetch: { loading: false, error: null, article: action.payload }
            }
        default:
            return state;
    }
}

function updateReducer(state, action) {
    switch(action.type){
        case ACTION.UPDATE_FIELD:
            return {
                ...state,
                formData: {
                    ...state.formData,
                    [action.field]: action.value,
                }
            }
        case UDACTION.SET_VALUE:
            return {
                ...state,
                update: { updating: false, error: null, success: false },
                delete: {error: null, success: false },
                formData: action.payload,
            }
        case UDACTION.UPDATE_START:
            return {
                ...state,
                update: { updating: true, error: null, success: false },
                delete: {error: null, success: false },
            }
        case UDACTION.UPDATE_SUCCESS:
            return {
                ...state,
                update: { updating: false, error: null, success: true },
            }
        case UDACTION.UPDATE_ERROR:
            return {
                ...state,
                update: { updating: false, error: action.payload, success: false },
            }
        case UDACTION.RESET_FORM_ERROR:
            return {
                ...state,
                formError: {},
            }
        case UDACTION.SET_FORM_ERROR:
            return {
                ...state,
                update: {updating: false, error: null, success: false}, 
                formError: action.payload,
            }
        case UDACTION.DELETE_START:
            return { 
                ...state,
                delete: {error: null, success: false }
             }
        case UDACTION.DELETE_SUCCESS:
            return {
                ...state,
                delete: {error: null, success: true }
            }
        case UDACTION.DELETE_ERROR:
            return {
                ...state,
                delete: {error: action.payload, success: false }
            }
        default:
            return state;
    }
}

const HomePage = () => {
    const [preview, setPreview] = useState(false);
    const [id, setId] = useState(0);
    const [state, dispatch] = useReducer(homePageReducer, initialState);
    const [updateState, dispatchUpdate] = useReducer(updateReducer, {
        formData: null,
        formError: {},
        update: {
            updating: false,
            error: null,
            success: false,
        },
        delete: {
            error: null,
            success: false,
        }
    });

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: ACTION.FETCH_START });
            
            try{
                const response = await fetch('https://localhost:7198/api/Website/GetHomePage', {
                    method: 'GET', 
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include'
                });
                if(!response.ok) throw new Error("Failed to fetch");
                const data = await response.json();
                dispatch({ type: ACTION.FETCH_SUCCESS, payload: data.sort((a, b) => b.id - a.id)});
            } catch(err){
                dispatch({ type: ACTION.FETCH_ERROR, payload: err.message });
            }

        }
        fetchData();
    } ,[]);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        dispatch({ type: ACTION.SUBMIT_START });

        const newErrors = validateForm(state.formData);
        
        if(Object.keys(newErrors).length === 0){
            console.log("No Validation Errors");
            dispatch({ type: ACTION.RESET_FORM_ERROR });
        } else {
            dispatch({ type: ACTION.SET_FORM_ERROR, payload: newErrors });
            return;
        }

        try {
            const response = await fetch('https://localhost:7198/api/Website/AddArticle', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(state.formData)
            });

            if(!response.ok) throw new Error("Something went wrong");
         
            dispatch({ type: ACTION.SUBMIT_SUCCESS })
        } catch(err){
            dispatch({ type: ACTION.SUBMIT_ERROR, payload: err.message})
        }
    }

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        dispatchUpdate({ type: UDACTION.UPDATE_START });

        const newErrors = validateForm(updateState.formData);

        if(Object.keys(newErrors).length === 0){
            console.log("No Validation Errors");
            dispatchUpdate({ type: UDACTION.RESET_FORM_ERROR });
        } else {
            dispatchUpdate({ type: UDACTION.SET_FORM_ERROR, payload: newErrors });
            return;
        }

        try {
            const response = await fetch('https://localhost:7198/api/Website/EditArticle', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updateState.formData),
                credentials: 'include'
            });

            if(!response.ok) throw new Error("Request failed");
            dispatchUpdate({ type: UDACTION.UPDATE_SUCCESS });
        } catch(err) {
            dispatchUpdate({ type: UDACTION.DELETE_ERROR, payload: err.message });
        }
    }

    const handleDelete = async (id) =>{
        dispatchUpdate({ type: UDACTION.DELETE_START });
        const url = 'https://localhost:7198/api/Website/DeleteArticle?id=' + id;
        try{
            const response = await fetch(url, {
                method: 'Delete',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            });

            if(response.ok){
                const artikelAfter = state.fetch.article.filter(item => item.id !== id);
                console.log(artikelAfter);
                dispatch({ type: ACTION.REMOVE_ARTICLE, payload: artikelAfter})
                dispatchUpdate({ type: UDACTION.DELETE_SUCCESS });
            } else {
                throw new Error("Bad Request");
            }
        } catch(error) {
            dispatchUpdate({ type: UDACTION.DELETE_ERROR, payload: error.message });
        }
    }

    const handleEdit = (id) =>{
        const article = state.fetch.article.find(item => item.id === id);
        dispatchUpdate({ type: UDACTION.SET_VALUE, payload: article});
    }

    const handleId = (id) => {
        setId(id);
    }

    const handlePreview = () => {
        setPreview(prev => !prev);
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

    return (
        <div className="p-4 mt-3 card-default danger-card">
            <NavbarAdmin />
            <h2>HomePage Dashboard</h2>
            <div>
                <button onClick={() => dispatch({ type: ACTION.CREATE_POST })} className="btn btn-primary shadow">Create new post</button>
                <button onClick={() => dispatch({ type: ACTION.UPDATE_POST })} className="btn btn-primary ms-2 shadow">Edit / Delete posts</button>
            </div>
            <hr />
            {state.mode === "new" ? 
                    <div className="mt-4">
                        <Form 
                            handleSubmit={handleSubmit} 
                            handleChange={e => dispatch({ type: ACTION.UPDATE_FIELD, field: e.target.name, value: e.target.value })} 
                            formData={state.formData}
                            formError={state.formError}
                            preview={preview}
                            update={state.submit.loading}
                            handlePreview={handlePreview}
                            textSubmit="Create"
                            textLoading="Creating ..."/>   
                        {state.error && <ErrorAdmin />}  
                        {state.submit.success && <SuccessAdmin text="Article Created" />}  
                    </div>
            :
                    <div className="mt-4 container">
                        <ArticleList data={state.fetch} handleEdit={handleEdit} handleId={handleId} toggle="modal" target="#exampleModal" />
                        <ModalDialog handleDelete={handleDelete} id={id} text="Article"/>
                        {updateState.delete.success && <SuccessAdmin text="Article deleted!" />}
                        {updateState.formData != null && 
                        <>
                            <hr />
                            <Form
                                handleSubmit={handleEditSubmit}
                                handleChange={e => dispatchUpdate({ type: ACTION.UPDATE_FIELD, field: e.target.name, value: e.target.value })}
                                formData={updateState.formData}
                                formError={updateState.formError}
                                preview={preview}
                                update={updateState.update.updating}
                                handlePreview={handlePreview} 
                                textSubmit="Update"
                                textLoading="Updating ..."/>
                            {updateState.error && <ErrorAdmin />}  
                            {updateState.update.success && <SuccessAdmin text="Article Updated" />}  
                        </>}
                    </div> 
            }
        </div>
)
}

export default HomePage;