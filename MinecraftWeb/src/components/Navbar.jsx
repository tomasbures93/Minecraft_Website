import { NavLink } from "react-router"

const Navbar = () => (
    <div className="dark-bg rounded m-0 mb-3">
        <nav className="navbar navbar-expand-md m-2">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <i className="bi bi-list text-white"></i>
            </button>
            <NavLink to="/" className="navbar-brand text-light">Home</NavLink>
            <div className="collapse navbar-collapse text-light" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto"> 
                    <li className="nav-item">
                        <NavLink to="/" className="nav-link text-light">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/About" className="nav-link text-light">About</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/Rules" className="nav-link text-light">Rules</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/Changelog" className="nav-link text-light">Changelog</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/Statistics" className="nav-link text-light">Statistics</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
)

export default Navbar