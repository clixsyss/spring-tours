import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { listFolderImageUrls } from "../../firebase";

import restaurantIcon from "../../assets/icons/restaurants.svg";
import receptionIcon from "../../assets/icons/reception.svg";
import giftIcon from "../../assets/icons/gift.svg";
import balcony02Icon from "../../assets/icons/balcony02.svg";
import wellnessIcon from "../../assets/icons/wellness.svg";
import fitnessIcon from "../../assets/icons/fitness.svg";
import swimmingIcon from "../../assets/icons/swimming.svg";
import suitsIcon from "../../assets/icons/suits.svg";
import suits02Icon from "../../assets/icons/suits02.svg";
import barIcon from "../../assets/icons/bar.svg";
import wifiIcon from "../../assets/icons/wifi.svg";
import suits03Icon from "../../assets/icons/suits03.svg";
import restaurantIcon02 from "../../assets/icons/restaurants02.svg";
import swimmingIcon02 from "../../assets/icons/swimming02.svg";
import fitnessIcon02 from "../../assets/icons/fitness02.svg";

const MEDEA_GALLERY_FOLDER = "cruises/MS Medea";

const CRUISE_FEATURES = [
    { icon: restaurantIcon, label: "Fine Dining Restaurant" },
    { icon: receptionIcon, label: "24-hour reception service" },
    { icon: giftIcon, label: "Gift & jewelry shop" },
    // { icon: balconyIcon, label: "14 French balcony 22 sqm" },
    { icon: suitsIcon, label: "36 Double Superior Cabins 20 sqm" },
    { icon: suits02Icon, label: "19 Double Superior Cabins 20 sqm" },
    { icon: balcony02Icon, label: "2 Suites with Balcony" },
    { icon: wellnessIcon, label: "Wellness & Relaxation area" },
    { icon: fitnessIcon, label: "Fitness Area" },
    { icon: swimmingIcon, label: "Spacious sundeck with swimming pool" },
    { icon: barIcon, label: "Rooftop Bar" },
    { icon: wifiIcon, label: "WiFi in Public Areas" },
    { icon: suits03Icon, label: "1 Suite without Balcony" },
];
const INITIAL_VISIBLE_GALLERY_COUNT = 7;

function Medea() {
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
                const urls = await listFolderImageUrls(MEDEA_GALLERY_FOLDER);
                if (!isSubscribed) return;
                setImages(urls);
            } catch (err) {
                if (!isSubscribed) return;
                console.error("Failed to load Medea gallery images:", err);
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
                            <img src={mainImage} alt="M/S Medea main" className="cruise-hero-image" />
                            <div className="cruise-hero-title">M/S Medea</div>
                        </motion.div>
                    </AnimatePresence>
                ) : (
                    <div className="cruise-hero-placeholder">
                        M/S Medea
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
                                <img src={url} alt={`M/S Medea gallery ${globalIndex + 1}`} />
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
                                    Medea in her new look
                                </p>
                                <p>
                                    This boat has been completely reconstructed in 2024 with complete overhaul of all engines, generators and air conditioning system. The new lavish furniture not only ensures the maximum comfort but a combination of stunning colors that add to the serenity and sophistication of this 5 star Nile boat.
                                </p>
                                <p>
                                    The boat offers an authentically immersive onboard experience and local entertainment in bespoke decor by local artisans and materials like the Egyptian cottons, marble, and hand-carved blonde wood that highlights the Egyptian craftsmanship .
                                </p>
                                <p>
                                    The boat comprises 55 spacious cabins with 3 royal suites, elegant restaurant that offers a great and delicious variety of both Egyptian and international cuisines.
                                </p>
                                <p>
                                    The spacious lounge bar is tastefully furnished and offers international bar service with the highly trained local staff members who add the Egyptian hospitality and friendly atmosphere to guests on board.
                                </p>

                            </div>
                            <div>
                                <h2>Technical Information</h2>
                                <ul>
                                    <li>5 stars</li>
                                    <li>Length 72.35 m</li>
                                    <li>Width 14.30 m</li>
                                    <li>Height 11.60 m</li>
                                    <li>Draft 1.59 m</li>
                                    <li>4 decks +1 sun deck</li>
                                    <li>Water purification system</li>
                                    <li>Fire and sound proof walls and ceilings</li>
                                    <li>Approved by Lloyds Shipping of London</li>
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
                                    <li>En suite bathroom with shower/tub</li>
                                    <li>Hair dryer</li>
                                    <li>Individually controllable air conditioning</li>
                                    <li>Flat screen TV (marine satellite)</li>
                                    <li>Mini Bar</li>
                                    <li>Internal phone</li>
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
                                                    Day1: <span>Monday: Arrival Aswan – Cruise Embarkation</span>
                                                    <p>
                                                        Cruise embarkation before lunch. In the afternoon, we offer you a felucca trip to enjoy magnificent views of the Nile, flowing through amber desert and granite rocks, around emerald islands covered in palm groves and tropical plants. Dinner and overnight on board. Meals (L/D)
                                                    </p>
                                                </li>
                                                <li>
                                                    Day2: <span>Tuesday: Aswan Sightseeing Tour</span>
                                                    <p>
                                                        Breakfast on board. In the morning, visit Philae Temple located on Agilka Island followed by visit to the Unfinished Obelisk and the High Dam. Back to the boat. Sail to Kom Ombo. In the afternoon, visit the unusual Temple of Kom Ombo. One side of the temple is dedicated to the crocodile god Sobek, god of fertility and creator of the world. The other side is dedicated to the falcon god Haroeris, also known as Horus the Elder. Sail to Edfu. Dinner and overnight on board. Meals (B/L/D)
                                                    </p>
                                                </li>
                                                <li>
                                                    Day3: <span>Wednesday: Edfu Temple</span>
                                                    <p>
                                                        Visit Edfu Temple. Of all the temples in Egypt, the Temple of Horus at Edfu is the most completely preserved. Sail to Esna, cross the lock and sail to Luxor.  Visit Luxor Temple. Dinner and overnight on board in Luxor. Meals (B/L/D)
                                                    </p>
                                                </li>
                                                <li>
                                                    Day4: <span>Thursday: Cruise Disembarkation – Luxor Sightseeing Tour</span>
                                                    <p>
                                                        Breakfast followed by disembarkation by 8:00 am. Your tour in Luxor (frequently characterized as “the world’s greatest open air museum”) will start with the Valley of the Kings. For a period of nearly 500 years, tombs were constructed for the kings and powerful nobles of Ancient Egypt. In modern times, the valley has become famous for the discovery of the tomb of Tut Ankh Amun and is one of the most famous archaeological sites in the world. On the West Bank, you will also visit the Temple of Queen Hatshepsut and see the Colossi of Memnon. Afterwards, you will cross the Nile and visit Karnak Temple on the East Bank. Meals (B)
                                                    </p>
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
                                                    Day1: <span>Thursday: Arrival Luxor – Nile Cruise Check-In</span>
                                                    <p>
                                                        Cruise embarkation before lunch. Lunch aboard. In the afternoon, visit Luxor Temple. Dinner and overnight on board. Meals (L/D)
                                                    </p>
                                                </li>
                                                <li>
                                                    Day2: <span>Friday: Luxor East and West Bank Sightseeing</span>
                                                    <p>
                                                        Breakfast aboard. Today, your tour will start with the Valley of the Kings. For a period of nearly 500 years, tombs were constructed for the kings and powerful nobles of Ancient Egypt.  In modern times the valley has become famous for the discovery of the tomb of Tut Ankh Amun, and is one of the most famous archaeological sites in the world. On the West Bank, you will also visit the Temple of Queen Hatshepsut and see the Colossi of Memnon. Then, you will cross the Nile and visit Karnak Temple (the largest ancient religious site in the world) on the East Bank. Sail to Edfu. Lunch aboard. Dinner and overnight in Edfu. Meals (B/L/D)
                                                    </p>
                                                </li>
                                                <li>
                                                    Day3: <span>Saturday: Edfu and Kom Ombo Temples</span>
                                                    <p>
                                                        Breakfast on board. Visit Edfu Temple. Of all the temples in Egypt, the Temple of Horus at Edfu is the most completely preserved. Sail to Kom Ombo. Lunch on board. In the afternoon, visit the unusual Temple of Kom Ombo. One side of the temple is dedicated to the crocodile god Sobek, god of fertility and creator of the world. The other side is dedicated to the falcon god Haroeris, also known as Horus the Elder. Dinner and overnight on board. Meals (B/L/D)
                                                    </p>
                                                </li>
                                                <li>
                                                    Day4: <span>Sunday: Aswan Sightseeing Tou</span>
                                                    <p>
                                                        Breakfast aboard. Visit Philae Temple followed by visit to the High Dam and the Unfinished Obelisk. Lunch aboard. In the afternoon, we offer you a felucca ride to enjoy magnificent views of the Nile, flowing through amber desert and granite rocks, around emerald islands covered in palm groves and tropical plants. In the evening, explore the souk on your own, full of the scent and color of spices, perfumes, scarves and baskets. Dinner and overnight aboard. Meals (B/L/D)
                                                    </p>
                                                </li>
                                                <li>
                                                    Day5: <span>Monday: Cruise disembarkation</span>
                                                    <p>
                                                        Cruise disembarkation. Meals (B)
                                                    </p>
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
                                                    Day1: <span>Thursday: Arrival Luxor – Cruise Embarkation</span>
                                                    <p>
                                                        Cruise embarkation before lunch. Lunch aboard. In the afternoon, visit Luxor Temple. Dinner and overnight on board. Meals (L/D)
                                                    </p>
                                                </li>
                                                <li>
                                                    Day2: <span>Friday: Luxor Sightseeing Tour</span>
                                                    <p>
                                                        Breakfast aboard. Today, your tour will start with the Valley of the Kings. For a period of nearly 500 years, tombs were constructed for the kings and powerful nobles of Ancient Egypt.  In modern times the valley has become famous for the discovery of the tomb of Tut Ankh Amun, and is one of the most famous archaeological sites in the world. On the West Bank, you will also visit the Temple of Queen Hatshepsut and see the Colossi of Memnon. Then, you will cross the Nile and visit Karnak Temple (the largest ancient religious site in the world) on the East Bank. Sail to Edfu. Lunch aboard. Dinner and overnight in Edfu. Meals (B/L/D)
                                                    </p>
                                                </li>
                                                <li>
                                                    Day3: <span>Saturday: Edfu Temple</span>
                                                    <p>
                                                        Breakfast on board. Edfu Temple visit. Of all the temples in Egypt, the Temple of Horus at Edfu is the most completely preserved. Sail to Kom Ombo. Lunch on board. Sail to Aswan. Dinner and overnight on board. Meals (B/L/D)
                                                    </p>
                                                </li>
                                                <li>
                                                    Day4: <span>Sunday: Aswan Sightseeing Tour</span>
                                                    <p>
                                                        Breakfast aboard. Visit Philae Temple followed by visit to the High Dam and the Unfinished Obelisk. Lunch aboard. In the evening, explore the souk on your own, full of the scent and color of spices, perfumes, scarves and baskets. Dinner and overnight a board. Meals (B/L/D)
                                                    </p>
                                                </li>
                                                <li>
                                                    Day5: <span>Monday: Optional Excursion to Abu Simbel Temple</span>
                                                    <p>
                                                        Breakfast aboard. Day free for leisure or optional excursion to Abu Simbel. Overnight aboard. Meals (B/L/D)
                                                    </p>
                                                </li>
                                                <li>
                                                    Day6: <span>Tuesday: Felucca Ride and Kom Ombo Temple</span>
                                                    <p>
                                                        Breakfast aboard. In the morning, we offer you a felucca ride to enjoy magnificent views of the Nile, flowing through amber desert and granite rocks, around emerald islands covered in palm groves and tropical plants. Sail to Kom Ombo. Lunch aboard. In the afternoon, visit the unusual Temple of Kom Ombo. One side of the temple is dedicated to the crocodile god Sobek, god of fertility and creator of the world. The other side is dedicated to the falcon god Haroeris, also known as Horus the Elder. Sail to Edfu. Dinner and overnight on board. Meals (B/L/D)
                                                    </p>
                                                </li>
                                                <li>
                                                    Day7: <span>Wednesday: Sail to Luxor</span>
                                                    <p>
                                                        Breakfast aboard. Sail to Luxor. Lunch aboard. Arrive at Luxor. Dinner and overnight aboard. Meals (B/L/D)
                                                    </p>
                                                </li>
                                                <li>
                                                    Day8: <span>Thursday:  Nile Cruise Disembarkation</span>
                                                    <p>
                                                        Cruise disembarkation. Meals (B)
                                                    </p>
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

export default Medea;

