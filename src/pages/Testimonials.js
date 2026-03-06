import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { getTestimonials } from "../firebase";
import Spinner from "../components/Spinner";

function Testimonials() {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        getTestimonials()
            .then((data) => {
                if (!cancelled) setTestimonials(Array.isArray(data) ? data : []);
            })
            .catch((err) => {
                if (!cancelled) console.error("Testimonials fetch failed:", err);
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => { cancelled = true; };
    }, []);

    const ratingFor = (t) => typeof t.rating === "number" ? Math.min(5, Math.max(1, t.rating)) : 5;

    return (
        <div>
            <div className="content-container">
                <div className="testimonials-banner">
                    <h1>Testimonials</h1>
                </div>

                {loading ? (
                    <div className="loading-spinner-block"><Spinner label="Loading testimonials…" /></div>
                ) : testimonials.length === 0 ? (
                    <p className="testimonials-empty">No testimonials yet.</p>
                ) : (
                    <div className="testimonials-list">
                        {testimonials.map((t) => (
                            <div key={t.id} className="testimonial-item">
                                <div className="testimonial-item-header">
                                    {t.avatarURL ? (
                                        <img src={t.avatarURL} alt="" />
                                    ) : (
                                        <div className="testimonial-item-avatar-placeholder" aria-hidden />
                                    )}
                                    <div className="testimonial-item-header-content">
                                        <h4>{t.authorName}</h4>
                                        <div className="testimonial-item-rating">
                                            {Array.from({ length: ratingFor(t) }, (_, i) => <FaStar key={i} size={16} />)}
                                        </div>
                                    </div>
                                </div>
                                <div className="testimonial-item-content">
                                    {t.subtitle && <h4>{t.subtitle}</h4>}
                                    <p>{t.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Testimonials;