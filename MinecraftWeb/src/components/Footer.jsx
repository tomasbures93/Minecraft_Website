import { NavLink } from "react-router-dom"

const Footer = () => (
    <div className="p-2 mt-3 mb-3 dark-bg rounded text-center">
        <p>&copy; 2025 Wanna Be Anarchy Server</p>
        <p><NavLink to='/Impressum'>Impressum</NavLink> | <NavLink to='/Datenschutz'>Datenschutzerklärung</NavLink></p>
        Hosted in Germany | Minecraft Java Edition 1.21.4
    </div>
)

export default Footer