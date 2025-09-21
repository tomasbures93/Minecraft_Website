import { useEffect, useReducer } from "react";
import Loading from "../components/Loading";
import Error from "../components/Error";
import RulesData from "../components/RulesData";
import NoData from "../components/NoData";

const ACTION = {
    FETCH_START: "FETCH_START",
    FETCH_SUCCESS: "FETCH_SUCCESS",
    FETCH_ERROR: "FETCH_ERROR"
}

function rulesReducer(state, action){
    switch(action.type){
        case ACTION.FETCH_START:
            return { loading: true, error: null, rules: null }
        case ACTION.FETCH_SUCCESS:
            return { loading: false, error: null, rules: action.payload }
        case ACTION.FETCH_ERROR:
            return { loading: false, error: action.payload, rules: null }
        default:
            return state;
    }
}

const Rules = () => {
    const [state, dispatch] = useReducer(rulesReducer, {
        loading: false,
        error: null,
        rules: null,
    });

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: ACTION.FETCH_START });

            try{
                const response = await fetch("https://localhost:7198/api/Website/GetRulesPage");
                if(!response.ok) throw new Error("Failed to fetch");

                const data = await response.json();
                dispatch({ type: ACTION.FETCH_SUCCESS, payload: data });
            } catch(err){
                dispatch({ type: ACTION.FETCH_ERROR, payload: err.message });
            }
        }

        fetchData();
    }, []);

    if(state.loading) return <Loading />
    if(state.error) return <Error />
    if(!state.rules) return <NoData />

    return ( <RulesData data={state.rules} /> )
}

export default Rules