import { useEffect, useState } from "react";
import { listFolderImageUrls } from "../../firebase";

const SPHINX_GALLERY_FOLDER = "cruises/SS Sphinx";
const INITIAL_VISIBLE_GALLERY_COUNT = 7;

function Sphinx() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        let isSubscribed = true;

        async function loadImages() {
            try {
                setLoading(true);
                const urls = await listFolderImageUrls(SPHINX_GALLERY_FOLDER);
                if (!isSubscribed) return;
                setImages(urls);
            } catch (err) {
                if (!isSubscribed) return;
                console.error("Failed to load Sphinx gallery images:", err);
                setError("We couldn't load the gallery right now. Please try again in a moment.");
            } finally {
                if (isSubscribed) {
                    setLoading(false);
                }
            }
        }

        loadImages();

        return () => {
            isSubscribed = false;
        };
    }, []);

    const hasImages = images.length > 0;
    const safeSelectedIndex =
        !hasImages || selectedIndex < 0 || selectedIndex >= images.length ? 0 : selectedIndex;
    const mainImage = hasImages ? images[safeSelectedIndex] : null;

    const limitedImages = images.slice(0, INITIAL_VISIBLE_GALLERY_COUNT);
    const isExpandable = images.length > INITIAL_VISIBLE_GALLERY_COUNT;
    const visibleImages = showAll ? images : limitedImages;

    return (
        <div className="content-container cruise-detail">
            <div className="cruise-hero">
                {mainImage ? (
                    <div className="cruise-hero-image-wrapper">
                        <img src={mainImage} alt="S/S Sphinx main" className="cruise-hero-image" />
                        <div className="cruise-hero-title">S/S Sphinx</div>
                    </div>
                ) : (
                    <div className="cruise-hero-placeholder">
                        S/S Sphinx
                    </div>
                )}

                {error && <p className="cruise-gallery-error">{error}</p>}
            </div>

            {loading && <p>Loading gallery...</p>}

            {hasImages && (
                <div className={`cruise-gallery ${showAll ? "is-expanded" : ""}`}>
                    {visibleImages.map((url, index) => {
                        const globalIndex = index; 

                        return (
                            <button
                                key={url}
                                type="button"
                                className="cruise-gallery-item"
                                onClick={() => setSelectedIndex(globalIndex)}
                            >
                                <img src={url} alt={`S/S Sphinx gallery ${globalIndex + 1}`} />
                            </button>
                        );
                    })}

                    {isExpandable && (
                        <button
                            type="button"
                            className="cruise-gallery-item cruise-gallery-view-more"
                            onClick={() => setShowAll((prev) => !prev)}
                        >
                            <span>{showAll ? "View less" : "View gallery"}</span>
                        </button>
                    )}
                </div>
            )}

            {/* Below this you can keep or expand the text sections (Overview, Technical Info, etc.) */}
        </div>
    );
}

export default Sphinx;

