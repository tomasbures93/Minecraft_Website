import { SpinnerGap } from "phosphor-react"

const ButtonLoading = ({text}) => (
    <button type="submit" className="btn btn-warning mt-3 shadow" disabled>
        <SpinnerGap size={20} className="spin"/>  {text}
    </button>
)

export default ButtonLoading