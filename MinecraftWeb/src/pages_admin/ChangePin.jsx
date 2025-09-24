import { useReducer } from "react";
import NavbarAdmin from "../components_admin/NavbarAdmin";
import ErrorAdmin from "../components_admin/ErrorAdmin";
import ButtonLoading from "../components_admin/ButtonLoading";
import SuccessAdmin from "../components_admin/SuccessAdmin";
import { BASE_URL, API_AUTH_ENDPOINTS } from '../api'

const ACTION = {
    UPDATE_FIELD: "UPDATE_FIELD",
    SUBMIT_START: "SUBMIT_START",
    SUBMIT_SUCCESS: "SUBMIT_SUCCESS",
    SUBMIT_ERROR: "SUBMIT_ERROR"
}

const initialState = {
    formData: {
        OldPIN: '',
        NewPIN: '',
        NewPINSecondTime: '',
        Password: '',
    },
    submit: {
        updating: false,
        error: null,
        success: false,
    }
}

function changePinReducer(state, action){
    switch(action.type){
        case ACTION.UPDATE_FIELD:
            return {
                submit:{ updating: false, error: null, success: false },
                formData: {
                    ...state.formData,
                    [action.field]: action.value,
                }
            }
        case ACTION.SUBMIT_START:
            return {
                ...state,
                submit: { updating: true, error: null, success: false }
            }
        case ACTION.SUBMIT_SUCCESS:
            return {
                ...state,
                submit: { udpating: false, error: null, success: true }
            }
        case ACTION.SUBMIT_ERROR:
            return {
                ...state,
                submit: { updating: false, error: action.payload, success: false }
            }
        default: 
            return state;
    }
}

const ChangePin = () => {
    const [state, dispatch] = useReducer(changePinReducer, initialState); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: ACTION.SUBMIT_START});

        if(state.formData.OldPIN === "" ||
            state.formData.NewPIN === "" ||
            state.formData.NewPINSecondTime === "" ||
            state.formData.Password === ""){
            dispatch({ type: ACTION.SUBMIT_ERROR, payload: "Empty fields"})
            return
        }

        try{
            const response = await fetch(`${BASE_URL}${API_AUTH_ENDPOINTS.CHANGE_PIN}`,{
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify(state.formData)
            });

            if(!response.ok) throw new Error(await response.text());
            dispatch({ type: ACTION.SUBMIT_SUCCESS })
        } catch(err){
            dispatch({ type: ACTION.SUBMIT_ERROR, payload: err.message });
        }

    }
    return (
        <div className="mt-3 p-4 card-default danger-card">
        <NavbarAdmin />
        <div className="p-2 d-flex justify-content-center">
            <div>
            <h2>Change PIN</h2>
                <form onSubmit={handleSubmit} onChange={e => dispatch({ type: ACTION.UPDATE_FIELD, field: e.target.name, value: e.target.value })}>
                    <input type="number" className="form-control dark-input shadow" name="OldPIN" placeholder="Old PIN"/>
                    <input type="number" className="form-control dark-input shadow mt-3" name="NewPIN" placeholder="New PIN"/>
                    <input type="number" className="form-control dark-input shadow mt-3" name="NewPINSecondTime" placeholder="New PIN again"/>
                    <input type="password" className="form-control dark-input shadow mt-3" name="Password" placeholder="Password"/>
                    {state.submit.updating ? <ButtonLoading text="Changing PIN" /> : <input type="submit" value="Change PIN" className="form-control btn btn-success shadow mt-3" />}
                    {state.submit.error && <ErrorAdmin text={state.submit.error} />}
                </form>
                {state.submit.success && <SuccessAdmin text="PIN Changed" />}
            </div>
        </div>
    </div>)}

export default ChangePin