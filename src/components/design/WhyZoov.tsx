import { whyZoov } from "../../constants";
import { whyZoovCurl, whyZoovCurl2, whyZoovDots } from "../../assets";
import { Fade } from "react-awesome-reveal";

const WhyZoov = () => {
    return (
        <div className="w-full flex justify-center mt-[65px] md:mt-28">
            <div className="max-w-[1200px] w-full flex justify-center px-5">
                <div className="w-full flex flex-col items-start">
                    {/* Header  */}
                    <div className="relative">
                        <Fade
                            direction="up"
                            damping={0.1}
                            cascade={true}
                            triggerOnce={true}
                        >
                            <h2 className="oswald text-[40px] font-bold leading-[140%] tracking-[2%] text-start">
                                {whyZoov.headerText}
                            </h2>
                        </Fade>

                        <img
                            src={whyZoovDots}
                            alt="Dots Around Header"
                            className="absolute left-[237px] sm:left-[243px] top-[38px] md:hidden"
                        />
                    </div>
                    {/* List */}
                    <div className="w-full relative mt-12 md:mt-16">
                        <Fade
                            direction="up"
                            damping={0.1}
                            cascade={true}
                            triggerOnce={true}
                        >
                            {" "}
                            <ul className="  flex flex-col md:flex-row gap-10 md:justify-between md2:justify-start md2:gap-48">
                                {whyZoov.list.map((item, index) => {
                                    return (
                                        <li
                                            key={item.header}
                                            className="  flex flex-col items-start"
                                        >
                                            <div className="relative">
                                                <img
                                                    src={item.image}
                                                    alt="Point Image"
                                                    className="relative"
                                                />
                                                {/* First Curl (Above natural) */}
                                                <img
                                                    src={whyZoovCurl}
                                                    alt="List background curl line"
                                                    className={`absolute ${
                                                        index === 0
                                                            ? "min-w-[100vw] left-[-20px] top-[-20px] z-[-1] max-h-[300px]"
                                                            : "hidden"
                                                    } md:hidden`}
                                                />
                                                {/* Second Curl (Below Smiley ) */}
                                                <img
                                                    src={whyZoovCurl2}
                                                    alt="List background curl line"
                                                    className={`absolute ${
                                                        index === 3
                                                            ? "min-w-[100vw] bottom-[-6px] left-[-20px] z-[-1] max-h-[300px]"
                                                            : "hidden"
                                                    } md:hidden`}
                                                />
                                                {/* Smiley Dots */}
                                                <img
                                                    src={whyZoovDots}
                                                    alt="Dots Around Smiley"
                                                    className={`absolute md:hidden ${
                                                        index === 3
                                                            ? "rotate-[-75deg] top-[-14px] right-[-14px]"
                                                            : "hidden"
                                                    }`}
                                                />
                                            </div>

                                            <h3 className="montserrat font-semibold text-lg leading-[130%] mt-4">
                                                {item.header}
                                            </h3>
                                            <p className="montserrat max-w-[450px]  leading-[140%] mt-2 md:hidden">
                                                {item.subHeader}
                                            </p>
                                        </li>
                                    );
                                })}
                            </ul>
                        </Fade>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhyZoov;
