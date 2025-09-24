import { useReducer } from "react"
import NavbarAdmin from "../components_admin/NavbarAdmin"
import SuccessAdmin from "../components_admin/SuccessAdmin"
import ErrorAdmin from "../components_admin/ErrorAdmin"
import ButtonLoading from "../components_admin/ButtonLoading"
import { BASE_URL, API_AUTH_ENDPOINTS } from '../api'

const ACTION = {
    UPDATE_FIELD: "UPDATE_FIELD",
    SUBMIT_START: "SUBMIT_START",
    SUBMIT_SUCCESS: "SUBMIT_SUCCESS",
    SUBMIT_ERROR: "SUBMIT_ERROR"
}

const initialState = {
    formData: {
        OldPassword: '',
        NewPassword: '',
        NewPasswordSecondTime: '',
        PIN: 0,
    },
    submit: {
        updating: false,
        error: null,
        success: false,
    }
}

function passwordChangeReducer(state, action){
    switch(action.type){
        case ACTION.UPDATE_FIELD:
            return {
                ...state,
                formData: {
                    ...state.formData,
                    [action.field]: action.value
                }
            }
        case ACTION.SUBMIT_START:
            return {
                ...state,
                submit: { updating: true, error: null, success: false }
            }
        case ACTION.SUBMIT_SUCCESS:
            return {
                fomrData: initialState,
                submit: { updating: false, error: null, success: true }
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

const ChangePassword = () => {
    const [state, dispatch] = useReducer(passwordChangeReducer, initialState);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        dispatch({ type: ACTION.SUBMIT_START });

        if(state.formData.OldPassword === "" ||
            state.formData.NewPassword === "" ||
            state.formData.NewPasswordSecondTime === "" ||
            state.formData.PIN === 0){
                dispatch({ type: ACTION.SUBMIT_ERROR, payload: "Empty fields"});
                return
            }

        try{
            const response = await fetch(`${BASE_URL}${API_AUTH_ENDPOINTS.CHANGE_PASSWORD}`,{
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(state.formData),
                credentials: 'include',
            });

            if(!response.ok) throw new Error(await response.text());
            dispatch({ type: ACTION.SUBMIT_SUCCESS });
        } catch(err){
            dispatch({ type: ACTION.SUBMIT_ERROR, payload: err.message});
        }

    } 
    return (
    <div className="mt-3 p-4 card-default danger-card">
        <NavbarAdmin />
        <div className="p-2 d-flex justify-content-center">
            <div>
            <h2>Change Password</h2>
                <form onSubmit={handleSubmit} onChange={e => dispatch({ type: ACTION.UPDATE_FIELD, field: e.target.name, value: e.target.value })}>
                    <input type="password" className="form-control dark-input shadow" name="OldPassword" placeholder="Old Password"/>
                    <input type="password" className="form-control dark-input shadow mt-3" name="NewPassword" placeholder="New Password"/>
                    <input type="password" className="form-control dark-input shadow mt-3" name="NewPasswordSecondTime" placeholder="New Password again"/>
                    <input type="number" className="form-control dark-input shadow mt-3" name="PIN" placeholder="PIN"/>
                    {state.submit.updating ? <ButtonLoading text="Changing password" /> :  <input type="submit" value="Change Password" className="form-control btn btn-success shadow mt-3" /> }
                </form>
                {state.submit.error && <ErrorAdmin text={state.submit.error} /> }
                {state.submit.success && <SuccessAdmin text="Password changed" />}
            </div>
        </div>
    </div>
)}

export default ChangePassword