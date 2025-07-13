import { useState } from "react"
import { useEffect } from "react";
import Loading from "../components/Loading";
import Error from "../components/Error";
import HomePageData from "../components/HomePageData";

const Home = () => {
    const [homepage, setHomepage] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch("http://localhost:5089/api/Website/GetHomePage")
            .then(response => response.json())
            .then(json => {
                setLoading(false);
                setHomepage(json.sort((a , b) => b.id - a.id));
            })
            .catch(() => {
                setLoading(false);
                setError(true);
            })
    }, []);

    if(loading) return <Loading />

    return (
        error ? <Error /> : <HomePageData data={homepage}/>
    )
}

export default Home