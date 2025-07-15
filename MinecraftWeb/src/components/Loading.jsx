import { SpinnerGap } from "phosphor-react"

const Loading = () => (
    <div className="p-2 mt-3 text-center card-default warning-card">
        <span><SpinnerGap size={20} className="spin"/> Loading...</span>
    </div>
)

export default Loading