import { useEffect } from "react";
import { useState } from "react";
import Loading from "../components/Loading";
import Error from "../components/Error";

const Rules = () => {
    const [rules, setRules] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false)

    useEffect(() => {
        fetch("http://placeholder")
            .then(response => response.json())
            .then(json => {
                setLoading(false);
                setRules(json);
            }).catch(() =>{
                setLoading(false);
                setError(true);
            })
    }, []);

    if(loading) return <Loading />

    return (
    <div className="p-2 mt-3 dark-bg rounded">
        {error ? 
            <Error />:
            <span>Rules</span>}
    </div>)
}

export default Rules