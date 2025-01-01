import { howGet_arrow } from "../../assets";
import { howGet } from "../../constants";
import { Fade } from "react-awesome-reveal";

const HowToGet = () => {
    return (
        <div className="md:hidden w-full flex justify-center mt-[92px]">
            <div className="max-w-[1200px] w-full flex justify-center px-5">
                <div className="flex flex-col">
                    <Fade
                        direction="up"
                        damping={0.1}
                        cascade={true}
                        triggerOnce={true}
                    >
                        <h2 className="oswald font-bold text-[40px] leading-[130%] tracking-[2%]">
                            {howGet.header}
                        </h2>
                    </Fade>
                    {/* list */}
                    <div className="relative w-full flex flex-row justify-between mt-10 gap-[22px]">
                        <img
                            src={howGet_arrow}
                            alt="TopDown Arrow"
                            className="relative max-h-[92%] top-[70px] opacity-100"
                        />

                        <Fade
                            direction="up"
                            damping={0.1}
                            cascade={true}
                            triggerOnce={true}
                        >
                            <ul className="flex flex-col gap-12">
                                {howGet.list.map((item, index) => {
                                    return (
                                        <li className="flex flex-col items-start">
                                            <img
                                                src={item.icon}
                                                alt="Point icon"
                                            />
                                            <h3 className="montserrat text-lg font-semibold leading-[130%] mt-6">
                                                {item.header}
                                            </h3>
                                            <p className="montserrat leading-[140%] mt-3">
                                                {item.text}{" "}
                                                <span>
                                                    <a
                                                        className={`${
                                                            index !== 0 &&
                                                            "hidden"
                                                        } text-mainRed underline underline-offset-[4px]`}
                                                        href="#"
                                                    >
                                                        мы подскажем
                                                    </a>
                                                    .
                                                </span>
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

export default HowToGet;
