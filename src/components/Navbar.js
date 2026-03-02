import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  const navLinkClass = (isActiveExtra) => ({ isActive }) =>
    (isActive || isActiveExtra ? "active" : "");

  return (
    <nav>
      <div className="logo">
        <img src="/logo.webp" alt="Spring Tours logo" className="logo-image" />
      </div>

      <button
        type="button"
        className="nav-toggle"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={isOpen}
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      <div className={`menu ${isOpen ? "menu-open" : ""}`}>
        <ul>
          <li>
            <NavLink
              to="/"
              end
              className={navLinkClass(false)}
              onClick={closeMenu}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cruise-ships"
              className={navLinkClass(
                location.pathname.startsWith("/cruises/")
              )}
              onClick={closeMenu}
            >
              Cruise Ships
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/travel-packages"
              className={navLinkClass(
                location.pathname.startsWith("/travel-packages/")
              )}
              onClick={closeMenu}
            >
              Travel Packages
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/transport-fleets"
              className={navLinkClass(false)}
              onClick={closeMenu}
            >
              Transport Fleets
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/mice"
              className={navLinkClass(false)}
              onClick={closeMenu}
            >
              M.I.C.E
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={navLinkClass(false)}
              onClick={closeMenu}
            >
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={navLinkClass(false)}
              onClick={closeMenu}
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </div>

      {isOpen && (
        <button
          type="button"
          className="nav-overlay"
          onClick={closeMenu}
          aria-label="Close navigation"
        />
      )}
    </nav>
  );
}

export default Navbar;