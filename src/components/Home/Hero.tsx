import Navbar from "../Navbar/Navbar";
import { heroText } from "../../constants";
import { zooov_hero, sm_hero_ellipse } from "../../assets";
import { Fade } from "react-awesome-reveal";

const Hero = () => {
    return (
        <div
            className={`relative w-full bg-hero-bg bg-cover bg-center flex flex-col items-center`}
        >
            <div className="max-w-[1200px] w-full z-20">
                <div className="fixed w-full max-w-[1200px] top-0 z-[20]">
                    <Navbar />
                </div>

                <div className=" flex flex-col items-start mt-[150px] mb-44 md:mb-56 px-5">
                    <div className="z-[2] flex flex-col max-w-[410px] gap-10">
                        <div className="relative">
                            <Fade
                                direction="up"
                                damping={0.1}
                                cascade={true}
                                triggerOnce={true}
                            >
                                <h1 className=" text-white oswald font-bold text-[42px] md:text-[54px] leading-[130%] tracking-[2%]">
                                    {heroText.header}
                                </h1>
                            </Fade>

                            <img
                                src={sm_hero_ellipse}
                                alt="Pink Outline Ellipse"
                                className="absolute top-12 -left-3 md:hidden -z-[1]"
                            />
                        </div>

                        <Fade
                            direction="up"
                            damping={0.1}
                            cascade={true}
                            triggerOnce={true}
                        >
                            <p className="  text-white max-w-[227px] text-[18px] md:max-w-[362px] montserrat md:text-[20px] leading-[140%]">
                                {heroText.subHeader}
                            </p>
                        </Fade>

                        <button className="md:hover:bg-mainRedHove duration-150 max-w-56 bg-mainRed px-6 py-3 rounded-lg montserrat font-semibold text-white">
                            {heroText.btn}
                        </button>
                    </div>
                </div>
            </div>

            <img
                src={zooov_hero}
                alt="ZOOOV"
                className="absolute right-0 bottom-4 max-w-24 md:bottom-[100px] md:max-w-full"
            />
        </div>
    );
};

export default Hero;
