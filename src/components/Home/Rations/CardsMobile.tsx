import { rations } from "../../../constants";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Pagination } from "swiper/modules";
import { Fade } from "react-awesome-reveal";

import "swiper/css";
import "swiper/css/pagination";

import "../../../index.css";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { fetchRations } from "../../../api/getRation";
import { rationsT } from "../../../api/getRation";

const CardsMobile = () => {
    const {
        data: rationsData,
        isError,
        refetch,
        isSuccess,
        error,
    } = useQuery<rationsT>({
        queryKey: ["fetchTest"],
        queryFn: fetchRations,
    });

    useEffect(() => {
        refetch();
        isError && console.log(error.message);
        isSuccess && console.log(rationsData);
    }, []);

    return (
        <div className="flex justify-start md:justify-center min-w-[160%] sm:min-w-[180%]  slides600:max-w-full slides600:min-w-[140%] xs:min-w-[140%] xs:max-w-[140%] md:min-w-full md:max-w-full">
            <div className="overflow-hidden flex justify-start md:max-w-[1200px]  md:w-full">
                {isSuccess && (
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
                        {rationsData?.map((card, index) => {
                            return (
                                <SwiperSlide
                                    className={`overflow-hidden flex py-10 justify-center relative pl-5 xs:pr-5`}
                                >
                                    {({ isPrev, isNext }) => (
                                        <div
                                            className={`flex flex-col montserrat justify-between h-full ${
                                                isNext &&
                                                "opacity-50 sm:opacity-100"
                                            } ${
                                                isPrev &&
                                                "opacity-50 sm:opacity-100"
                                            }`}
                                        >
                                            <div className="flex flex-col montserrat items-start justify-items-start flex-grow">
                                                <div className="overflow-hidden w-full h-[60%] ">
                                                    <img
                                                        src={card.image}
                                                        alt={card.image}
                                                        className="object-fill w-full h-full"
                                                    />
                                                </div>
                                                <h4 className="font-bold leading-[130%] mt-10">
                                                    {card.title}
                                                </h4>
                                                <p className="text-addGray text-[13px] mt-1">
                                                    {card.composition}
                                                </p>
                                                <p className="text-mainGray text-[13px] leading-[140%] mt-4 max-w-[230px] line-clamp-4">
                                                    {card.description}
                                                </p>
                                                <p className="text-addGray text-[13px] mt-2">
                                                    {card.weight}
                                                </p>
                                            </div>

                                            <button className="rounded-[8px] px-9 py-3 border-solid border-mainRed border-[1px] montserrat font-semibold text-mainRed leading-[140%] mt-5  md:hover:bg-pinkHover md:hover:border-pinkHover md:duration-200">
                                                Заказать
                                            </button>
                                        </div>
                                    )}
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                )}
            </div>
        </div>
    );
};

export default CardsMobile;
