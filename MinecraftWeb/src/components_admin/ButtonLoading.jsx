import { SpinnerGap } from "phosphor-react"

const ButtonLoading = ({text}) => (
    <button type="button" className="btn btn-warning mt-3 shadow" disabled>
        <SpinnerGap size={20} className="spin"/>  {text}
    </button>
)

export default ButtonLoading