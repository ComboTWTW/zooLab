import { LoveCare } from "../../constants";
import { loveCare_pic, whyZoovDots, loveCurl, loveCurlSm } from "../../assets";
import { Fade } from "react-awesome-reveal";

const LoveNCare = () => {
    return (
        <div className="w-full relative flex justify-center mt-20 md:mt-32 bg-pinkLight ">
            <div className="max-w-[1200px] w-full md:px-5 py-16 md:py-20 flex flex-col items-center bg-pinkLight  relative md:flex-row-reverse   md:justify-between gap-20 md:gap-18">
                {/* Text Block */}
                <div className=" flex flex-col  px-5 md:px-0">
                    {/* Header */}

                    <Fade
                        direction="up"
                        damping={0.1}
                        cascade={true}
                        triggerOnce={true}
                    >
                        <h2 className="oswald font-bold text-[40px] leading-[130%] tracking-[2%] md:text-[46px] z-[2]">
                            С заботой и{" "}
                            <span className="relative">
                                <span>любовью</span>{" "}
                                <img
                                    src={whyZoovDots}
                                    alt="Dots round header"
                                    className="absolute bottom-[-12px] right-[-15px] hidden md:inline"
                                />
                            </span>{" "}
                            <br className="hidden md:inline" />
                            <span className="relative">
                                от
                                <span className=""> Zooov</span>
                                <img
                                    src={whyZoovDots}
                                    alt="Dots round header"
                                    className="absolute right-[-17px] rotate-[-90deg] top-[-2px] md:hidden"
                                />
                            </span>
                        </h2>
                    </Fade>

                    {/* Paragraph */}
                    <Fade
                        direction="up"
                        damping={0.1}
                        cascade={true}
                        triggerOnce={true}
                    >
                        <ul className="flex flex-col mt-8 md:mt-10 gap-8 z-[2]">
                            {LoveCare.text.map((text) => {
                                return (
                                    <li>
                                        <p className="montserrat text-mainGray leading-[130%] max-w-[523px]">
                                            {text}
                                        </p>
                                    </li>
                                );
                            })}
                        </ul>
                    </Fade>
                </div>
                {/* Pic */}

                <img
                    src={loveCare_pic}
                    alt="Dogs"
                    className="z-[2] relative w-full h-auto pl-5 md:pl-0 max-h-[745px] max-w-[556px] md:pr-0 md:top-[-15%] md2:top-0"
                />
            </div>

            <img
                src={loveCurl}
                alt=""
                className="absolute left-0 bottom-0  hidden lg:inline"
            />
            <img
                src={loveCurlSm}
                alt=""
                className="absolute bottom-0 min-w-[100vw] md:hidden opacity-45"
            />
        </div>
    );
};

export default LoveNCare;
