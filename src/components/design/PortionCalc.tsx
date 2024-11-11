import { calc_curl } from "../../assets";
import { rationCalc } from "../../constants";
import { Fade } from "react-awesome-reveal";

const PortionCalc = () => {
    return (
        <div className="relative w-full flex justify-center">
            <div className="max-w-[1200px] w-full  px-4  flex flex-col items-center justify-center mt-14 md:mt-20 mb-20">
                <div className="w-full bg-pinkHover  py-8 px-7 md:py-14 md:pl-12 md:pr-12 lg:pr-[120px] flex flex-col md:flex-row items-center  md:items-center gap-7 md:gap-20  lg:gap-36 ">
                    <Fade
                        direction="up"
                        damping={0.2}
                        cascade={true}
                        triggerOnce={true}
                    >
                        <p className="montserrat  md:max-w-[680px] z-[2] font-medium text-xl md:text-[28px] leading-[140%] text-center md:text-start">
                            {rationCalc.text}
                        </p>
                    </Fade>

                    <button className="montserrat font-semibold z-[2] text-white leading-[140%] rounded-[8px] bg-mainRed px-11 py-4 md:hover:bg-mainRedHove md:duration-200">
                        <Fade
                            direction="up"
                            damping={0.2}
                            cascade={true}
                            triggerOnce={true}
                        >
                            <span>{rationCalc.buttonText}</span>
                        </Fade>
                    </button>
                </div>
            </div>

            <img
                src={calc_curl}
                alt="Background curly line"
                className="calcCurlMobile absolute  md:top-[20%] md:max-w-[150%]  lg:top-[23%] lg:max-w-[100%]"
            />

            {/* <img
                src={calc_curl}
                alt="Background curly line"
                className="absolute top-[14%] left-[4%] min-w-[300%] slides600:min-w-[200%] slides600:top-[17%] slides600:left-[2%]  md: md:min-w-[130%] "
            /> */}
        </div>
    );
};

export default PortionCalc;
