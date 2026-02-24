import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <div className="logo">
                <img src="/logo.png" alt="logo" />
            </div>
            <div className="menu">
                <ul>
                    <li>
                        <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""} end>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/cruise-ships" className={({ isActive }) => isActive ? "active" : ""}>Cruise Ships</NavLink>
                    </li>
                    <li>
                        <NavLink to="/travel-packages" className={({ isActive }) => isActive ? "active" : ""}>Travel Packages</NavLink>
                    </li>
                    <li>
                        <NavLink to="/transport-fleets" className={({ isActive }) => isActive ? "active" : ""}>Transport Fleets</NavLink>
                    </li>
                    <li>
                        <NavLink to="/mice" className={({ isActive }) => isActive ? "active" : ""}>M.I.C.E</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about-us" className={({ isActive }) => isActive ? "active" : ""}>About Us</NavLink>
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