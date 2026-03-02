import bannerImage from '../assets/travelPackages01.png';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { getTravelPackageById } from '../firebase';
import Spinner from '../components/Spinner';

function TravelPackagesDetails() {
    const { id } = useParams();
    const [packageData, setPackageData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState("overview");

    useEffect(() => {
        let cancelled = false;
        if (!id) {
            setLoading(false);
            setError("Invalid package.");
            return () => { };
        }
        setLoading(true);
        setError(null);
        getTravelPackageById(id)
            .then((data) => {
                if (!cancelled) {
                    setPackageData(data);
                    if (!data) setError("Package not found.");
                }
            })
            .catch((err) => {
                if (!cancelled) {
                    console.error(err);
                    setError("Could not load this package.");
                }
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => { cancelled = true; };
    }, [id]);

    const bannerURL = packageData?.bannerURL || packageData?.imageURL;
    const bannerStyle = {
        backgroundImage: bannerURL ? `url(${bannerURL})` : `url(${bannerImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        alignItems: 'flex-end',
    };

    const inclusions = Array.isArray(packageData?.overviewInclusions) ? packageData.overviewInclusions : [];
    const exclusions = Array.isArray(packageData?.overviewExclusions) ? packageData.overviewExclusions : [];
    const itinerary = Array.isArray(packageData?.itinerary) ? packageData.itinerary : [];
    const notes = Array.isArray(packageData?.notes) ? packageData.notes : [];

    if (loading) {
        return (
            <div className="content-container">
                <Spinner className="loading-spinner-block" label="Loading package…" />
            </div>
        );
    }

    if (error || !packageData) {
        return (
            <div className="content-container">
                <p className="travel-packages-error">{error || "Package not found."}</p>
            </div>
        );
    }

    return (
        <div>
            <div className="content-container">
                <div className="travel-packages-banner" style={bannerStyle}>
                    <h3>{packageData.title || "Travel Package"}</h3>
                </div>
                <div className="cruise-tabs">
                    <button type="button" className={`btn btn-primary ${activeTab === "overview" ? "is-active-tab" : ""}`} onClick={() => setActiveTab("overview")}>
                        Overview
                    </button>
                    <button type="button" className={`btn btn-primary ${activeTab === "itinerary" ? "is-active-tab" : ""}`} onClick={() => setActiveTab("itinerary")}>
                        Itinerary
                    </button>
                </div>

                <div className="cruise-itinerary-content">
                    <div>
                        <AnimatePresence mode="wait">
                            {activeTab === "overview" && (
                                <motion.div
                                    key="overview"
                                    className="travel-packages-details-overview"
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                >
                                    {inclusions.length > 0 && (
                                        <>
                                            <h2>Inclusions</h2>
                                            <ol>
                                                {inclusions.map((item, i) => (
                                                    <li key={i}>{item}</li>
                                                ))}
                                            </ol>
                                        </>
                                    )}
                                    {exclusions.length > 0 && (
                                        <>
                                            <h2>Exclusions</h2>
                                            <ol>
                                                {exclusions.map((item, i) => (
                                                    <li key={i}>{item}</li>
                                                ))}
                                            </ol>
                                        </>
                                    )}
                                    {inclusions.length === 0 && exclusions.length === 0 && (
                                        <p className="travel-packages-details-empty">Overview details for this package have not been added yet.</p>
                                    )}
                                </motion.div>
                            )}
                            {activeTab === "itinerary" && (
                                <motion.div
                                    key="itinerary"
                                    className="travel-packages-details-itinerary cruise-itinerary-tab-panel"
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                >
                                    {itinerary.length > 0 ? (
                                        <ol>
                                            {itinerary.map((item, i) => (
                                                <li key={i}>
                                                    {item.day && <span className="cruise-itinerary-day">{item.day}: </span>}
                                                    {item.title && <span>{item.title}</span>}
                                                    {item.description && <p>{item.description}</p>}
                                                </li>
                                            ))}
                                        </ol>
                                    ) : null}
                                    {itinerary.length === 0 && notes.length === 0 && (
                                        <p className="travel-packages-details-empty">Itinerary for this package has not been added yet.</p>
                                    )}
                                    {notes.length > 0 && (
                                        <>
                                            <h3>Notes</h3>
                                            <ul>
                                                {notes.map((item, i) => (
                                                    <li key={i}>{item}</li>
                                                ))}
                                            </ul>
                                        </>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
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
        </div>
    );
}

export default TravelPackagesDetails;
