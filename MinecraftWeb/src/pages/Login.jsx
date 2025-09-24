import { SpinnerGap } from "phosphor-react";
import { useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import ErrorAdmin from "../components_admin/ErrorAdmin";
import { BASE_URL, API_AUTH_ENDPOINTS } from '../api'

const ACTION = {
    UPDATE_FIELD: "UPDATE_FIELD",
    FETCH_START: "FETCH_START",
    FETCH_SUCCESS: "FETCH_SUCCESS",
    FETCH_ERROR: "FETCH_ERROR",
};

function loginReducer(state, action){
    switch(action.type){
        case ACTION.UPDATE_FIELD:
            return { ...state,
                formData: {
                    ...state.formData,
                    [action.field]: action.value,
                }
            };
        case ACTION.FETCH_START:
            return { ...state, loading: true, error: null};
        case ACTION.FETCH_SUCCESS:
            return { ...state, loading: false, error: null };
        case ACTION.FETCH_ERROR:
            return { ...state, loading: false, error: action.payload};
        default:
            return state;
    }
}

const Login = () => {
    const navigate = useNavigate();
    const token = sessionStorage.getItem('serverAdminToken');

    const initialState = { username: "", password: "", pin: ""};
    const [state, dispatch] = useReducer(loginReducer, {
        loading: false,
        error: null,
        formData: initialState,
    });

    useEffect(() => {
        if(token === "true") {
            navigate('/AdminPage');
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({type: ACTION.FETCH_START});

        try{
            const response = await fetch(`${BASE_URL}${API_AUTH_ENDPOINTS.LOGIN}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(state.formData),
                credentials: 'include'
            });

            if(!response.ok) throw new Error("Request failed");

            const currentDatum = new Date();
            const datumToUpdate = new Date();
            const expiringDatum = datumToUpdate.setHours(currentDatum.getHours() + 1);
            sessionStorage.setItem("serverAdminTokenExp", Number(expiringDatum));
            dispatch({type: ACTION.FETCH_SUCCESS});
            navigate('/AdminPage');
        }catch(err){
            dispatch({type: ACTION.FETCH_ERROR, payload: err.message })
        }
    };
    
    return (
    <div className="mt-3 p-5 d-flex justify-content-center card-default danger-card">
        <div>
        <h2 className="pb-2">Login</h2>
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" className="form-control dark-input shadow" id="username" placeholder="username" 
                value={state.formData.username} 
                onChange={e => dispatch({ type: ACTION.UPDATE_FIELD, field: "username", value: e.target.value })} 
                />
            <input type="password" name="password" className="form-control dark-input mt-3 shadow" id="password" placeholder="password" 
                value={state.formData.password} 
                onChange={e => dispatch({ type: ACTION.UPDATE_FIELD, field: "password", value: e.target.value })}
            />
            <input type="password" name="pin" className="form-control dark-input mt-3 shadow" id="pin" placeholder="PIN" 
                value={state.formData.pin} 
                onChange={e => dispatch({ type: ACTION.UPDATE_FIELD, field: "pin", value: e.target.value })}
            />
            {state.loading ? 
                <button type="submit" className="form-control btn btn-warning shadow mt-3" disabled><SpinnerGap className="spin" /> Loading...</button>
                :
                <input type="submit" value="Login" className="form-control btn btn-success shadow mt-3" />
            }
            {state.error && <ErrorAdmin />}
        </form>
    </div>
    </div>)
}

export default Login