import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Navbar() {
    const location = useLocation();
    return (
        <nav>
            <div className="logo">
                <img src="/logo.webp" alt="logo" className="logo-image"/>
            </div>
            <div className="menu">
                <ul>
                    <li>
                        <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""} end>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/cruise-ships" className={({ isActive }) => isActive || location.pathname.startsWith("/cruises/") ? "active" : ""}>Cruise Ships</NavLink>
                    </li>
                    <li>
                        <NavLink to="/travel-packages" className={({ isActive }) => isActive || location.pathname.startsWith("/travel-packages/") ? "active" : ""}>Travel Packages</NavLink>
                    </li>
                    <li>
                        <NavLink to="/transport-fleets" className={({ isActive }) => isActive ? "active" : ""}>Transport Fleets</NavLink>
                    </li>
                    <li>
                        <NavLink to="/mice" className={({ isActive }) => isActive ? "active" : ""}>M.I.C.E</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""}>About Us</NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact" className={({ isActive }) => isActive ? "active" : ""}>Contact</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;