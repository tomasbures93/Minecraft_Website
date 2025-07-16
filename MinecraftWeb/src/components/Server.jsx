import { useEffect, useState } from "react";
import Loading from "./Loading";

const Server = () => {
    const [info, setInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        fetch("http://localhost:5089/api/Website/GetServerInfo")
            .then(response => response.json())
            .then(json => {
                setLoading(false);
                setInfo(json);
            })
            .catch(() => {
                const info = {
                    "serverName": "Unknown",
                    "ip": "Unknown",
                    "status": "Unknown"
                };
                setLoading(false);
                setInfo(info);
            })
    }, []);

    if(loading) return <Loading />

    return (
    <div className="p-2 mt-3 text-center card-default serverinfo-card">
        <div className='d-flex  flex-lg-row flex-column justify-content-evenly'>
            <div>Server Name: <strong>{info.serverName}</strong></div>
            <div>Server IP: <strong>{info.ip}</strong></div>
            <div>Server Status: <strong>{info.status}</strong>
            </div>
        </div>
    </div>)
}

export default Server