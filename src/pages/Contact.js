import { useState } from "react";
import { FaMapMarkerAlt, FaPhone, FaFax, FaEnvelope } from "react-icons/fa";
import { submitContactForm } from "../api/contact";

function Contact() {
    const [mapLoading, setMapLoading] = useState(true);
    const [contactForm, setContactForm] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const [contactSubmitting, setContactSubmitting] = useState(false);
    const [contactStatus, setContactStatus] = useState(null);
    const [contactStatusMessage, setContactStatusMessage] = useState("");

    const handleContactChange = (e) => {
        const { name, value } = e.target;
        setContactForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        if (contactSubmitting) return;
        setContactSubmitting(true);
        setContactStatus(null);
        try {
            await submitContactForm({
                ...contactForm,
                source: "contact-page",
            });
            setContactStatus("success");
            setContactStatusMessage("Thank you, your message has been sent.");
            setContactForm({ name: "", email: "", phone: "", message: "" });
        } catch (err) {
            console.error("Contact form error:", err);
            setContactStatus("error");
            setContactStatusMessage("Sorry, we couldn't send your message. Please try again.");
        } finally {
            setContactSubmitting(false);
        }
    };

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
                            <form onSubmit={handleContactSubmit}>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={contactForm.name}
                                    onChange={handleContactChange}
                                    required
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={contactForm.email}
                                    onChange={handleContactChange}
                                    required
                                />
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone"
                                    value={contactForm.phone}
                                    onChange={handleContactChange}
                                />
                                <textarea
                                    name="message"
                                    placeholder="Message"
                                    value={contactForm.message}
                                    onChange={handleContactChange}
                                    required
                                />
                                <button type="submit" disabled={contactSubmitting}>
                                    {contactSubmitting ? "Sending..." : "Submit"}
                                </button>
                            </form>
                            {contactStatus === "success" && (
                                <p className="help-form-status help-form-status-success">
                                    {contactStatusMessage}
                                </p>
                            )}
                            {contactStatus === "error" && (
                                <p className="help-form-status help-form-status-error">
                                    {contactStatusMessage}
                                </p>
                            )}
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