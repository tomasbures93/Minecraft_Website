import { useReducer, useState, useEffect } from "react"
import Loading from "../components/Loading";
import Error from "../components/Error";
import HomePageData from "../components/HomePageData";
import Pagination from "../components/Pagination";
import NoData from "../components/NoData";
import { BASE_URL, API_PUBLIC_ENDPOINTS } from '../api';

const ACTION = {
    FETCH_START: "FETCH_START",
    FETCH_SUCCESS: "FETCH_SUCCESS",
    FETCH_ERROR: "FETCH_ERROR",
};

function homeReducer(state, action){
    switch(action.type){
        case ACTION.FETCH_START:
            return { loading: true, error: null, homepage: null };
        case ACTION.FETCH_SUCCESS:
            return { loading: false, error: null, homepage: action.payload };
        case ACTION.FETCH_ERROR:
            return { loading: false, error: action.payload, homepage: null };
        default:
            return state;
    }
};

const Home = () => {
    const [pagination, setPagination] = useState({currentPage: 1, pagesTotal: 1});
    const [state, dispatch] = useReducer(homeReducer, {
        loading: false,
        error: null,
        homepage: null,
    });

    useEffect(() => {
        const fetchData = async () => {
            dispatch({type: ACTION.FETCH_START});
            const url = `${BASE_URL}${API_PUBLIC_ENDPOINTS.HOMEPAGE}?page=` + pagination.currentPage;

            try{
                const response = await fetch(url);
                if(!response.ok) throw new Error("Failed to fetch");

                const data = await response.json();

                setPagination({currentPage: data.currentPage, pagesTotal: data.pagesTotal});
                dispatch({type: ACTION.FETCH_SUCCESS, payload: data.articles});
            } catch(err){
                dispatch({type: ACTION.FETCH_ERROR, payload: err.message});
            }
        }
        
        fetchData();
        window.scrollTo(0, 0);
    }, [pagination.currentPage]);

    const handlePage = (newPage) => {
        setPagination(prev => ({
            ...prev,
            currentPage: newPage })
        )
    }

    if(state.loading) return <Loading />
    if(state.error) return <Error />
    if(!state.homepage) return <NoData />

    return (
        <>
            <HomePageData data={state.homepage} />
            {pagination.pagesTotal > 1 && <Pagination pagination={pagination} handlePage={handlePage}/>}
        </>
    )
}

export default Home