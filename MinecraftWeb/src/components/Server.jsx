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
    <div className="p-2 mt-3 dark-bg rounded text-center">
        <span>Server status: {info.serverName} | Server IP: {info.ip} | Server Status: "online"</span>
    </div>)
}

export default Server