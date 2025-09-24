import { useReducer, useEffect } from "react";
import Loading from "../components/Loading";
import Error from "../components/Error";
import AboutData from "../components/AboutData";
import NoData from "../components/NoData";
import { BASE_URL, API_PUBLIC_ENDPOINTS} from '../api'

const ACTIONS = {
    FETCH_START: "FETCH_START",
    FETCH_SUCCESS: "FETCH_SUCCESS",
    FETCH_ERROR: "FETCH_ERROR",
}

function aboutReducer(state, action) {
    switch(action.type){
        case ACTIONS.FETCH_START:
            return { loading: true, error: null, about: null };
        case ACTIONS.FETCH_SUCCESS:
            return { loading: false, error: null, about: action.payload };
        case ACTIONS.FETCH_ERROR:
            return { loading: false, error: action.payload, about: null };
        default:
            return state;
    }
}

const About = () => {
    const [state, dispatch] = useReducer(aboutReducer, {
        loading: false,
        error: null,
        about: null,
    });

    const { loading, error, about } = state;

    useEffect(() => {
        const fetchAbout = async () => {
            dispatch({type: ACTIONS.FETCH_START });

            try{
                const response = await fetch(`${BASE_URL}${API_PUBLIC_ENDPOINTS.ABOUTPAGE}`);
                if(!response.ok) throw new Error("Failed to fetch");

                const data = await response.json();
                dispatch({type: ACTIONS.FETCH_SUCCESS, payload: data });
            } catch(err){
                dispatch({type: ACTIONS.FETCH_ERROR, payload: err.message });
            }
        };

        fetchAbout();
    }, []);

    if(loading) return <Loading />
    if(error) return <Error />
    if(!about) return <NoData />

    return ( <AboutData data={about}/> )
}
    
export default About