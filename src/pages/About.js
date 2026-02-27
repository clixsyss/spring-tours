function About() {
    return (
        <div>
            <div className="content-container">
                <div className="about-banner">
                    <h1>About Us</h1>
                </div>

                <div className="history-container">
                    <h1>Spring Tours History</h1>
                    <div className="history-content">
                        <div>
                            <img src={require('../assets/about01.png')} alt="Spring Tours History" />
                        </div>
                        <div>
                            <p>Spring Tours is one of the leading receptive travel companies in Egypt founded in 1975 (license no. 149). The management has always been highly keen to  organize big events which have dramatically  changed the way the world perceived Egypt as a tourist destination  like Aida Opera in Luxor in 1987, the first charter flight to ever land in Hurghada on the Red Sea and building The Giftun Tourist Village that started a new concept in leisure travel in the Red Sea.
                                Spring Tours pioneered the concept of opening an office in Sharm El Sheikh, which was an area barely known on the touristic  map. Other branch offices had  already been established in Luxor and Aswan in addition to those in the other new areas and destinations that were starting to be prominent like Marsa Alam, Taba and Dahab.</p>
                        </div>
                        <div>
                            <p>The company built its own residence houses for the staff members in these remote areas to guarantee their comfort, which reflects positively on their attitude with guests.
                                Spring Tours started building its own 5-star Nile cruise ships in 1989, which have become now 6 ships + 1 dahabiyya then bought private docking areas in Luxor and Aswan to ensure guests’ privacy and comfort.
                                The management has always been active in participating in the major travel fairs all over the world and also participating in offering feedback to the government tourist departments concerned to deliver the best services to travelers in Egypt.</p>
                        </div>
                        <div>
                            <img src={require('../assets/about02.png')} alt="Spring Tours History" />
                        </div>

                    </div>
                </div>

                <div className='mission-vision-container'>
                    <h1>Egypt's Most Trusted Name in Travel</h1>
                    <div className="mission-vision-content">
                        <div className="mission-container">
                            <div className="container-image">
                                <img src={require('../assets/mission.png')} alt="Spring Tours Vision" />
                            </div>
                            <h2>Our Mission</h2>
                            <p>Spring Tours mission is to “Be the best in the eyes of our guests, employees, and partners”. Guided by the relentless focus on providing value experience to our guests in Egypt, we constantly strive to implement the initiatives required to achieve our vision to make a difference and create a value.</p>
                        </div>
                        <div className="vision-container">
                            <div className="container-image">
                                <img src={require('../assets/vision.png')} alt="Spring Tours Vision" />
                            </div>
                            <h2>Our Vision</h2>
                            <p>We focus to deliver operational excellence for our guests in every site in Egypt and meet or exceed their expectations. All of our long-term strategies and short-term actions are molded by a set of core values learned along 45 years that are shared by each and every associate.</p>
                        </div>
                    </div>
                </div>


                <div className="history-container">
                    <h1>President's Message</h1>
                    <div className="history-content">
                        <div>
                            <p>
                                When we started Spring Tours over 45 years ago, the Egyptian travel industry was still in its infancy, with almost no established schools or institutions to provide us with adequately qualified staff members, information sources, or connections to the global travel industry.
                                <br />
                                Despite how difficult it was to build a leading travel company from the ground up with such lack of essential resources, this gave us a single-minded focus to achieve our main goal: meticulous attention to the smallest details to ensure a trouble-free vacation for our guests. To attain this objective, the most logical path to us at Spring Tours was to invest in ambitious, enthusiastic and hardworking people who now form the main asset of the company.
                            </p>
                        </div>
                        <div>
                            <img src={require('../assets/about03.png')} alt="Spring Tours History" />
                        </div>
                        <div>
                            <img src={require('../assets/about04.png')} alt="Spring Tours History" />
                        </div>
                        <div>
                            <p>
                                Hospitality in Egypt is exceptionally important and part of the Egyptian personality. We simply apply this in Spring Tours. Although applying such a cherished value to a very competitive market was not easy, we are proud to say that our team members treat our guests as if they were home.
                                With more travelers coming to Egypt every year, we constantly find new ways and promote awareness on environmental conservation, sustaining our national treasures for generations.
                                <br />
                                Egypt is a fascinating and unique example of long, rich history. We are looking forward to welcoming you in Egypt, and hope we will be able to share some of the country's treasures, magic and charm with you.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;