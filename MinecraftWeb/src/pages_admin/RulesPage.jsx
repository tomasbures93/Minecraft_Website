import { TextBolder, TextHThree, TextItalic, TextUnderline } from "phosphor-react"
import NavbarAdmin from "../components_admin/NavbarAdmin"

const RulesPage = () => {

    return (
        <div className="p-4 mt-3 card-default danger-card">
            <NavbarAdmin />
            <h2>Rules Dashboard</h2>
            <form>
                <p>
                    <TextBolder size={20} /> 
                    <TextItalic size={20} />
                    <TextUnderline size={20} />
                    <TextHThree size={20} />
                </p>
                <textarea className="form-control dark-input shadow" rows="10"></textarea>
                <button className="mt-3 btn btn-primary shadow">Udpate</button>
            </form>
        </div>
    )
}

export default RulesPage