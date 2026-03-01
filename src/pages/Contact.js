import { useState } from "react";
import { FaMapMarkerAlt, FaPhone, FaFax, FaEnvelope } from "react-icons/fa";

function Contact() {
    const [mapLoading, setMapLoading] = useState(true);

    return (
        <div>
            <div className="content-container">
                <div className="contact-banner">
                    <h1>Contact Us</h1>
                </div>

                <div className="contact-content">
                    <div>
                        <h2>Get in Touch With Us</h2>
                        <p>We have offices around Egypt to cater all of our customers' needs</p>
                        <div className="contact-office">
                            <div>
                                <h3>Cairo Main Office</h3>
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
                                        <FaPhone />
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
                        </div>
                    </div>

                    <div>
                        <div className="help-form">
                            <h2>Contact Us</h2>
                            <form>
                                <input type="text" placeholder="Name" />
                                <input type="email" placeholder="Email" />
                                <input type="tel" placeholder="Phone" />
                                <textarea placeholder="Message" />
                                <button type="submit">Submit</button>
                            </form>
                            <p>We'll get back to you as soon as possible.</p>
                        </div>
                    </div>
                </div>

                <div className="contact-locations-grid">
                    <div className="contact-location-card">
                        <h3>Sharm El Sheikh</h3>
                        <ul>
                            <li><FaMapMarkerAlt /><span>El Hadaba Hill, Sharm El Sheikh</span></li>
                            <li><FaPhone /><span>069 - 366 44 27</span></li>
                            <li><FaFax /><span>069 - 366 44 25</span></li>
                            <li><FaEnvelope /><span><a href="mailto:ssh@springtours.com" className="emailLink">ssh@springtours.com</a></span></li>
                        </ul>
                    </div>
                    <div className="contact-location-card">
                        <h3>Hurghada</h3>
                        <ul>
                            <li><FaMapMarkerAlt /><span>Village Road, Hurghada</span></li>
                            <li><FaPhone /><span>065 - 344 08 03 / 065 - 344 08 09</span></li>
                            <li><FaFax /><span>065 - 346 20 30</span></li>
                            <li><FaEnvelope /><span><a href="mailto:hrg@springtours.com" className="emailLink">hrg@springtours.com</a></span></li>
                        </ul>
                    </div>
                    <div className="contact-location-card">
                        <h3>Aswan</h3>
                        <ul>
                            <li><FaMapMarkerAlt /><span>85, Corniche El Nil, Aswan</span></li>
                            <li><FaPhone /><span>097-2450535 / 097-2450537</span></li>
                            <li><FaFax /><span>097-2450535</span></li>
                            <li><FaEnvelope /><span><a href="mailto:asw@springtours.com" className="emailLink">asw@springtours.com</a></span></li>
                        </ul>
                    </div>
                    <div className="contact-location-card">
                        <h3>Luxor</h3>
                        <ul>
                            <li><FaMapMarkerAlt /><span>33, Khaled Ibn El Walid Street, Luxor</span></li>
                            <li><FaPhone /><span>095 - 237 86 54</span></li>
                            <li><FaFax /><span>095 - 237 35 48</span></li>
                            <li><FaEnvelope /><span><a href="mailto:lxr@springtours.com" className="emailLink">lxr@springtours.com</a></span></li>
                        </ul>
                    </div>
                    <div className="contact-location-card">
                        <h3>Marsa Alam</h3>
                        <ul>
                            <li><FaMapMarkerAlt /><span>Building No. T14B-1-4, Tower Village, Port Ghalib, Marsa Alam</span></li>
                            <li><FaPhone /><span>065 - 333 89 06</span></li>
                            <li><FaEnvelope /><span><a href="mailto:rmf@springtours.com" className="emailLink">rmf@springtours.com</a></span></li>
                        </ul>
                    </div>
                </div>

                <div className="contact-map-wrap">
                    {mapLoading && (
                        <div className="contact-map-spinner" aria-hidden="true">
                            <div className="contact-map-spinner-wheel" />
                        </div>
                    )}
                    <iframe
                        title="Spring Tours Cairo office location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.185682909981!2d31.223336300000003!3d30.060211600000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145840e6d9c4985b%3A0xb69e0ca0843fd0d8!2s3%20Sayed%20El-Bakry%2C%20Mohammed%20Mazhar%2C%20Zamalek%2C%20Cairo%20Governorate%204271050!5e0!3m2!1sen!2seg!4v1772408488149!5m2!1sen!2seg"
                        width="600"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        onLoad={() => setMapLoading(false)}
                    />
                </div>
            </div>
        </div>
    )
}

export default Contact;