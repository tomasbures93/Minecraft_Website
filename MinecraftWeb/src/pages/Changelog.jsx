import { useEffect, useReducer } from "react"
import { useState } from "react";
import ChangeLogData from "../components/ChangeLogData";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Pagination from "../components/Pagination";
import NoData from "../components/NoData";

const ACTION = {
    FETCH_START: "FETCH_START",
    FETCH_SUCCESS: "FETCH_SUCCESS",
    FETCH_ERROR: "FETCH_ERROR",
};

function changelogReducer(state, action){
    switch(action.type){
        case ACTION.FETCH_START:
            return {loading: true, error: null, logs: null};
        case ACTION.FETCH_SUCCESS:
            return {loading: false, error: null, logs: action.payload};
        case ACTION.FETCH_ERROR:
            return {loading: false, error: action.payload, logs: null};
        default:
            return state;
    }
}

const Changelog = () => {
    const [pagination, setPagination] = useState({pagesTotal: 1, currentPage: 1});

    const [state, dispatch] = useReducer(changelogReducer, {
        loading: false,
        error: null,
        logs: null,
    });

    useEffect(() => {
        const fetchData = async () => {
            dispatch({type: ACTION.FETCH_START});

            const url = "https://localhost:7198/api/Website/GetChangeLogPagePaged?page=" + pagination.currentPage;

            try{
                const response = await fetch(url);
                if(!response.ok) throw new Error("Failed to fetch");

                const data = await response.json();
                setPagination({pagesTotal: data.pagesTotal, currentPage: data.currentPage});
                dispatch({type: ACTION.FETCH_SUCCESS, payload: data.changelog.sort((a, b) => b.id - a.id)});
            } catch(err){
                dispatch({type: ACTION.FETCH_ERROR, payload: err.message});
            }
        }

        fetchData();
        window.scrollTo(0,0);
    }, [pagination.currentPage]);

    const handlePage = (newPage) => {
        setPagination(prev => ({
            ...prev,
            currentPage: newPage,
        }));
    }

    if(state.loading) return <Loading />
    if(state.error) return <Error />
    if(!state.logs) return <NoData />

    return (
            <>
                <ChangeLogData inhalt={state.logs}/>
                {pagination.pagesTotal > 1 && <Pagination pagination={pagination} handlePage={handlePage}/>}
            </>
    )
}

export default Changelog