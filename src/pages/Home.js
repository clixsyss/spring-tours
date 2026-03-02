import { useRef, useState, useEffect } from "react";
import { FaClock, FaArrowLeft, FaArrowRight, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getCruiseShips } from "../firebase";
import Spinner from "../components/Spinner";

import logo from "../assets/logo.webp";
import verynile from "../assets/home/verynile.png";
import testimonial01 from "../assets/home/test01.png";
import testimonial02 from "../assets/home/test02.png";
import testimonial03 from "../assets/home/test03.png";

const PLAN_CARDS = [
    { id: "plan1", title: "Egypt Express", imageClass: "plan-card-1" },
    { id: "plan2", title: "Coptic / Islamic Culture", imageClass: "plan-card-2" },
    { id: "plan3", title: "City Breaks", imageClass: "plan-card-3" },
    { id: "plan4", title: "Red Sea Beach Break", imageClass: "plan-card-4" },
    { id: "plan5", title: "Cultural Heritage", imageClass: "plan-card-5" },
    { id: "plan6", title: "Egypt Express", imageClass: "plan-card-1" },
    { id: "plan7", title: "Coptic / Islamic Culture", imageClass: "plan-card-2" },
    { id: "plan8", title: "City Breaks", imageClass: "plan-card-3" },
    { id: "plan9", title: "Red Sea Beach Break", imageClass: "plan-card-4" },
    { id: "plan10", title: "Cultural Heritage", imageClass: "plan-card-5" },
];

function Home() {
    const navigate = useNavigate();
    const [cruises, setCruises] = useState([]);
    const [cruisesLoading, setCruisesLoading] = useState(true);
    const [cruisesError, setCruisesError] = useState(null);
    const [activeCruiseIndex, setActiveCruiseIndex] = useState(0);

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

    const scrollPlanCarousel = (direction) => {
        const el = planCarouselRef.current;
        if (!el) return;
        const cardWidth = el.querySelector(".plan-carousel-item")?.offsetWidth ?? 320;
        const gap = 24;
        const scrollAmount = (cardWidth + gap) * (direction === "left" ? -1 : 1);
        el.scrollBy({ left: scrollAmount, behavior: "smooth" });
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
                                    <button className="btn">Explore More</button>
                                </div>
                            </div>
                        </div>
                        <div className="destination-item">
                            <div className="destination-item-content">
                                <h4>4-night Cruise Luxor - Aswan</h4>
                                <div className="destination-item-description">
                                    <p> <span><FaClock size={16} /></span> 5 Days 4 Nights</p>
                                    <button className="btn">Explore More</button>
                                </div>
                            </div>
                        </div>
                        <div className="destination-item">
                            <div className="destination-item-content">
                                <h4>A little Bit Off The Beaten Track</h4>
                                <div className="destination-item-description">
                                    <p> <span><FaClock size={16} /></span> 10 Days 9 Nights</p>
                                    <button className="btn">Explore More</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="right-side-button"> <button className="btn">Explore All Destinations</button> </div>
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
                            {PLAN_CARDS.map((card) => (
                                <div
                                    key={card.id}
                                    className={`plan-carousel-item ${card.imageClass}`}
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
                        <div className="testimonial-item">
                            <div className="testimonial-item-header">
                                <img src={testimonial01} alt="testimonial-item-avatar" />
                                <div className="testimonial-item-header-content">
                                    <h4>Karin Madlen</h4>
                                    {/* 5 rating stars */}
                                    <div className="testimonial-item-rating">
                                        <FaStar size={16} />
                                        <FaStar size={16} />
                                        <FaStar size={16} />
                                        <FaStar size={16} />
                                        <FaStar size={16} />
                                    </div>
                                </div>
                            </div>
                            <div className="testimonial-item-content">
                                <h4>Marsa Alam, Luxor</h4>
                                <p>Vielen Dank für die tollen Ausflüge und das sie uns sicher nach Marsa Alam gebracht habt. Es war ein sehr schöner Urlaub im September 2018.
                                    Vielen lieben Dank auch an Aladin der uns Luxor gezeigt hat. Wir kommen gern wieder.</p>
                            </div>
                        </div>
                        <div className="testimonial-item">
                            <div className="testimonial-item-header">
                                <img src={testimonial02} alt="testimonial-item-avatar" />
                                <div className="testimonial-item-header-content">
                                    <h4>E. Kerry</h4>
                                    {/* 5 rating stars */}
                                    <div className="testimonial-item-rating">
                                        <FaStar size={16} />
                                        <FaStar size={16} />
                                        <FaStar size={16} />
                                        <FaStar size={16} />
                                        <FaStar size={16} />
                                    </div>
                                </div>
                            </div>
                            <div className="testimonial-item-content">
                                <h4>Around Egypt</h4>
                                <p>Awesome tour company! I just got back from Egypt last week and I had the trip of a lifetime. I booked a private tour as I tend to take a lot of photos and like to wander around a lot by myself. The tour guides were very flexible and very patient book with Spring tours!</p>
                            </div>
                        </div>
                        <div className="testimonial-item">
                            <div className="testimonial-item-header">
                                <img src={testimonial03} alt="testimonial-item-avatar" />
                                <div className="testimonial-item-header-content">
                                    <h4>Susan Jarvis</h4>
                                    {/* 5 rating stars */}
                                    <div className="testimonial-item-rating">
                                        <FaStar size={16} />
                                        <FaStar size={16} />
                                        <FaStar size={16} />
                                        <FaStar size={16} />
                                        <FaStar size={16} />
                                    </div>
                                </div>
                            </div>
                            <div className="testimonial-item-content">
                                <h4>Around Egypt</h4>
                                <p>I just returned from the vacation of a lifetime. Spring Tours is very reputable and I am planning my next adventure for 2019. The guides are extremely knowledgeable and make sure you are safe and well looked after.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;