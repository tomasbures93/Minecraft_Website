import { Warning } from "phosphor-react"

const ErrorAdmin = ({text = "Something went wrong!!!"}) => (
    <div className='mt-3 text-center text-danger'><Warning size={20} /> {text}</div>
)

export default ErrorAdmin