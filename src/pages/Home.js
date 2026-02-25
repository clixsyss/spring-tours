import { useRef } from "react";
import { FaClock, FaArrowLeft, FaArrowRight } from "react-icons/fa";

import logo from "../assets/logo.webp";
import verynile from "../assets/home/verynile.png";

const PLAN_CARDS = [
    { id: "plan1", title: "Egypt Express", imageClass: "plan-card-1" },
    { id: "plan2", title: "Coptic / Islamic Culture", imageClass: "plan-card-2" },
    { id: "plan3", title: "City Breaks", imageClass: "plan-card-3" },
    { id: "plan4", title: "Red Sea Beach Break", imageClass: "plan-card-4" },
    { id: "plan5", title: "Cultural Heritage", imageClass: "plan-card-5" },
    { id: "plan6", title: "Egypt Express", imageClass: "plan-card-1" },
    { id: "plan7", title: "Coptic / Islamic Culture", imageClass: "plan-card-2" },
    { id: "plan8", title: "City Breaks", imageClass: "plan-card-3" },
    { id: "plan9", title: "Red Sea Beach Break", imageClass: "plan-card-4" },
    { id: "plan10", title: "Cultural Heritage", imageClass: "plan-card-5" },
];

function Home() {
    const planCarouselRef = useRef(null);

    const scrollPlanCarousel = (direction) => {
        const el = planCarouselRef.current;
        if (!el) return;
        const cardWidth = el.querySelector(".plan-carousel-item")?.offsetWidth ?? 320;
        const gap = 24;
        const scrollAmount = (cardWidth + gap) * (direction === "left" ? -1 : 1);
        el.scrollBy({ left: scrollAmount, behavior: "smooth" });
    };

    return (
        <div className="home">
            <div className="hero">
                <h1>Experience Makes The Difference</h1>
                <h2>- Since 1975 -</h2>
            </div>

            <div className="gap"></div>

            <div className="content-container">
                <div className="destinations-container">
                    <h1>Top Destinations</h1>
                    <div className="destinations-list">
                        <div className="destination-item">
                            <div className="destination-item-content">
                                <h4>Nile Meets the Mediterranean Sea</h4>
                                <div className="destination-item-description">
                                    <p> <span><FaClock size={16} /></span> 3 Days 2 Nights</p>
                                    <button className="btn">Explore More</button>
                                </div>
                            </div>
                        </div>
                        <div className="destination-item">
                            <div className="destination-item-content">
                                <h4>4-night Cruise Luxor - Aswan</h4>
                                <div className="destination-item-description">
                                    <p> <span><FaClock size={16} /></span> 5 Days 4 Nights</p>
                                    <button className="btn">Explore More</button>
                                </div>
                            </div>
                        </div>
                        <div className="destination-item">
                            <div className="destination-item-content">
                                <h4>A little Bit Off The Beaten Track</h4>
                                <div className="destination-item-description">
                                    <p> <span><FaClock size={16} /></span> 10 Days 9 Nights</p>
                                    <button className="btn">Explore More</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="right-side-button"> <button className="btn">Explore All Destinations</button> </div>
                </div>

                <div className="plan-container">
                    <h1>Plan Your Holidays</h1>
                    <div className="plan-carousel-wrapper">
                        <button
                            type="button"
                            className="plan-carousel-arrow plan-carousel-arrow-left"
                            onClick={() => scrollPlanCarousel("left")}
                            aria-label="Previous"
                        >
                            <FaArrowLeft size={20} />
                        </button>
                        <button
                            type="button"
                            className="plan-carousel-arrow plan-carousel-arrow-right"
                            onClick={() => scrollPlanCarousel("right")}
                            aria-label="Next"
                        >
                            <FaArrowRight size={20} />
                        </button>
                        <div className="plan-carousel-track" ref={planCarouselRef}>
                            {PLAN_CARDS.map((card) => (
                                <div
                                    key={card.id}
                                    className={`plan-carousel-item ${card.imageClass}`}
                                >
                                    <div className="plan-carousel-item-overlay">
                                        <h4>{card.title}</h4>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="collaboration-container">
                <h1>Our Collaboration</h1>

                <div className="collaboration-content">
                    <div className="collaboration-list">
                        <img src={verynile} alt="collaboration02" />
                        <img src={logo} alt="collaboration01" className="collaboration-image"/>
                    </div>

                    <div>
                        <h2>Cleaning the Nile, one kilo at a time!</h2>
                        <p>VeryNile is the first initiative to develop sustainable means to clean the Nile while raising awareness on the importance of protecting our environment. VeryNile interlaces social and environmental impact and develops eco-friendly solutions to remove inorganic waste from the river.
                            As the Greek historian Herodotus said “Egypt is the gift of the Nile”… Therefore, Spring Tours management decided to partner with VeryNile to support their great cause, especially that we use the Nile in our tours…</p>
                    </div>
                </div>
            </div>

            <div className="content-container">
                <div className="testimonials-container">
                    <h1>Hear From Our Happy Travelers</h1>
                </div>
            </div>
        </div>
    );
}

export default Home;