import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { listFolderImageUrls } from "../../firebase";

import restaurantIcon from "../../assets/icons/restaurants.svg";
import receptionIcon from "../../assets/icons/reception.svg";
import giftIcon from "../../assets/icons/gift.svg";
import balconyIcon from "../../assets/icons/balcony.svg";
import balcony02Icon from "../../assets/icons/balcony02.svg";
import wellnessIcon from "../../assets/icons/wellness.svg";
import fitnessIcon from "../../assets/icons/fitness.svg";
import swimmingIcon from "../../assets/icons/swimming.svg";
import suitsIcon from "../../assets/icons/suits.svg";
import suits02Icon from "../../assets/icons/suits02.svg";
import barIcon from "../../assets/icons/bar.svg";
import coffeeIcon from "../../assets/icons/coffee.svg";
import wifiIcon from "../../assets/icons/wifi.svg";
import suits03Icon from "../../assets/icons/suits03.svg";
import restaurantIcon02 from "../../assets/icons/restaurants02.svg";
import swimmingIcon02 from "../../assets/icons/swimming02.svg";
import fitnessIcon02 from "../../assets/icons/fitness02.svg";

const SPHINX_GALLERY_FOLDER = "cruises/SS Sphinx";

const CRUISE_FEATURES = [
    { icon: restaurantIcon, label: "Fine Dining Restaurant" },
    { icon: receptionIcon, label: "24-hour reception service" },
    { icon: giftIcon, label: "Gift & jewelry shop" },
    { icon: balconyIcon, label: "14 French balcony 22 sqm" },
    { icon: balcony02Icon, label: "2 Deluxe French balcony 26 sqm" },
    { icon: wellnessIcon, label: "Wellness & Relaxation area" },
    { icon: fitnessIcon, label: "Fitness Area" },
    { icon: swimmingIcon, label: "Spacious sundeck with swimming pool" },
    { icon: suitsIcon, label: "2 Suites 32 sqm" },
    { icon: suits02Icon, label: "20 Grand Suites 40 sqm" },
    { icon: barIcon, label: "Rooftop Bar" },
    { icon: coffeeIcon, label: "Coffee Room" },
    { icon: wifiIcon, label: "WiFi in Public Areas" },
    { icon: suits03Icon, label: "4 Royal Suites 46 sqm" },
    { icon: restaurantIcon02, label: "Full Board" },
    { icon: swimmingIcon02, label: "Entertaining Amentities" },
    { icon: fitnessIcon02, label: "Fitness Facilities" },
];
const INITIAL_VISIBLE_GALLERY_COUNT = 7;

function Sphinx() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [showAll, setShowAll] = useState(false);
    const [activeTab, setActiveTab] = useState("overview");
    const [activeCruiseItineraryTab, setActiveCruiseItineraryTab] = useState("3-night-cruise");
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
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={mainImage}
                            className="cruise-hero-image-wrapper"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                            <img src={mainImage} alt="S/S Sphinx main" className="cruise-hero-image" />
                            <div className="cruise-hero-title">S/S Sphinx</div>
                        </motion.div>
                    </AnimatePresence>
                ) : (
                    <div className="cruise-hero-placeholder">
                        S/S Sphinx
                    </div>
                )}

                {error && <p className="cruise-gallery-error">{error}</p>}
            </div>

            {loading && (
                <div className="cruise-gallery-loading">
                    <div className="cruise-gallery-spinner" aria-hidden="true" />
                    <div className="cruise-gallery-loading-bar">
                        <div className="cruise-gallery-loading-bar-fill" />
                    </div>
                    <p className="cruise-gallery-loading-text">Loading gallery…</p>
                </div>
            )}

            {hasImages && (
                <div className={`cruise-gallery ${showAll ? "is-expanded" : ""}`}>
                    {visibleImages.map((url, index) => {
                        const globalIndex = index;

                        return (
                            <motion.button
                                key={url}
                                type="button"
                                className="cruise-gallery-item"
                                onClick={() => setSelectedIndex(globalIndex)}
                                initial={{ opacity: 0, scale: 0.92 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.25, delay: index * 0.03, ease: "easeOut" }}
                            >
                                <img src={url} alt={`S/S Sphinx gallery ${globalIndex + 1}`} />
                            </motion.button>
                        );
                    })}

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
                                <p>
                                    Spring Tours started building Nile boats 33 years ago. With every boat built, a new feature or design was added to achieve not only the elegance in style but also the maximum comfort we need for our valued guests. In 2021, Spring Tours inaugurated the Super Ship Sphinx, which combines a blend of the old luxury and modern comfort for the maximum pleasure achieved on the Nile so far with ultra-modern equipment and machinery to make it a green and echo friendly vessel as well.
                                </p>
                                <p>
                                    The whole boat's exquisite decoration is produced by Egyptian artisans with local materials and world famous Egyptian fine cotton with the ancient Egyptian blue and yellow color combinations to add elegance to an unforgettable journey on the Nile. Most of the details in the design and décor of S/S Sphinx will remind you of the charm and the luxury you have probably seen in the orientalists' paintings: the woodwork in the ceilings, doors, the furniture inlaid with mother of pearl, the lanterns…
                                </p>
                                <p>
                                    We are proud that all our staff members on board are enthusiastic young locals from Upper Egypt who have been highly trained by our Swiss partners to offer the high international standards of service combined with the local generous and warm welcome so guests can experience the Egyptian friendly smile and hospitality as well. The highly professional Egyptian chefs combine the local cuisine with the international one for more unique dining experience. The super ship offers 42 luxurious suites all with French balconies, swimming pool, massage room, elevator and two gourmet restaurants.
                                </p>
                            </div>
                            <div>
                                <h2>Technical Information</h2>
                                <ul>
                                    <li>True 5-star class river cruise boat</li>
                                    <li>Length ca. 72 m</li>
                                    <li>Width ca. 15 m</li>
                                    <li>Draft ca. 1.60 m</li>
                                    <li>4 decks + 1 sun deck</li>
                                    <li>Water purification system</li>
                                    <li>Fire and sound proof walls and ceiling</li>
                                    <li>Approved by DNVGL</li>
                                    <li>Smoking is allowed on the sundeck only</li>
                                </ul>
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
                            <div className="cruise-features-grid">
                                {CRUISE_FEATURES.map((feature, index) => (
                                    <div key={index} className="feature-card">
                                        <img
                                            src={typeof feature.icon === "string" ? feature.icon : feature.icon.default}
                                            alt=""
                                        />
                                        <p>{feature.label}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="features02">
                                <h3>All cabins/suites overview the River Nile and they feature:</h3>
                                <ul>
                                    <li>French balcony</li>
                                    <li>En suite bathroom with shower or bathtub (bathtub and shower in the suites, the grand suites and the royal suites), elegant robes and slippers</li>
                                    <li>Hair dryer</li>
                                    <li>Individually controllable air conditioning</li>
                                    <li>Flat screen TV (marine satellite)</li>
                                    <li>Mini fridge</li>
                                    <li>Direct-dial phone</li>
                                    <li>Safe deposit box</li>
                                    <li>Wifi</li>
                                    <li>Tea/coffee making facilities</li>
                                </ul>
                            </div>
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
                            <div className="cruise-tabs">
                                <button type="button" className={`btn btn-primary ${activeCruiseItineraryTab === "3-night-cruise" ? "is-active-tab" : ""}`} onClick={() => setActiveCruiseItineraryTab("3-night-cruise")}>
                                    3-Night Cruise
                                </button>
                                <button type="button" className={`btn btn-primary ${activeCruiseItineraryTab === "4-night-cruise" ? "is-active-tab" : ""}`} onClick={() => setActiveCruiseItineraryTab("4-night-cruise")}>
                                    4-Night Cruise
                                </button>
                                <button type="button" className={`btn btn-primary ${activeCruiseItineraryTab === "7-night-cruise" ? "is-active-tab" : ""}`} onClick={() => setActiveCruiseItineraryTab("7-night-cruise")}>
                                    7-Night Cruise
                                </button>
                            </div>

                            <div className="cruise-itinerary-content">

                                {activeCruiseItineraryTab === "3-night-cruise" && (
                                    <motion.div
                                        key="3-night-cruise"
                                        className="cruise-tab-panel"
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -8 }}
                                        transition={{ duration: 0.25, ease: "easeOut" }}
                                    >
                                        <div className="cruise-itinerary-3-night cruise-itinerary-tab-panel">
                                            <ol>
                                                <li>
                                                    Day1: <span>Friday: Cruise embarkation - Aswan sightseeing</span>
                                                    <p>Embarkation before lunch. Visit the High Dam, Philae Temple & the Unfinished Obelisk. Overnight in Aswan.</p>
                                                </li>
                                                <li>
                                                    Day2: <span>Saturday: Kom Ombo - Sail to Edfu</span>
                                                    <p>Chance for optional Abu Simbel excursion. Sail to Kom Ombo. In the afternoon, visit the unusual Temple of Kom Ombo. One side of the temple is dedicated to the crocodile god Sobek, god of fertility and creator of the world. The other side is dedicated to the falcon god Haroeris, also known as Horus the Elder. Sail to Edfu. Overnight aboard.</p>
                                                </li>
                                                <li>
                                                    Day3: <span>Sunday: Esna Temple - Sail to Luxor</span>
                                                    <p>Sail for Esna & visit its temple, sail to Luxor. Visit Luxor Temple. This temple is testimony to the history of the continuous history of Egypt, beginning from the 18th dynasty of Ancient Egyptian rule to the 14th century AD when a mosque was built in the complex. Many pharaohs played a part in building this temple over the years including Tutankhamen, Hatshepsut, Ramses II, and Amenhotep III. Dinner and overnight aboard.</p>
                                                </li>
                                                <li>
                                                    Day4: <span>Monday: Cruise Disembarkation - Luxor Sightseeing Tour</span>
                                                    <p>Breakfast followed by cruise disembarkation. Your tour today will start with the Valley of the Kings. For a period of nearly 500 years, tombs were constructed for the kings and powerful nobles of Ancient Egypt. In modern times, the valley has become famous for the discovery of the tomb of Tut Ankh Amun and is one of the most famous archaeological sites in the world. On the West Bank, you will also visit the Temple of Queen Hatshepsut and see the Colossi of Memnon. Afterwards, you will cross the Nile and visit Karnak Temple. This Ancient complex covers an area of ca. 2 sq. km. The temple of Amun, the complex's main structure, is the largest place of worship ever built!</p>
                                                </li>
                                            </ol>
                                            <p><b>Notes:</b></p>
                                            <ul>
                                                <li>This itinerary may be changed without prior notice due to navigational restrictions.</li>
                                                <li>The itinerary may change in sequence but all visits will be offered.</li>
                                            </ul>
                                        </div>
                                    </motion.div>
                                )}
                                {activeCruiseItineraryTab === "4-night-cruise" && (
                                    <motion.div
                                        key="4-night-cruise"
                                        className="cruise-tab-panel"
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -8 }}
                                        transition={{ duration: 0.25, ease: "easeOut" }}
                                    >
                                        <div className="cruise-itinerary-4-night cruise-itinerary-tab-panel">
                                            <ol>
                                                <li>
                                                    Day1: <span>Moday</span>
                                                    <p>Embarkation before lunch. In the afternoon, visit Karnak Temple on the East Bank. Overnight aboard.</p>
                                                </li>
                                                <li>
                                                    Day2: <span>Tuesday</span>
                                                    <p>In the morning, visit Dendara Temple, the colorful temple dedicated to the Goddess Hathor. Back to the boat at lunch time. In the afternoon, visit Luxor Temple. This temple is a testimony to the history of the continuous history of Egypt, beginning from the 18th dynasty of Ancient Egyptian rule to the 14th century AD when a mosque was built in the complex. Many pharaohs played a part in building this temple over the years including Tutankhamen, Hatshepsut, Ramses II, and Amenhotep III. Overnight aboard in Luxor .</p>
                                                </li>
                                                <li>
                                                    Day3: <span>Wednesday</span>
                                                    <p>Your tour in Luxor (frequently characterized as “the world’s greatest open air museum”) will start with the Valley of the Kings. For a period of nearly 500 years, tombs were constructed for the kings and powerful nobles of Ancient Egypt. In modern times, the valley has become famous for the discovery of the tomb of Tut Ankh Amun and is one of the most famous archaeological sites in the world. On the West Bank, you will also visit the Temple of Queen Hatshepsut and see the Colossi of Memnon. Back to the boat. Sail to Kom Ombo. Overnight aboard.</p>
                                                </li>
                                                <li>
                                                    Day4: <span>Thursday</span>
                                                    <p>In the morning, visit the unusual Temple of Kom Ombo. One side of the temple is dedicated to the crocodile god Sobek, god of fertility and creator of the world. The other side is dedicated to the falcon god Haroeris, also known as Horus the Elder. Sail to Aswan, visit the High Dam, the Unfinished Obelisk and Philae Temple. Overnight aboard in Aswan.</p>
                                                </li>
                                                <li>
                                                    Day5: <span>Friday</span>
                                                    <p>Disembarkation in the morning. Optional excursion to Abu Simbel.</p>
                                                </li>
                                            </ol>
                                            <p><b>Notes:</b></p>
                                            <ul>
                                                <li>This itinerary may be changed without prior notice due to navigational restrictions.</li>
                                                <li>The itinerary may change in sequence but all visits will be offered.</li>
                                                <li>In case of low water levels, the visit of Dendara Temple will be arranged by road from Luxor.</li>
                                            </ul>
                                        </div>
                                    </motion.div>
                                )}
                                {activeCruiseItineraryTab === "7-night-cruise" && (
                                    <motion.div
                                        key="7-night-cruise"
                                        className="cruise-tab-panel"
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -8 }}
                                        transition={{ duration: 0.25, ease: "easeOut" }}
                                    >
                                        <div className="cruise-itinerary-7-night cruise-itinerary-tab-panel">
                                            <ol>
                                                <li>
                                                    Day1: <span>Moday</span>
                                                    <p>Embarkation before lunch. In the afternoon, visit Karnak Temple. Overnight aboard.</p>
                                                </li>
                                                <li>
                                                    Day2: <span>Tuesday</span>
                                                    <p>In the morning, visit Dendara Temple dedicated to the Goddess Hathor. Return to boat around lunch time. In the afternoon, visit Luxor Temple. This temple is a testimony to the history of the continuous history of Egypt, beginning from the 18th dynasty of Ancient Egyptian rule to the 14th century AD when a mosque was built in the complex. Many pharaohs played a part in building this temple over the years including Tutankhamen, Hatshepsut, Ramses II, and Amenhotep III. Overnight aboard in Luxor.</p>
                                                </li>
                                                <li>
                                                    Day3: <span>Wednesday</span>
                                                    <p>Your tour in Luxor (frequently characterized as “the world’s greatest open air museum”) will start with the Valley of the Kings. For a period of nearly 500 years, tombs were constructed for the kings and powerful nobles of Ancient Egypt. In modern times, the valley has become famous for the discovery of the tomb of Tut Ankh Amun and is one of the most famous archaeological sites in the world. On the West Bank, you will also visit the Temple of Queen Hatshepsut and see the Colossi of Memnon. Back to the boat. Sail to Kom Ombo. Overnight aboard.</p>
                                                </li>
                                                <li>
                                                    Day4: <span>Thursday</span>
                                                    <p>In the morning, visit the unusual Temple of Kom Ombo. One side of the temple is dedicated to the crocodile god Sobek, god of fertility and creator of the world. The other side is dedicated to the falcon god Haroeris, also known as Horus the Elder. Sail to Aswan, visit the High Dam, the Unfinished Obelisk and Philae Temple. Overnight aboard in Aswan.</p>
                                                </li>
                                                <li>
                                                    Day5: <span>Friday</span>
                                                    <p>In the morning, optional excursion to Abu Simbel. In the afternoon, felucca sailing around the islands. Overnight aboard in Aswan.</p>
                                                </li>
                                                <li>
                                                    Day6: <span>Saturday</span>
                                                    <p>In the morning, sailing to Kom Ombo then to Edfu. Overnight aboard in Edfu.</p>
                                                </li>
                                                <li>
                                                    Day7: <span>Sunday</span>
                                                    <p>Sailing to Esna & visit its temple. Sailing to Luxor. Overnight aboard in Luxor.</p>
                                                </li>
                                                <li>
                                                    Day8: <span>Monday</span>
                                                    <p>Cruise disembarkation.</p>
                                                </li>
                                            </ol>
                                            <p><b>Notes:</b></p>
                                            <ul>
                                                <li>This itinerary may be changed without prior notice due to navigational restrictions.</li>
                                                <li>The itinerary may change in sequence but all visits will be offered.</li>
                                                <li>In case of low water levels, the visit of Dendara Temple will be arranged by road from Luxor.</li>
                                            </ul>
                                        </div>
                                    </motion.div>
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


                            <div className="cruise-itinerary-notes">
                                <h2>Always Included in our Cruises</h2>
                                <div className="cruise-itinerary-notes-grid">
                                    <div>
                                        <img src={restaurantIcon02} alt="Restaurant" />
                                        <h4>Full Board</h4>
                                        <p>Breakfast, Lunch Dinner in main restaurant and buffet.</p>
                                    </div>
                                    <div>
                                        <img src={swimmingIcon02} alt="Swimming" />
                                        <h4>Entertaining Amentities</h4>
                                        <p>Sun deck and rooftop bar</p>
                                    </div>
                                    <div>
                                        <img src={fitnessIcon02} alt="Fitness" />
                                        <h4>Fitness Facilities</h4>
                                        <p>Gym, Pools, and Sports Facilities with Free Access</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default Sphinx;

