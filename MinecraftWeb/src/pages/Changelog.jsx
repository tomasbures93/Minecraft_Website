import { useEffect } from "react"
import { useState } from "react";
import ChangeLogData from "../components/ChangeLogData";
import Loading from "../components/Loading";
import Error from "../components/Error";

const Changelog = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch('http://localhost:5089/api/Website/GetChangeLogPage')
            .then(response => response.json())
            .then(json => {
                setLoading(false);
                setLogs(json.sort((a, b) => b.id - a.id))
            }
            ).catch(() => {
                setLoading(false);
                setError(true)
            })
    }, []);

    if(loading) return <Loading />

    return (
    <div className="p-2 mt-3 dark-bg rounded">
        {error ? 
            <Error />:
            <ChangeLogData inhalt={logs}/>}
    </div>)
}

export default Changelog