import { NavLink } from "react-router-dom"
import LogoutTimer from "./LogoutTimer"

const NavbarAdmin = () => (
    <>
    <div className="m-0">
        <nav className="navbar navbar-expand-md">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContentAdmin" aria-controls="navbarSupportedContentAdmin" aria-expanded="false" aria-label="Toggle navigation">
                <i className="bi bi-list text-white"></i>
            </button>
            <div className="collapse navbar-collapse text-light" id="navbarSupportedContentAdmin">
                <ul className="navbar-nav mx-auto"> 
                    <li className="nav-item">
                        <NavLink to="/AdminPage" className="nav-link text-light">Website</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/AdminHomePage" className="nav-link text-light">HomePage</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/AdminAbout" className="nav-link text-light">About</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/AdminRules" className="nav-link text-light">Rules</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/AdminChangeLog" className="nav-link text-light">Changelog</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/Logout" className="nav-link timer text-light">Logout ( <LogoutTimer /> )</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
    </>
)

export default NavbarAdmin