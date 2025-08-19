import { Copyright, DiscordLogo, Envelope, IdentificationBadge, ShieldCheck } from "phosphor-react"
import { NavLink } from "react-router-dom"

const Footer = ({data}) => {
  const email = "mailto:" + data.email;

  return (
    <footer className="py-4 mb-3 card-default serverinfo-card">
    <div className="container">
      <div className="row text-center text-md-start">
        <div className="col-md-6 mb-3">
          <div className="mb-2">
            <a href={data.discord}
              target="_blank"
              className="navlink text-light text-decoration-none">
              <DiscordLogo size={20} className="me-2" />Discord
            </a>
          </div>
          <div className="mb-2">
            <a href={email}
              className="navlink text-light text-decoration-none">
              <Envelope size={20} className="me-2" />Contact</a>
          </div>
          <div>Minecraft <strong>{data.gameVersion}</strong></div>
        </div>
        <div className="col-md-6 mb-3 text-md-end">
          <div className="mb-2">
            <NavLink to="/impressum" className="navlink text-light text-decoration-none">
              <IdentificationBadge size={20} className="me-2" />
              Impressum
            </NavLink>
          </div>
          <div className="mb-2">
            <NavLink to="/datenschutz" className="navlink text-light text-decoration-none">
              <ShieldCheck size={20} className="me-2" />
              Datenschutzerklärung
            </NavLink>
          </div>
          <div className="mt-2">
            <Copyright size={20} className="me-2" />
            2025 <NavLink to="/AdminPage" className="navlink">{data.serverName}</NavLink>
          </div>
        </div>
      </div>
    </div>
    </footer>
)
}

export default Footer