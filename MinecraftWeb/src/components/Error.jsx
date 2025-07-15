import { Warning } from "phosphor-react"

const Error = () => (
    <div className="p-3 mt-3 card-default danger-card">
        <span><Warning size={20} /> Something went wrong!</span>
    </div>)

export default Error