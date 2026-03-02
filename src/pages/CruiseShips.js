import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getCruiseShips } from "../firebase";
import Spinner from "../components/Spinner";

function CruiseShips() {
    const navigate = useNavigate();
    const [cruises, setCruises] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeCruiseIndex, setActiveCruiseIndex] = useState(0);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        setError(null);
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
                    setError("Could not load cruise ships. Please try again.");
                    setCruises([]);
                }
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
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

    if (loading) {
        return (
            <div className="cruises-container">
                <Spinner className="loading-spinner-block" label="Loading cruise ships…" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="cruises-container">
                <p className="travel-packages-error">{error}</p>
            </div>
        );
    }

    if (n === 0) {
        return (
            <div className="cruises-container">
                <h1>Discover Our Cruises</h1>
                <p className="travel-packages-empty">No cruise ships added yet.</p>
            </div>
        );
    }

    return (
        <div>
            <div className="cruises-container">
                <h1>Discover Our Cruises</h1>
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
                                        onClick={() => setActiveCruiseIndex(originalIndex >= 0 ? originalIndex : 0)}
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
            </div>
        </div>
    );
}

export default CruiseShips;
