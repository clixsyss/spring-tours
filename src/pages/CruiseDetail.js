import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { getCruiseBySlug, listFolderImageUrls } from "../firebase";
import Spinner from "../components/Spinner";

const INITIAL_VISIBLE_GALLERY_COUNT = 7;

function CruiseDetail() {
    const { slug } = useParams();
    const [cruise, setCruise] = useState(null);
    const [images, setImages] = useState([]);
    const [galleryLoading, setGalleryLoading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [showAll, setShowAll] = useState(false);
    const [activeTab, setActiveTab] = useState("overview");
    const [activeItineraryTab, setActiveItineraryTab] = useState("");

    useEffect(() => {
        let cancelled = false;
        if (!slug) {
            setLoading(false);
            setError("Invalid cruise.");
            return () => { };
        }
        setLoading(true);
        setError(null);
        getCruiseBySlug(slug)
            .then((data) => {
                if (cancelled) return;
                setCruise(data);
                setImages([]);
                if (!data) {
                    setError("Cruise not found.");
                    setLoading(false);
                    return;
                }
                const firstOpt = Array.isArray(data.itineraryOptions) && data.itineraryOptions.length > 0
                    ? data.itineraryOptions[0]
                    : null;
                setActiveItineraryTab(firstOpt ? (firstOpt.id || firstOpt.label || "") : "");
            })
            .catch((err) => {
                if (!cancelled) {
                    console.error(err);
                    setError("Could not load this cruise.");
                }
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => { cancelled = true; };
    }, [slug]);

    useEffect(() => {
        const uploaded = Array.isArray(cruise?.galleryImageURLs) && cruise.galleryImageURLs.length > 0
            ? cruise.galleryImageURLs
            : null;
        if (uploaded) {
            setImages(uploaded);
            setGalleryLoading(false);
            return;
        }
        if (!cruise?.galleryFolder) {
            setGalleryLoading(false);
            return;
        }
        let cancelled = false;
        setGalleryLoading(true);
        listFolderImageUrls(cruise.galleryFolder)
            .then((urls) => {
                if (!cancelled) setImages(urls);
            })
            .catch(() => { })
            .finally(() => {
                if (!cancelled) setGalleryLoading(false);
            });
        return () => { cancelled = true; };
    }, [cruise?.galleryFolder, cruise?.galleryImageURLs]);

    if (loading) {
        return (
            <div className="content-container">
                <Spinner className="loading-spinner-block" label="Loading cruise…" />
            </div>
        );
    }

    if (error || !cruise) {
        return (
            <div className="content-container">
                <p className="travel-packages-error">{error || "Cruise not found."}</p>
            </div>
        );
    }

    const hasImages = images.length > 0;
    const heroImage = cruise.heroImageURL || (hasImages ? images[0] : null);
    const hasHero = !!cruise.heroImageURL;
    const safeSelectedIndex =
        !hasImages || typeof selectedIndex !== "number" || selectedIndex < 0 || selectedIndex >= images.length
            ? 0
            : selectedIndex;

    let mainImage;
    if (hasHero) {
        // Default to the hero image. If the user has clicked a gallery item (selectedIndex is a number),
        // show that instead.
        mainImage = hasImages && typeof selectedIndex === "number" ? images[safeSelectedIndex] : heroImage;
    } else {
        mainImage = hasImages ? images[safeSelectedIndex] : heroImage;
    }
    const limitedImages = images.slice(0, INITIAL_VISIBLE_GALLERY_COUNT);
    const isExpandable = images.length > INITIAL_VISIBLE_GALLERY_COUNT;
    const visibleImages = showAll ? images : limitedImages;

    const overviewParagraphs = Array.isArray(cruise.overviewParagraphs) ? cruise.overviewParagraphs : [];
    const technicalInfo = Array.isArray(cruise.technicalInfo) ? cruise.technicalInfo : [];
    const features = Array.isArray(cruise.features) ? cruise.features : [];
    const cabinFeatures = Array.isArray(cruise.cabinFeatures) ? cruise.cabinFeatures : [];
    const itineraryOptions = Array.isArray(cruise.itineraryOptions) ? cruise.itineraryOptions : [];
    const currentItinerary = itineraryOptions.find((opt) => (opt.id || opt.label) === activeItineraryTab) || itineraryOptions[0];

    return (
        <div className="content-container cruise-detail">
            <div className="cruise-hero">
                {mainImage ? (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={mainImage}
                            className="cruise-hero-image-wrapper"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                            <img src={mainImage} alt="" className="cruise-hero-image" />
                            <div className="cruise-hero-title">{cruise.title}</div>
                        </motion.div>
                    </AnimatePresence>
                ) : (
                    <div className="cruise-hero-placeholder">{cruise.title}</div>
                )}
            </div>

            {galleryLoading && (
                <div className="cruise-gallery-loading">
                    <Spinner label="Loading gallery…" />
                </div>
            )}

            {hasImages && (
                <div className={`cruise-gallery ${showAll ? "is-expanded" : ""}`}>
                    {visibleImages.map((url, index) => (
                        <motion.button
                            key={url}
                            type="button"
                            className="cruise-gallery-item"
                            onClick={() => setSelectedIndex(index)}
                            initial={{ opacity: 0, scale: 0.92 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.25, delay: index * 0.03, ease: "easeOut" }}
                        >
                            <img src={url} alt={`Gallery ${index + 1}`} />
                        </motion.button>
                    ))}
                    {isExpandable && (
                        <motion.button
                            type="button"
                            className="cruise-gallery-item cruise-gallery-view-more"
                            onClick={() => setShowAll((prev) => !prev)}
                            initial={{ opacity: 0, scale: 0.92 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.25, delay: visibleImages.length * 0.03, ease: "easeOut" }}
                        >
                            <span>{showAll ? "View less" : "View gallery"}</span>
                        </motion.button>
                    )}
                </div>
            )}

            <div className="cruise-tabs">
                <button type="button" className={`btn btn-primary ${activeTab === "overview" ? "is-active-tab" : ""}`} onClick={() => setActiveTab("overview")}>
                    Overview
                </button>
                <button type="button" className={`btn btn-primary ${activeTab === "cruise-features" ? "is-active-tab" : ""}`} onClick={() => setActiveTab("cruise-features")}>
                    Cruise Features
                </button>
                <button type="button" className={`btn btn-primary ${activeTab === "cruise-itinerary" ? "is-active-tab" : ""}`} onClick={() => setActiveTab("cruise-itinerary")}>
                    Cruise Itinerary
                </button>
            </div>

            <AnimatePresence mode="wait">
                {activeTab === "overview" && (
                    <motion.div
                        key="overview"
                        className="cruise-tab-panel"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                    >
                        <div className="cruise-overview">
                            <div>
                                <h2>Overview</h2>
                                {overviewParagraphs.length > 0 ? (
                                    overviewParagraphs.map((p, i) => <p key={i}>{p}</p>)
                                ) : (
                                    <p className="travel-packages-details-empty">Overview has not been added yet.</p>
                                )}
                            </div>
                            <div>
                                {technicalInfo.length > 0 && (
                                    <>
                                        <h2>Technical Information</h2>
                                        <ul>
                                            {technicalInfo.map((item, i) => (
                                                <li key={i}>{item}</li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
                {activeTab === "cruise-features" && (
                    <motion.div
                        key="cruise-features"
                        className="cruise-tab-panel"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                    >
                        <div className="cruise-features">
                            {features.length > 0 && (
                                <div className="cruise-features-grid">
                                    {features.map((f, index) => (
                                        <div key={index} className="feature-card">
                                            {f?.iconURL && <img src={f.iconURL} alt="" className="feature-card-icon" />}
                                            <p>{typeof f === "string" ? f : (f?.label || "")}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {cabinFeatures.length > 0 && (
                                <div className="features02">
                                    <h3>All cabins/suites overview the River Nile and they feature:</h3>
                                    <ul>
                                        {cabinFeatures.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {features.length === 0 && cabinFeatures.length === 0 && (
                                <p className="travel-packages-details-empty">Cruise features have not been added yet.</p>
                            )}
                        </div>
                    </motion.div>
                )}
                {activeTab === "cruise-itinerary" && (
                    <motion.div
                        key="cruise-itinerary"
                        className="cruise-tab-panel"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                    >
                        <div className="cruise-itinerary">
                            {itineraryOptions.length > 0 && (
                                <div className="cruise-tabs">
                                    {itineraryOptions.map((opt) => {
                                        const optId = opt.id || opt.label || "";
                                        const isActive = (opt.id || opt.label) === activeItineraryTab;
                                        return (
                                            <button
                                                key={optId}
                                                type="button"
                                                className={`btn btn-primary ${isActive ? "is-active-tab" : ""}`}
                                                onClick={() => setActiveItineraryTab(optId)}
                                            >
                                                {opt.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                            <div className="cruise-itinerary-content">
                                {currentItinerary && (

                                    <div className="cruise-itinerary-tab-panel">
                                        {Array.isArray(currentItinerary.days) && currentItinerary.days.length > 0 ? (
                                            <ol>
                                                {currentItinerary.days.map((item, i) => (
                                                    <li key={i}>
                                                        {item.day && <span>{item.day}: </span>}
                                                        {item.title && <span>{item.title}</span>}
                                                        {item.description && <p>{item.description}</p>}
                                                    </li>
                                                ))}
                                            </ol>
                                        ) : null}
                                        {Array.isArray(currentItinerary.notes) && currentItinerary.notes.length > 0 && (
                                            <>
                                                <p><b>Notes:</b></p>
                                                <ul>
                                                    {currentItinerary.notes.map((note, i) => (
                                                        <li key={i}>{note}</li>
                                                    ))}
                                                </ul>
                                            </>
                                        )}
                                    </div>
                                )}
                                {itineraryOptions.length === 0 && (
                                    <p className="travel-packages-details-empty">Itinerary has not been added yet.</p>
                                )}
                                <div className="help-form">
                                    <h2>Need Help?</h2>
                                    <p>Are you interested in our pricing, offers, and tailored arrangements?</p>
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
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default CruiseDetail;
