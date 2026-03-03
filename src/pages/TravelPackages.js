import { useState, useEffect, Fragment } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { getTravelPackages, PACKAGE_CATEGORIES } from "../firebase";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
function TravelPackages() {
    const [packages, setPackages] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All Tours");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate();
    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        setError(null);
        getTravelPackages(selectedCategory)
            .then((data) => {
                if (!cancelled) {
                    setPackages(Array.isArray(data) ? data : []);
                    setActiveIndex(0);
                }
            })
            .catch((err) => {
                if (!cancelled) {
                    console.error("Travel packages fetch failed:", err);
                    setError("Could not load packages. Please try again.");
                    setPackages([]);
                }
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => { cancelled = true; };
    }, [selectedCategory]);

    const n = packages.length;
    const prevIndex = n ? (activeIndex - 1 + n) % n : 0;
    const nextIndex = n ? (activeIndex + 1) % n : 0;
    const [slideDirection, setSlideDirection] = useState(1);
    const goPrev = () => {
        if (n) {
            setSlideDirection(-1);
            setActiveIndex((i) => (i - 1 + n) % n);
        }
    };
    const goNext = () => {
        if (n) {
            setSlideDirection(1);
            setActiveIndex((i) => (i + 1) % n);
        }
    };

    const activePackage = packages[activeIndex];
    const imgSrc = (pkg) => pkg?.imageURL || pkg?.image;

    return (
        <div>
            <div className="content-container">
                <div className="travel-packages-banner">
                    <h1>Travel Packages</h1>
                </div>

                <div className="travel-packages-nav">
                    <ul>
                        {PACKAGE_CATEGORIES.map((cat, i) => (
                            <Fragment key={cat}>
                                {i > 0 && <hr />}
                                <li>
                                    <button
                                        type="button"
                                        className={selectedCategory === cat ? "active" : ""}
                                        onClick={() => setSelectedCategory(cat)}
                                    >
                                        {cat}
                                    </button>
                                </li>
                            </Fragment>
                        ))}
                    </ul>
                </div>

                <div className="travel-packages-nav-mobile">
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="travel-packages-select"
                    >
                        {PACKAGE_CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>

                {loading && <Spinner className="loading-spinner-block" label="Loading packages…" />}

                {error && <p className="travel-packages-error">{error}</p>}

                {!loading && !error && n > 0 && (
                    <div className="travel-packages-carousel">
                        <button
                            type="button"
                            className="travel-packages-arrow travel-packages-arrow-left"
                            onClick={goPrev}
                            aria-label="Previous package"
                        >
                            <FaArrowLeft size={20} />
                        </button>
                        <button
                            type="button"
                            className="travel-packages-arrow travel-packages-arrow-right"
                            onClick={goNext}
                            aria-label="Next package"
                        >
                            <FaArrowRight size={20} />
                        </button>

                        <div className="travel-packages-track">
                            <div className="travel-package-card travel-package-card-left">
                                <img src={imgSrc(packages[prevIndex])} alt="" />
                            </div>

                            <AnimatePresence mode="sync" custom={slideDirection} initial={false}>
                                <motion.div
                                    key={activePackage.id}
                                    className="travel-package-card travel-package-card-center"
                                    custom={slideDirection}
                                    initial={(dir) => ({
                                        x: dir === 1 ? 24 : -24,
                                        opacity: 0.82,
                                        scale: 0.98,
                                    })}
                                    animate={{
                                        x: 0,
                                        opacity: 1,
                                        scale: [0.98, 1.01, 1],
                                    }}
                                    exit={(dir) => ({
                                        x: dir === 1 ? -24 : 24,
                                        opacity: 0.82,
                                        scale: 0.98,
                                    })}
                                    transition={{
                                        duration: 0.48,
                                        ease: [0.25, 0.46, 0.45, 0.94],
                                        times: [0, 0.55, 1],
                                    }}
                                    style={{ willChange: "transform, opacity" }}
                                >
                                    <div className="travel-package-card-body">
                                        <img src={imgSrc(activePackage)} alt={activePackage.title} />
                                        <div className="travel-package-card-body-content">
                                            <h2>{activePackage.title}</h2>
                                            <p>{activePackage.description}</p>
                                            <div className="travel-package-code">Code: {activePackage.code}</div>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        className="btn travel-package-explore"
                                        onClick={() => navigate(`/travel-packages/details/${activePackage.id}`)}
                                    >
                                        Explore Now
                                    </button>
                                </motion.div>
                            </AnimatePresence>

                            <div className="travel-package-card travel-package-card-right">
                                <img src={imgSrc(packages[nextIndex])} alt="" />
                            </div>
                        </div>
                    </div>
                )}

                {!loading && !error && n === 0 && (
                    <p className="travel-packages-empty">No packages in this category yet.</p>
                )}
            </div>
        </div>
    );
}

export default TravelPackages;
