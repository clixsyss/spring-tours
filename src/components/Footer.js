import logo from "../assets/logo.webp";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaEnvelope, FaPhone, FaFax, FaMapMarkerAlt } from "react-icons/fa";
function Footer() {
    return (
        <>
            <footer className="footer">
                <div className="footer-top">
                    <img src={logo} alt="Spring Tours Logo" className="footer-logo" />
                    <div className="social-media">
                        <a href="https://www.facebook.com/share/1CZNwnsURv/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">
                            <FaFacebookF size={30} />
                        </a>
                        <a href="https://www.instagram.com/springtoursegypt?igsh=MWdoYjRnOHVwaXh1YQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer">
                            <FaInstagram size={30} />
                        </a>
                        <a href="https://wa.me/201000000000" target="_blank" rel="noopener noreferrer">
                            <FaWhatsapp size={30} />
                        </a>
                        <a href="mailto:info@springtours.eg" target="_blank" rel="noopener noreferrer">
                            <FaEnvelope size={30} />
                        </a>
                    </div>
                    <p>Spring Tours is one of the leading receptive Destination Management Companies in Egypt. Established in 1975, the company is among the local pioneers of the travel and tourism industry, and has consistently been rated among the top travel companies in the country, receiving both local and international accolades and recognition</p>
                </div>
                <div className="footer-content">
                    <div>
                        <h3>Contact Us</h3>
                        <ul>
                            <li>
                                <FaMapMarkerAlt />
                                <span>3, El Sayed El Bakry Street 11211 Zamalek, Cairo, Egypt</span>
                            </li>
                            <li>
                                <FaPhone />
                                <span>+202 27365973</span>
                            </li>
                            <li>
                                <FaFax />
                                <span>+202 27365967</span>
                            </li>
                            <li>
                                <FaEnvelope />
                                <span>General Inquiries: <a href="mailto:info@springtours.com" className="emailLink">info@springtours.com</a></span>
                            </li>
                            <li>
                                <FaEnvelope />
                                <span>Retailers: <a href="mailto:bizdevelopment@springtours.com" className="emailLink">bizdevelopment@springtours.com</a></span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3>Customer Help</h3>
                        <ul>
                            <li>
                                <Link to='/'>Guest Support</Link>
                            </li>
                            <li>
                                <Link to='/'>Guest Feedback</Link>
                            </li>
                            <li>
                                <Link to='/'>FAQs</Link>
                            </li>
                            <li>
                                <Link to='/'>Offers</Link>
                            </li>
                            <li>
                                <Link to='/'>Locations</Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3>Quick Links</h3>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/">Cruise Ships</Link>
                            </li>
                            <li>
                                <Link to="/">Travel Packages</Link>
                            </li>
                            <li>
                                <Link to="/">Contact</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>
            <div className="footer-bottom">
                <p>Copyright © {new Date().getFullYear()} Spring Tours. All rights reserved.</p>
            </div>
        </>
    );
}

export default Footer;