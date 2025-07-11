import { useState } from "react"
import { useEffect } from "react";
import Loading from "../components/Loading";
import Error from "../components/Error";

const Home = () => {
    const [homepage, setHomepage] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch("http://localhost:5089/api/Website/GetHomePage")
            .then(response => response.json())
            .then(json => {
                setLoading(false);
                setHomepage(json);
            })
            .catch(() => {
                setLoading(false);
                setError(true);
            })
    }, []);

    if(loading) return <Loading />

    return (
    <div className="p-2 mt-3 dark-bg rounded">
        {error ? <Error /> : <span>HomePage</span>}
    </div>)
}

export default Home