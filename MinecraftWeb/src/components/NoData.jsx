import { Warning } from "phosphor-react"

const NoData = () => (
        <div className="p-3 mt-3 card-default danger-card">
                <span><Warning size={20}/> No data found</span>
        </div>
)

export default NoData