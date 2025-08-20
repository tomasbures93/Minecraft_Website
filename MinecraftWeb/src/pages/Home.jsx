import { useState } from "react"
import { useEffect } from "react";
import Loading from "../components/Loading";
import Error from "../components/Error";
import HomePageData from "../components/HomePageData";
import Pagination from "../components/Pagination";

const Home = () => {
    const [homepage, setHomepage] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [pagination, setPagination] = useState({currentPage: 1, pagesTotal: 1});
    const [page, setPage] = useState(1);

    const url = "https://localhost:7198/api/Website/GetHomePagePaged?page=" + page;

    const fetchData = () => {
        fetch(url)
            .then(response => response.json())
            .then(json => {
                setLoading(false);
                setPagination({currentPage: json.currentPage, pagesTotal: json.pagesTotal});
                setHomepage(json.articles.sort((a , b) => b.id - a.id));
            })
            .catch(() => {
                setLoading(false);
                setError(true);
                console.log("here");
            })
    }

    useEffect(() => {
        fetchData();
        window.scrollTo(0, 0);
    }, [page]);

    const handlePage = (page) => {
        setPage(page);
    }

    if(loading) return <Loading />

    return (
        error ? <Error /> : 
        <>
            <HomePageData data={homepage} />
            {pagination.pagesTotal > 1 && <Pagination page={page} pagination={pagination} handlePage={handlePage}/>}
        </>
    )
}

export default Home