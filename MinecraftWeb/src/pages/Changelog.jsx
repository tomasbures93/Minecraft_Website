import { useEffect } from "react"
import { useState } from "react";
import ChangeLogData from "../components/ChangeLogData";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Pagination from "../components/Pagination";

const Changelog = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [pagination, setPagination] = useState({pagesTotal: 1, currentPage: 1});
    const [page, setPage] = useState(1);

    const url = "https://localhost:7198/api/Website/GetChangeLogPagePaged?page=" + page;

    const fetchData = () => {
        fetch(url)
            .then(response => response.json())
            .then(json => {
                setLoading(false);
                setPagination({pagesTotal: json.pagesTotal, currentPage: json.currentPage});
                setLogs(json.changelog.sort((a, b) => b.id - a.id))
            }
            ).catch(() => {
                setLoading(false);
                setError(true)
            })
    }

    useEffect(() => {
        fetchData();
        window.scrollTo(0,0);
    }, [page]);

    const handlePage = (page) => {
        setPage(page);
    }

    if(loading) return <Loading />

    return (
        error ? <Error /> : 
            <>
                <ChangeLogData inhalt={logs}/>
                {pagination.pagesTotal > 1 && <Pagination page={page} pagination={pagination} handlePage={handlePage}/>}
            </>
    )
}

export default Changelog