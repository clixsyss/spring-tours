import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CRUISES = [
    {
        id: "sphinx-1",
        title: "S/S Sphinx",
        description:
            "Spring Tours started building Nile boats 33 years ago. With every boat built, a new feature or design was added to achieve not only the elegance in style but also the maximum comfort we need for our valued guests. In 2021, Spring Tours inaugurated the Super Ship Sphinx.",
        imageClass: "cruise-card-1",
        path: "/cruises/s-s-sphinx",
    },
    {
        id: "sphinx-2",
        title: "M/S Medea",
        description:
            "This boat has been completely reconstructed in 2024 with complete overhaul of all engines, generators and air conditioning system. The new lavish furniture not only ensures the maximum comfort but a combination of stunning colors that add to the serenity and sophistication of this 5 star Nile boat.",
        imageClass: "cruise-card-2",
        path: "/cruises/m-s-medea",
    },
    {
        id: "sphinx-3",
        title: "M/S Miriam",
        description:
            "The MS Miriam cruise boat was completely overhauled in 2023 to reflect both the unique style of Egyptian hospitality combined with  the contemporary comforts and luxury amenities of modern river cruise boats, all while maintaining our attention to eco-friendliness.",
        imageClass: "cruise-card-3",
        path: "/cruises/m-s-miriam",
    },
    {
        id: "sphinx-4",
        title: "M/S Tosca",
        description:
            "Luxury Defined. Inaugurated in 2009, M/ S Tosca offers old world elegance and sophistication blend in perfect harmony with modern amenities and comforts.This vessel is decorated by the renowned interior design team responsible for furnishing the prestigious, ",
        imageClass: "cruise-card-4",
        path: "/cruises/m-s-tosca",
    },
    {
        id: "sphinx-5",
        title: "M/S La Traviata",
        description:
            "M/S La Traviata has proved be a long term favorite with many regular Nile cruise guests.The cozy restaurant on the lower deck serves 88 guests and serves both – international and Egyptian cuisine. Lounge bar with dance floor and music system for evening entertainment.",
        imageClass: "cruise-card-5",
        path: "/cruises/m-s-la-traviata",
    },
    {
        id: "sphinx-6",
        title: "S/S Karim",
        description:
            "Built in 1917, this historic vessel was originally used by King Fuad I of Egypt and then by his son King Farouk. After the Egyptian revolution, the S/S Karim was used by the state and hosted President Gamal Abd El Nasser and later on President Anwar Al Sadat and his wife Gihan. ",
        imageClass: "cruise-card-6",
        path: "/cruises/s-s-sphinx",
    },
    {
        id: "sphinx-7",
        title: "Dahabiyaa Judi",
        description:
            "There is no better way to explore the beauty of the Nile than onboard a Dahabiyya, a comfortable Egyptian sailing boat with two sails. Europeans have been travelling the Nile with these traditional boats since the 19th century. It has a crew of 10.",
        imageClass: "cruise-card-7",
        path: "/cruises/s-s-sphinx",
    },
];

const CRUISE_INDEX_BY_ID = CRUISES.reduce((acc, cruise, index) => {
    acc[cruise.id] = index;
    return acc;
}, {});
function CruiseShips() {
    const navigate = useNavigate();
    const [activeCruiseIndex, setActiveCruiseIndex] = useState(0);

    const currentCruise = CRUISES[activeCruiseIndex];
    const orderedCruises = [
        ...CRUISES.slice(activeCruiseIndex),
        ...CRUISES.slice(0, activeCruiseIndex),
    ];

    const goToCruise = (cruise) => {
        navigate(cruise.path);
    };

    const changeCruise = (direction) => {
        setActiveCruiseIndex((prev) => {
            const lastIndex = CRUISES.length - 1;
            if (direction === "left") {
                return prev === 0 ? lastIndex : prev - 1;
            }
            return prev === lastIndex ? 0 : prev + 1;
        });
    };
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
                                const originalIndex = CRUISE_INDEX_BY_ID[cruise.id];

                                return (
                                    <button
                                        key={cruise.id}
                                        type="button"
                                        className={`cruise-card ${cruise.imageClass} ${isActive ? "is-active" : ""}`}
                                        onClick={() =>
                                            setActiveCruiseIndex(
                                                typeof originalIndex === "number" ? originalIndex : 0
                                            )
                                        }
                                        aria-label={cruise.title}
                                    />
                                );
                            })}
                        </div>
                        <div className="cruises-dots">
                            {CRUISES.map((cruise, index) => (
                                <button
                                    key={`${cruise.id}-dot`}
                                    type="button"
                                    className={`cruise-dot ${index === activeCruiseIndex ? "is-active" : ""
                                        }`}
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
