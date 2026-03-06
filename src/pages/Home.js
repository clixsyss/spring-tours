import { useRef, useState, useEffect } from "react";
import { FaClock, FaArrowLeft, FaArrowRight, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getCruiseShips, getTestimonials } from "../firebase";
import Spinner from "../components/Spinner";

import logo from "../assets/logo.webp";
import verynile from "../assets/home/verynile.png";

/** Category values must match PACKAGE_CATEGORIES in firebase.js for Travel Packages filter. */
const PLAN_CARDS = [
    { id: "plan1", title: "Egypt Express", imageClass: "plan-card-1", category: "Classic Egypt Tours" },
    { id: "plan2", title: "Coptic / Islamic Culture", imageClass: "plan-card-2", category: "Coptic/Islamic Culture" },
    { id: "plan3", title: "City Breaks", imageClass: "plan-card-3", category: "City Breaks" },
    { id: "plan4", title: "Red Sea Beach Break", imageClass: "plan-card-4", category: "Red sea Beach Breaks" },
    { id: "plan5", title: "Nile Cruises", imageClass: "plan-card-5", category: "Nile Cruises" },
    { id: "plan6", title: "Egypt Express", imageClass: "plan-card-1", category: "Classic Egypt Tours" },
    { id: "plan7", title: "Coptic / Islamic Culture", imageClass: "plan-card-2", category: "Coptic/Islamic Culture" },
    { id: "plan8", title: "City Breaks", imageClass: "plan-card-3", category: "City Breaks" },
    { id: "plan9", title: "Red Sea Beach Break", imageClass: "plan-card-4", category: "Red sea Beach Breaks" },
    { id: "plan10", title: "Nile Cruises", imageClass: "plan-card-5", category: "Nile Cruises" },
];

function Home() {
    const navigate = useNavigate();
    const [cruises, setCruises] = useState([]);
    const [cruisesLoading, setCruisesLoading] = useState(true);
    const [cruisesError, setCruisesError] = useState(null);
    const [activeCruiseIndex, setActiveCruiseIndex] = useState(0);
    const [testimonials, setTestimonials] = useState([]);
    const [testimonialsLoading, setTestimonialsLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        setCruisesLoading(true);
        setCruisesError(null);
        getCruiseShips()
            .then((data) => {
                if (!cancelled) {
                    setCruises(Array.isArray(data) ? data : []);
                    setActiveCruiseIndex(0);
                }
            })
            .catch((err) => {
                if (!cancelled) {
                    console.error("Cruise ships fetch failed:", err);
                    setCruisesError("Could not load cruise ships.");
                    setCruises([]);
                }
            })
            .finally(() => {
                if (!cancelled) setCruisesLoading(false);
            });
        return () => { cancelled = true; };
    }, []);

    useEffect(() => {
        let cancelled = false;
        setTestimonialsLoading(true);
        getTestimonials()
            .then((data) => {
                if (!cancelled) setTestimonials(Array.isArray(data) ? data : []);
            })
            .catch((err) => {
                if (!cancelled) console.error("Testimonials fetch failed:", err);
            })
            .finally(() => {
                if (!cancelled) setTestimonialsLoading(false);
            });
        return () => { cancelled = true; };
    }, []);

    const n = cruises.length;
    const currentCruise = n ? cruises[activeCruiseIndex] : null;
    const orderedCruises = n
        ? [...cruises.slice(activeCruiseIndex), ...cruises.slice(0, activeCruiseIndex)]
        : [];

    const goToCruise = (cruise) => {
        navigate(`/cruises/${cruise.slug}`);
    };

    const changeCruise = (direction) => {
        setActiveCruiseIndex((prev) => {
            const lastIndex = cruises.length - 1;
            if (direction === "left") return prev === 0 ? lastIndex : prev - 1;
            return prev === lastIndex ? 0 : prev + 1;
        });
    };

    const planCarouselRef = useRef(null);
    const [planActiveIndex, setPlanActiveIndex] = useState(0);

    const scrollPlanCarousel = (direction) => {
        const el = planCarouselRef.current;
        if (el) {
            const cardWidth = el.querySelector(".plan-carousel-item")?.offsetWidth ?? 320;
            const gap = 24;
            const scrollAmount = (cardWidth + gap) * (direction === "left" ? -1 : 1);
            el.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
        setPlanActiveIndex((prev) => {
            const last = PLAN_CARDS.length - 1;
            if (direction === "left") {
                return prev === 0 ? last : prev - 1;
            }
            return prev === last ? 0 : prev + 1;
        });
    };

    return (
        <div className="home">
            <div className="hero">
                <h1>Experience Makes The Difference</h1>
                <h2>- Since 1975 -</h2>
            </div>

            <div className="gap"></div>

            <div className="cruises-container">
                <h1>Discover Our Cruises</h1>
                {cruisesLoading && <div className="loading-spinner-block"><Spinner label="Loading cruise ships…" /></div>}
                {cruisesError && <p className="travel-packages-error">{cruisesError}</p>}
                {!cruisesLoading && !cruisesError && n > 0 && (
                    <div className="cruises-layout">
                        <div className="cruises-copy">
                            <h2>{currentCruise.title}</h2>
                            <p>{currentCruise.description}</p>
                            <button
                                type="button"
                                className="btn cruises-cta"
                                onClick={() => goToCruise(currentCruise)}
                            >
                                Explore Now
                            </button>
                        </div>
                        <div className="cruises-carousel-wrapper">
                            <button
                                type="button"
                                className="cruises-arrow cruises-arrow-left"
                                onClick={() => changeCruise("left")}
                                aria-label="Previous cruise"
                            >
                                <FaArrowLeft size={20} />
                            </button>
                            <button
                                type="button"
                                className="cruises-arrow cruises-arrow-right"
                                onClick={() => changeCruise("right")}
                                aria-label="Next cruise"
                            >
                                <FaArrowRight size={20} />
                            </button>
                            <div className="cruises-cards">
                                {orderedCruises.map((cruise) => {
                                    const isActive = cruise.id === currentCruise.id;
                                    const originalIndex = cruises.findIndex((c) => c.id === cruise.id);
                                    const cardStyle = cruise.imageURL
                                        ? { backgroundImage: `url(${cruise.imageURL})` }
                                        : undefined;
                                    return (
                                        <button
                                            key={cruise.id}
                                            type="button"
                                            className={`cruise-card ${isActive ? "is-active" : ""}`}
                                            style={cardStyle}
                                            onClick={() =>
                                                setActiveCruiseIndex(originalIndex >= 0 ? originalIndex : 0)
                                            }
                                            aria-label={cruise.title}
                                        />
                                    );
                                })}
                            </div>
                            <div className="cruises-dots">
                                {cruises.map((cruise, index) => (
                                    <button
                                        key={`${cruise.id}-dot`}
                                        type="button"
                                        className={`cruise-dot ${index === activeCruiseIndex ? "is-active" : ""}`}
                                        onClick={() => setActiveCruiseIndex(index)}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                {!cruisesLoading && !cruisesError && n === 0 && (
                    <p className="travel-packages-empty">No cruise ships to show yet.</p>
                )}
            </div>

            <div className="content-container">
                <div className="destinations-container">
                    <h1>Top Destinations</h1>
                    <div className="destinations-list">
                        <div className="destination-item">
                            <div className="destination-item-content">
                                <h4>Nile Meets the Mediterranean Sea</h4>
                                <div className="destination-item-description">
                                    <p> <span><FaClock size={16} /></span> 3 Days 2 Nights</p>
                                    {/* link to /travel-packages/details/032fd4xZS7XsshJ5BdRE */}
                                    <button className="btn" onClick={() => navigate(`/travel-packages/details/032fd4xZS7XsshJ5BdRE`)}>Explore More</button>
                                </div>
                            </div>
                        </div>
                        <div className="destination-item">
                            <div className="destination-item-content">
                                <h4>4-night Cruise Luxor - Aswan</h4>
                                <div className="destination-item-description">
                                    <p> <span><FaClock size={16} /></span> 5 Days 4 Nights</p>
                                    <button className="btn" onClick={() => navigate(`/travel-packages/details/RmzC0kbK1tsblw3Ww4wu`)}>Explore More</button>
                                </div>
                            </div>
                        </div>
                        <div className="destination-item">
                            <div className="destination-item-content">
                                <h4>A little Bit Off The Beaten Track</h4>
                                <div className="destination-item-description">
                                    <p> <span><FaClock size={16} /></span> 10 Days 9 Nights</p>
                                    <button className="btn" onClick={() => navigate(`/travel-packages/details/Zp3G1HRax6t616dCGjiD`)}>Explore More</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="right-side-button"> <button className="btn" onClick={() => navigate(`/travel-packages`)}>Explore All Destinations</button> </div>
                </div>

                <div className="plan-container">
                    <h1>Plan Your Holidays</h1>
                    <div className="plan-carousel-wrapper">
                        <button
                            type="button"
                            className="plan-carousel-arrow plan-carousel-arrow-left"
                            onClick={() => scrollPlanCarousel("left")}
                            aria-label="Previous"
                        >
                            <FaArrowLeft size={20} />
                        </button>
                        <button
                            type="button"
                            className="plan-carousel-arrow plan-carousel-arrow-right"
                            onClick={() => scrollPlanCarousel("right")}
                            aria-label="Next"
                        >
                            <FaArrowRight size={20} />
                        </button>
                        <div className="plan-carousel-track" ref={planCarouselRef}>
                            {PLAN_CARDS.map((card, index) => (
                                <div
                                    key={card.id}
                                    role="button"
                                    tabIndex={0}
                                    className={`plan-carousel-item ${card.imageClass} ${index === planActiveIndex ? "is-active" : ""}`}
                                    onClick={() => navigate(`/travel-packages?category=${encodeURIComponent(card.category)}`)}
                                    onKeyDown={(e) => e.key === "Enter" && navigate(`/travel-packages?category=${encodeURIComponent(card.category)}`)}
                                    aria-label={`View ${card.title} packages`}
                                >
                                    <div className="plan-carousel-item-overlay">
                                        <h4>{card.title}</h4>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="collaboration-container">
                <h1>Our Collaboration</h1>

                <div className="collaboration-content">
                    <div className="collaboration-list">
                        <img src={verynile} alt="collaboration02" />
                        <img src={logo} alt="collaboration01" className="collaboration-image" />
                    </div>

                    <div>
                        <h2>Cleaning the Nile, one kilo at a time!</h2>
                        <p>VeryNile is the first initiative to develop sustainable means to clean the Nile while raising awareness on the importance of protecting our environment. VeryNile interlaces social and environmental impact and develops eco-friendly solutions to remove inorganic waste from the river.
                            As the Greek historian Herodotus said “Egypt is the gift of the Nile”… Therefore, Spring Tours management decided to partner with VeryNile to support their great cause, especially that we use the Nile in our tours…</p>
                    </div>
                </div>
            </div>

            <div className="content-container">
                <div className="testimonials-container">
                    <h1>Hear From Our <br />Happy Travelers</h1>

                    <div className="testimonials-list">
                        {!testimonialsLoading && testimonials.length === 0 && (
                            <p className="testimonials-empty">No testimonials yet.</p>
                        )}
                        {testimonials.slice(0, 3).map((t) => {
                            const rating = typeof t.rating === "number" ? Math.min(5, Math.max(1, t.rating)) : 5;
                            return (
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
                                                {Array.from({ length: rating }, (_, i) => <FaStar key={i} size={16} />)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="testimonial-item-content">
                                        {t.subtitle && <h4>{t.subtitle}</h4>}
                                        <p>{t.content}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="right-side-button"> <button className="btn" onClick={() => navigate(`/testimonials`)}>Dicover More</button> </div>
                </div>
            </div>
        </div>
    );
}

export default Home;