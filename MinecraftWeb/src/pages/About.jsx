import { useState } from "react";
import { useEffect } from "react";
import Loading from "../components/Loading";
import Error from "../components/Error";

const About = () => {
    const [about, setAbout] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch("http://placeholder")
            .then(response => response.json())
            .then(json => {
                setLoading(false);
                setAbout(json);
            }).catch(() => {
                setLoading(false);
                setError(true);
            })
    }, []);

    if(loading) return <Loading />

    return (
        <div className="p-2 mt-3 dark-bg rounded">
            {error ? 
                <Error />:
                <span>About</span>
            }
    </div>)
}
    
export default About