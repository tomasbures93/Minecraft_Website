import { BookOpen, ChartBar, House, Info, ListBullets } from "phosphor-react"
import { NavLink } from "react-router"


const Navbar = () => (
    <div className="m-0 mb-3 card-default article-card navigbar">
        <nav className="navbar navbar-expand-md m-2">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <i className="bi bi-list text-white"></i>
            </button>
            <NavLink to="/" className="navbar-brand text-light">Home</NavLink>
            <div className="collapse navbar-collapse text-light" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto"> 
                    <li className="nav-item">
                        <NavLink to="/" className="nav-link text-light"><House size={20}/> Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/About" className="nav-link text-light"><BookOpen size={20}/> About</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/Rules" className="nav-link text-light"><Info size={20} /> Rules</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/Changelog" className="nav-link text-light"><ListBullets size={20} /> Changelog</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/Statistics" className="nav-link text-light"><ChartBar size={20} /> Statistics</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
)

export default Navbar