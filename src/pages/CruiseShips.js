import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { getCruiseShips, listFolderImageUrls } from "../firebase";
import Spinner from "../components/Spinner";

// Map cruise titles to their Firebase Storage gallery folders (must match Storage folder names exactly)
const CRUISE_GALLERY_FOLDERS = {
    "Dahabiyaa Judi": "cruises/Dahabiyaa Judi",
    "Dahabiya Judi": "cruises/Dahabiyaa Judi",
    "MS LaTraviata": "cruises/MS LaTraviata",
    "MS Medea": "cruises/MS Medea",
    "M/S Medea": "cruises/MS Medea",
    "MS Miriam": "cruises/MS Miriam",
    "MS Tosca": "cruises/MS Tosca",
    "SS Karim": "cruises/SS Karim",
    "S/S Sphinx": "cruises/SS Sphinx",
};

// Fallback: map URL slug to gallery folder (in case Firestore title doesn't match)
const CRUISE_GALLERY_BY_SLUG = {
    "s-s-sphinx": "cruises/SS Sphinx",
    "ss-sphinx": "cruises/SS Sphinx",
    "ms-medea": "cruises/MS Medea",
    "m-s-medea": "cruises/MS Medea",
    "medea": "cruises/MS Medea",
    "dahabiyaa-judi": "cruises/Dahabiyaa Judi",
    "dahabiya-judi": "cruises/Dahabiyaa Judi",
    "ms-miriam": "cruises/MS Miriam",
    "ms-tosca": "cruises/MS Tosca",
    "ms-latraviata": "cruises/MS LaTraviata",
    "ss-karim": "cruises/SS Karim",
};

function CruiseShips() {
    const navigate = useNavigate();
    const [cruises, setCruises] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeCruiseIndex, setActiveCruiseIndex] = useState(0);
    const [bgImages, setBgImages] = useState([]);
    const [bgIndex, setBgIndex] = useState(0);
    const [bgCache, setBgCache] = useState({});

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

    // Load background gallery images for the active cruise (updates when cruise changes)
    useEffect(() => {
        const cruiseId = currentCruise?.id;
        const title = currentCruise?.title || "";
        const slug = (currentCruise?.slug || "").toLowerCase().trim();
        const galleryFolder = currentCruise?.galleryFolder;
        const galleryImageURLs = currentCruise?.galleryImageURLs;
        const heroImageURL = currentCruise?.heroImageURL;
        const imageURL = currentCruise?.imageURL;

        if (!cruiseId) {
            setBgImages([]);
            setBgIndex(0);
            return;
        }

        const uploaded =
            Array.isArray(galleryImageURLs) && galleryImageURLs.length > 0
                ? galleryImageURLs
                : null;
        const fallback = heroImageURL || imageURL || null;
        const normalizedTitle =
            title
                .replace("M/S", "MS")
                .replace(/\s+/g, " ")
                .trim();

        const resolvedFolder =
            galleryFolder ||
            CRUISE_GALLERY_FOLDERS[title] ||
            CRUISE_GALLERY_FOLDERS[normalizedTitle] ||
            CRUISE_GALLERY_BY_SLUG[slug] ||
            null;

        // Always show at least the fallback image for this cruise immediately when switching
        const immediateImages = fallback ? [fallback] : [];
        setBgImages(immediateImages);
        setBgIndex(0);

        if (uploaded) {
            setBgImages(uploaded);
            setBgCache((prev) => ({ ...prev, [cruiseId]: uploaded }));
            return;
        }

        const cached = bgCache[cruiseId];
        if (Array.isArray(cached) && cached.length > 0) {
            setBgImages(cached);
            setBgIndex(0);
            return;
        }

        if (!resolvedFolder) {
            setBgCache((prev) => ({ ...prev, [cruiseId]: immediateImages }));
            return;
        }

        let cancelled = false;

        listFolderImageUrls(resolvedFolder)
            .then((urls) => {
                if (cancelled) return;
                const finalUrls =
                    Array.isArray(urls) && urls.length > 0
                        ? urls
                        : fallback
                            ? [fallback]
                            : [];
                setBgImages(finalUrls);
                setBgIndex(0);
                setBgCache((prev) => ({ ...prev, [cruiseId]: finalUrls }));
            })
            .catch(() => {
                if (cancelled) return;
                setBgCache((prev) => ({ ...prev, [cruiseId]: immediateImages }));
            });

        return () => {
            cancelled = true;
        };
    }, [
        currentCruise?.id,
        currentCruise?.slug,
        currentCruise?.title,
        currentCruise?.galleryFolder,
        currentCruise?.galleryImageURLs,
        currentCruise?.heroImageURL,
        currentCruise?.imageURL,
        bgCache,
    ]);

    // Rotate background image every 5 seconds
    useEffect(() => {
        if (!bgImages || bgImages.length <= 1) {
            setBgIndex(0);
            return;
        }

        setBgIndex(0);
        const id = setInterval(() => {
            setBgIndex((prev) => (prev + 1) % bgImages.length);
        }, 5000);

        return () => clearInterval(id);
    }, [bgImages]);

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
            <div className="cruises-container cruises-ships-layout">
                <div className="cruises-hero-bg">
                    <AnimatePresence mode="wait">
                        {bgImages.length > 0 && (
                            <motion.div
                                key={bgImages[bgIndex] || "cruise-hero-fallback"}
                                className="cruises-hero-bg-layer"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                                style={{ backgroundImage: `url(${bgImages[bgIndex]})` }}
                            />
                        )}
                    </AnimatePresence>
                </div>
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
