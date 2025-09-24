import NavbarAdmin from "../components_admin/NavbarAdmin";
import ErrorAdmin from "../components_admin/ErrorAdmin";
import { useEffect, useReducer, useState } from "react";
import TextArea from "../components_admin/TextArea";
import SuccessAdmin from "../components_admin/SuccessAdmin";
import ButtonLoading from "../components_admin/ButtonLoading";
import ButtonSubmit from "../components_admin/ButtonSubmit";
import ButtonNormal from "../components_admin/ButtonNormal";
import Preview from "../components_admin/Preview";
import ErrorForm from "../components_admin/ErrorForm";
import { BASE_URL, API_ADMIN_ENDPOINTS, API_PUBLIC_ENDPOINTS } from '../api'

const ACTION = {
    UPDATE_FIELD: "UPDATE_FIELD",
    SET_FORM_ERROR: "SET_FORM_ERROR",
    RESET_FORM_ERROR: "RESET_FORM_ERROR",
    FETCH_START: "FETCH_START",
    FETCH_SUCCESS: "FETCH_SUCCESS",
    FETCH_ERROR: "FETCH_ERROR",
    SUBMIT_START: "SUBMIT_START",
    SUBMIT_SUCCESS: "SUBMIT_SUCCESS",
    SUBMIT_ERROR: "SUBMIT_ERROR"
}

function rulesReducer(state, action){
    switch(action.type){
        case ACTION.UPDATE_FIELD:
            return {
                ...state,
                formData: {
                    ...state.formData,
                    [action.field]: action.value,
                }
            }
        case ACTION.FETCH_START:
            return {
                ...state,
                fetch: { loading: true, error: null }
            };
        case ACTION.FETCH_SUCCESS:
            return {
                ...state,
                fetch: { loading: false, error: null },
                formData: action.payload
            }
        case ACTION.FETCH_ERROR:
            return {
                ...state,
                fetch: { loading: false, error: action.payload }
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
        case ACTION.SET_FORM_ERROR:
            return {
                ...state,
                submit: { loading: false, error: false, success: false },
                formError: action.payload,
            }
        case ACTION.RESET_FORM_ERROR:
            return {
                ...state,
                formError: {},
            }
        default:
            return state;
    }
}

const initialState = {
    fetch: {
        loading: false,
        error: null,
    },
    submit: {
        loading: false,
        error: null,
        success: false,
    },
    formData: {
        text: "",
    },
    formError: {},
}

const RulesPage = () => {
    const [preview, setPreview] = useState(false);
    const [state, dispatch] = useReducer(rulesReducer, initialState);

    useEffect(() => {
        const fetchRules = async () => {
            dispatch({ type: ACTION.FETCH_START });
            try{
                const response = await fetch(`${BASE_URL}${API_PUBLIC_ENDPOINTS.RULES}`);
                if(!response.ok) throw new Error("Failed to fetch");

                const data = await response.json();
                dispatch({ type: ACTION.FETCH_SUCCESS, payload: data });
            }catch(err){
                dispatch({ type: ACTION.FETCH_ERROR, payload: err.message });
            }
        }

        fetchRules();
    },[]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: ACTION.SUBMIT_START });

        const newErrors = validateForm(state.formData);

        if(Object.keys(newErrors).length === 0){
            console.log("Form validation OK");
            dispatch({ type: ACTION.RESET_FORM_ERROR });
        } else {
            dispatch({ type: ACTION.SET_FORM_ERROR, payload: newErrors });
            return;
        }

        try{
            const response = await fetch(`${BASE_URL}${API_ADMIN_ENDPOINTS.EDIT_RULES}`,{
                method: 'PUT', 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(state.formData),
                credentials: 'include'
            });
            
            if(!response.ok) throw new Error("Request failed");
            dispatch({ type: ACTION.SUBMIT_SUCCESS });

        } catch (err){
            dispatch({ type: ACTION.SUBMIT_ERROR, payload: err.message });
        }
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
                    <TextArea handleChange={e => dispatch({ type: ACTION.UPDATE_FIELD, field: "text", value: e.target.value })} name="text" value={state.formData.text}/>
                    {state.formError.text && <ErrorForm text={state.formError.text} />}
                    {preview && <Preview text={state.formData.text} />}
                    {state.submit.loading ?
                        <ButtonLoading text="Updating ..." /> :
                        <ButtonSubmit text="Update" />
                    }
                    <ButtonNormal text="Preview" style="mt-3 ms-2 btn btn-secondary shadow" onClick={handlePreview}/>
                    {state.submit.error && <ErrorAdmin /> }
                    {state.submit.success &&  <SuccessAdmin text="Rules Updated" />}
            </form>
        </div>
    )
}

export default RulesPage