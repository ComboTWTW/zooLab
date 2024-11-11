import { rations_sm_curl } from "../assets";
import { rations } from "../constants";
import PortionCalc from "./design/PortionCalc";
import CardsMobile from "./Rations/CardsMobile";
import { Fade } from "react-awesome-reveal";

const Rations = () => {
    return (
        <div className="w-full flex flex-col items-center mt-28 md:mt-48">
            <div className="px-5 max-w-[1200px] w-full flex flex-col">
                {/* Ration Header */}
                <div className="flex relative gap-[85px]">
                    <Fade
                        direction="up"
                        damping={0.1}
                        cascade={true}
                        triggerOnce={true}
                    >
                        <h2 className="oswald font-bold text-[40px] text-nowrap leading-[140%] md:text-[46px]">
                            {rations.header.headerText}
                        </h2>
                    </Fade>

                    <Fade
                        direction="up"
                        damping={0.2}
                        cascade={true}
                        triggerOnce={true}
                    >
                        {" "}
                        <p className=" hidden md:block montserrat leading-[140%] line-clamp-3">
                            {rations.header.subHeader}
                        </p>
                    </Fade>

                    <img
                        src={rations_sm_curl}
                        alt="Curl around Zoooc text"
                        className="absolute left-[150px] -top-[5px] -z-10 md:hidden"
                    />
                </div>

                {/* CardsMobile */}
            </div>

            <div className="mt-16 w-full  flex flex-col items-center overflow-hidden">
                <div className="w-full overflow-hidden md:flex md:justify-center">
                    <CardsMobile />
                </div>

                <PortionCalc />
            </div>
        </div>
    );
};

export default Rations;
