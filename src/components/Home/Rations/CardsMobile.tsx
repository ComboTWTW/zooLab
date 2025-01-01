import { rations } from "../../../constants";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Pagination } from "swiper/modules";
import { Fade } from "react-awesome-reveal";

import "swiper/css";
import "swiper/css/pagination";

import "../../../index.css";

const CardsMobile = () => {
    return (
        <div className="flex justify-start md:justify-center min-w-[160%] sm:min-w-[180%]  slides600:max-w-full slides600:min-w-[140%] xs:min-w-[140%] xs:max-w-[140%] md:min-w-full md:max-w-full">
            <div className="overflow-hidden flex justify-start md:max-w-[1200px] md:w-full">
                <Swiper
                    style={{
                        "--swiper-pagination-color": "#961914",
                        "--swiper-pagination-bullet-size": "8px",

                        borderRadius: 8,
                    }}
                    slidesPerView={2}
                    spaceBetween={10}
                    pagination={{
                        clickable: true,
                        dynamicBullets: false,

                        renderBullet: function (index, className) {
                            return (
                                '<span class="dot swiper-pagination-bullet pag">' +
                                "</span>"
                            );
                        },
                    }}
                    loop={true}
                    navigation={false}
                    autoplay={false}
                    modules={[Pagination, Autoplay]}
                    className="mySwiper w-full flex justify-center "
                    breakpoints={{
                        460: {
                            slidesPerView: 3,
                            spaceBetween: 10,
                        },
                        600: {
                            slidesPerView: 3,
                            spaceBetween: 0,
                        },
                        620: {
                            slidesPerView: 3,
                            spaceBetween: 0,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 0,
                        },
                        1100: {
                            slidesPerView: 4,
                            spaceBetween: 0,
                        },
                    }}
                >
                    {rations.portions.map((card, index) => {
                        return (
                            <SwiperSlide
                                className={`overflow-hidden flex justify-center relative pl-5 xs:pr-5 `}
                            >
                                {({ isPrev, isNext }) => (
                                    <div
                                        className={`flex flex-col montserrat items-start ${
                                            isNext &&
                                            "opacity-50 sm:opacity-100"
                                        } ${
                                            isPrev &&
                                            "opacity-50 sm:opacity-100"
                                        }`}
                                    >
                                        <img
                                            src={card.image}
                                            alt={card.image}
                                            className=""
                                        />
                                        <h4 className=" font-bold leading-[130%] mt-10">
                                            {card.header}
                                        </h4>
                                        <p className="text-addGray text-[13px] mt-1">
                                            {card.subHeader}
                                        </p>

                                        <p className="text-mainGray text-[13px] leading-[140%] mt-4 max-w-[230px]">
                                            {card.text}
                                        </p>

                                        <p className="text-addGray text-[13px] mt-2">
                                            {card.mass}
                                        </p>

                                        <button className="rounded-[8px] mt-5 px-9 py-3 border-solid border-mainRed border-[1px] montserrat font-semibold text-mainRed leading-[140%] mb-[60px] md:hover:bg-pinkHover md:hover:border-pinkHover md:duration-200">
                                            {card.buttonText}
                                        </button>
                                    </div>
                                )}
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </div>
    );
};

export default CardsMobile;
