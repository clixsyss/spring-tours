import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { listFolderImageUrls } from "../firebase";
import Spinner from "../components/Spinner";

function TransportFleets() {
    const [imageUrls, setImageUrls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        listFolderImageUrls("transportFleets")
            .then((urls) => {
                setImageUrls(urls);
                setActiveIndex(0);
            })
            .catch((err) => {
                console.error("Transport fleets gallery load failed:", err);
                setError(err?.message || "Failed to load images");
            })
            .finally(() => setLoading(false));
    }, []);

    const currentUrl = imageUrls.length ? imageUrls[activeIndex] : null;

    const changeSlide = (direction) => {
        setActiveIndex((prev) => {
            const lastIndex = imageUrls.length - 1;
            if (lastIndex < 0) return 0;
            if (direction === "left") return prev === 0 ? lastIndex : prev - 1;
            return prev === lastIndex ? 0 : prev + 1;
        });
    };

    if (loading) {
        return (
            <div>
                <div className="content-container">
                    <div className="mice-media-container">
                        <div className="mice-media-main" style={{ backgroundImage: "none", background: "#eee", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Spinner label="Loading gallery…" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !imageUrls.length) {
        return (
            <div>
                <div className="content-container">
                    <div className="mice-media-container">
                        <div className="mice-media-main" style={{ backgroundImage: "none", background: "#f5f5f5" }}>
                            <div className="mice-media-title">
                                {error ? `Error: ${error}` : "No images in transport fleets gallery."}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="content-container">
                <div className="mice-media-container">
                    <div
                        className="mice-media-main"
                        style={currentUrl ? { backgroundImage: `url(${currentUrl})` } : undefined}
                    >
                        <div className="mice-media-title">Transport Fleet</div>
                    </div>

                    <div className="mice-media-thumbs-wrapper">
                        <button
                            type="button"
                            className="mice-media-arrow mice-media-arrow-left"
                            onClick={() => changeSlide("left")}
                            aria-label="Previous"
                        >
                            <FaArrowLeft size={18} />
                        </button>
                        <div className="mice-media-thumbs-track">
                            {imageUrls.map((url, index) => (
                                <button
                                    key={url}
                                    type="button"
                                    className={`mice-media-thumb ${index === activeIndex ? "is-active" : ""}`}
                                    style={{ backgroundImage: `url(${url})` }}
                                    onClick={() => setActiveIndex(index)}
                                    aria-label={`Image ${index + 1}`}
                                />
                            ))}
                        </div>
                        <button
                            type="button"
                            className="mice-media-arrow mice-media-arrow-right"
                            onClick={() => changeSlide("right")}
                            aria-label="Next"
                        >
                            <FaArrowRight size={18} />
                        </button>
                    </div>
                </div>

                <div className="mice-content-container">
                    <h1>Transport Fleets</h1>
                    <h2>We take pride in serving our guests
                        with the best experience</h2>
                    <p>

                        Spring Tours owns a fleet of over 100 deluxe air-conditioned vehicles and vans with various passenger capacities. Transport fleet updates take place on an annual basis to ensure that the best, safest and most comfortable transport is offered to our guests. Brand new coaches were added between 2023 and 2024.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default TransportFleets;
