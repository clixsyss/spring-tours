import { FaClock } from "react-icons/fa";

function Home() {
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
            </div>
        </div>
    );
}

export default Home;