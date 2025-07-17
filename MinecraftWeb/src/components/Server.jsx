const Server = ({data}) => {
    const port = data?.port ? `:${data.port}` : "";
    
    return (
    <div className="p-2 mt-3 text-center card-default serverinfo-card">
        <div className='d-flex  flex-lg-row flex-column justify-content-evenly'>
            <div>Server Name: <strong>{data.serverName}</strong></div>
            <div>Server IP: <strong>{data.ip}{port}</strong></div>
            <div>Server Status: <strong>{data.status}</strong>
            </div>
        </div>
    </div>)
}

export default Server