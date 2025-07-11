const Server = ({ip, status}) => (
    <div className="p-2 mt-3 dark-bg rounded text-center">
        <span>Server IP: {ip} | Server status: {status}</span>
    </div>
)

export default Server