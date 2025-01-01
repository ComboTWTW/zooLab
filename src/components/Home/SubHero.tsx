import { subHeroImage } from "../../assets";
import { subHeroText } from "../../constants";
import { calc_curl } from "../../assets";
import { Fade } from "react-awesome-reveal";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import "../../index.css";

const SubHero = () => {
    return (
        <div className="w-full mt-20 md:mt-36 flex items-center flex-col">
            <div className="px-5 max-w-[1200px] w-full flex flex-col md:items-start md:flex-row md:justify-between md:gap-7 overflow-hidden">
                <div className="md:max-w-[540px] xs:min-w-[300px] md:mt-4 lg:mt-10 flex flex-col gap-7 ">
                    <Fade
                        direction="up"
                        damping={0.1}
                        cascade={true}
                        triggerOnce={true}
                    >
                        <h2 className="oswald font-bold text-[40px] md:text-[46px] text-black">
                            {subHeroText.header}
                        </h2>
                    </Fade>

                    <Fade
                        direction="up"
                        damping={0.08}
                        cascade={true}
                        triggerOnce={true}
                    >
                        <p className="text-mainGray">{subHeroText.text}</p>

                        <h3 className="montserrat text-[18px] font-semibold">
                            {subHeroText.header2}
                        </h3>
                    </Fade>

                    <Fade
                        direction="up"
                        damping={0.08}
                        cascade={true}
                        triggerOnce={true}
                    >
                        <ul className="flex flex-col gap-5   marker:text-mainRed   ">
                            {subHeroText.dots.map((value) => {
                                return (
                                    <li className="text-mainGray montserrat list-disc list-outside pl-1 ml-4 leading-[150%] ">
                                        <span className="">{value}</span>
                                    </li>
                                );
                            })}
                        </ul>
                    </Fade>
                </div>
                {/* Image */}
                <img
                    src={subHeroImage}
                    alt="Dog's eating meat"
                    className="md:object-scale-down max-w-[100%] min-w-[50%] mt-7 md:mt-0 z-[2]"
                />
                {/* Portions Mobile */}
                <div className="relative max-w-full bg-pinkHover flex flex-col items-center px-10 md:hidden pt-14 pb-5 mb-10">
                    <Swiper
                        style={{
                            "--swiper-pagination-color": "#961914",
                            "--swiper-pagination-bullet-size": "8px",
                            borderRadius: 8,
                        }}
                        slidesPerView={1}
                        spaceBetween={70}
                        pagination={{
                            clickable: true,
                            dynamicBullets: false,
                        }}
                        loop={true}
                        navigation={false}
                        autoplay={{
                            delay: 2500,
                        }}
                        modules={[Pagination, Autoplay]}
                        className="mySwiper w-full z-[2]"
                    >
                        {subHeroText.portions.map((card) => {
                            return (
                                <SwiperSlide>
                                    <div key={card.header} className="">
                                        <h3 className="montserrat text-sm font-semibold uppercase">
                                            {card.header}
                                        </h3>
                                        <ul className="mt-7 flex flex-col gap-5 pb-14">
                                            {card.portions.map((portion) => {
                                                return (
                                                    <li
                                                        key={portion.text}
                                                        className="text-mainGray capitalize montserrat font-medium text-lg "
                                                    >
                                                        <span className="flex gap-3">
                                                            <img
                                                                src={
                                                                    portion.icon
                                                                }
                                                                alt={
                                                                    portion.text
                                                                }
                                                            />
                                                            {portion.text}
                                                        </span>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>

                    <img
                        src={calc_curl}
                        alt="Curly Line"
                        className="absolute rotate-90   top-[-385%] min-h-[1000%] max-w-[395%] z-1 opacity-45 slides600:max-w-[200%]"
                    />
                </div>
            </div>
            {/* Portions Desktop */}
            <div className="w-full max-w-[1200px] px-4">
                <div className="hidden md:visible w-full max-w-[1200px]  bg-pinkHover md:flex justify-center items-center py-12 px-6 md:px-10 lg:px-20 mt-36">
                    <div className="flex flex-col w-full gap-10">
                        {subHeroText.portions.map((card) => {
                            return (
                                <div className="flex flex-col items-start gap-2">
                                    <Fade
                                        direction="up"
                                        damping={0.08}
                                        cascade={true}
                                        triggerOnce={true}
                                    >
                                        <h3 className="montserrat text-sm font-semibold uppercase">
                                            {card.header}
                                        </h3>
                                    </Fade>

                                    <Fade
                                        direction="up"
                                        damping={0.08}
                                        cascade={true}
                                        triggerOnce={true}
                                    >
                                        <ul className="mt-4 flex gap-2">
                                            {card.portions.map(
                                                (portion, index) => {
                                                    return (
                                                        <li
                                                            key={portion.text}
                                                            className="text-mainGray  montserrat font-medium lowercase first:capitalize tracking-wide"
                                                        >
                                                            <span className="flex gap-3 md:text-[15px] lg:text-base">
                                                                <img
                                                                    className={`${
                                                                        index !==
                                                                            0 &&
                                                                        "hidden"
                                                                    }`}
                                                                    src={
                                                                        portion.icon
                                                                    }
                                                                    alt={
                                                                        portion.text
                                                                    }
                                                                />
                                                                <span className="">
                                                                    {
                                                                        portion.text
                                                                    }
                                                                    <span
                                                                        className={`${
                                                                            index ===
                                                                                card
                                                                                    .portions
                                                                                    .length -
                                                                                    1 &&
                                                                            "hidden"
                                                                        }`}
                                                                    >
                                                                        ,
                                                                    </span>
                                                                </span>
                                                            </span>
                                                        </li>
                                                    );
                                                }
                                            )}
                                        </ul>
                                    </Fade>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubHero;
