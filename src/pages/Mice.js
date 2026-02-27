import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const MICE_MEDIA = [
    { id: "mice-1", imageClass: "mice-media-1" },
    { id: "mice-2", imageClass: "mice-media-2" },
    { id: "mice-3", imageClass: "mice-media-3" },
    { id: "mice-4", imageClass: "mice-media-4" },
    { id: "mice-5", imageClass: "mice-media-5" },
    { id: "mice-6", imageClass: "mice-media-6" },
    { id: "mice-7", imageClass: "mice-media-7" },
    { id: "mice-8", imageClass: "mice-media-8" },
    { id: "mice-9", imageClass: "mice-media-9" },
    { id: "mice-10", imageClass: "mice-media-10" },
    { id: "mice-11", imageClass: "mice-media-11" },
];

function Mice() {
    const [activeIndex, setActiveIndex] = useState(0);

    const currentItem = MICE_MEDIA[activeIndex];

    const changeSlide = (direction) => {
        setActiveIndex((prev) => {
            const lastIndex = MICE_MEDIA.length - 1;
            if (direction === "left") {
                return prev === 0 ? lastIndex : prev - 1;
            }
            return prev === lastIndex ? 0 : prev + 1;
        });
    };

    return (
        <div>
            <div className="content-container">

                <div className="mice-media-container">
                    <div className={`mice-media-main ${currentItem.imageClass}`}>
                        <div className="mice-media-title">M.I.C.E</div>
                    </div>

                    <div className="mice-media-thumbs-wrapper">
                        <button
                            type="button"
                            className="mice-media-arrow mice-media-arrow-left"
                            onClick={() => changeSlide("left")}
                            aria-label="Previous media"
                        >
                            <FaArrowLeft size={18} />
                        </button>
                        <div className="mice-media-thumbs-track">
                            {MICE_MEDIA.map((item, index) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    className={`mice-media-thumb ${item.imageClass} ${index === activeIndex ? "is-active" : ""
                                        }`}
                                    onClick={() => setActiveIndex(index)}
                                    aria-label={`MICE media ${index + 1}`}
                                />
                            ))}
                        </div>
                        <button
                            type="button"
                            className="mice-media-arrow mice-media-arrow-right"
                            onClick={() => changeSlide("right")}
                            aria-label="Next media"
                        >
                            <FaArrowRight size={18} />
                        </button>
                    </div>
                </div>

                <div className="mice-content-container">
                    <h1>M.I.C.E</h1>
                    <h2>Meetings, Incentive, Conferences and Exhibitions</h2>
                    <p>
                        <b>Something 'bigger and better'</b> is the perpetual conference organizer's conundrum. Fortunately, there are still plenty of unique ideas out there for those groups who think they have ‘done it all’. Spring Tours as an innovative company has caught the attention of conference organizers throughout the world. We specialize in designing exclusive events for conference and incentive groups.
                    </p>
                    <p>
                        When the expression M.I.C.E. was not even created, Spring Tours was already arranging events:
                        <b>The first ever in Egypt staged Aida-Opera</b> was entirely prepared & arranged by Spring Tours.
                    </p>
                    <p>
                        Due to the steadily increasing demand on this sector, a M.I.C.E. department was established. Accounts handled have been various and from all over the world such as: from Germany
                        <b>Daimler Chrysler, Kraft/Suchard and alltours Sommerauftakt 2024. Donauland & AWD </b>(Austria).
                        <b>Gunter Sachs </b>(Switzerland). From the US: <b>Butler Corporation, Metropolitan Museum NYC, Ebenstein, Soros Group, Travcorp</b> (US/UK/Switzerland). Asian accounts handled so far: <b>ICI paints & Bajaj Allianz</b> (India),
                        <b>ING Insurances </b>(Malaysia) and many more. We arrange trips for “Royalties & V.I.P.'s” out of the UK, Thailand, Singapore, Germany, Austria & Spain. Furthermore Spring Tours handles the top accounts of the Embassies of India, Singapore, Thailand, Germany, and Austria in Cairo.
                    </p>
                </div>
            </div>

        </div>
    );
}

export default Mice;