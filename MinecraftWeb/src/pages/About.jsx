import { useState } from "react";
import { useEffect } from "react";
import Loading from "../components/Loading";
import Error from "../components/Error";
import AboutData from "../components/AboutData";

const About = () => {
    const [about, setAbout] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch("https://localhost:7198/api/Website/GetAboutPage")
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
        error ? <Error /> : <AboutData data={about}/>
            )
}
    
export default About