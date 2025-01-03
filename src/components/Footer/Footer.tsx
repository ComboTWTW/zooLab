import {
    footer_curl_top,
    footer_dog,
    footer_bacon,
    footer_apple,
    footer_curl_bot,
    whatsUp_icon,
    telegram_icon,
    footer_top_lines,
} from "../../assets";
import { Fade } from "react-awesome-reveal";
import MobileContactForm from "./MobileContactForm";

const Footer = () => {
    return (
        <footer className="w-full flex flex-col items-center mt-[74px] md:mt-[120px] bg-mainRed relative">
            <div className="max-w-[1200px] w-full px-5 mt-[65px] md:my-[43px] flex flex-col md:hidden">
                <div className="flex flex-col">
                    <Fade
                        direction="up"
                        damping={0.1}
                        cascade={true}
                        triggerOnce={true}
                    >
                        <h2 className="oswald text-white font-bold leading-[130%] tracking-[2%] text-[40px]">
                            Контакты
                        </h2>
                    </Fade>
                    <Fade
                        direction="up"
                        damping={0.1}
                        cascade={true}
                        triggerOnce={true}
                    >
                        <p className="text-white montserrat leading-[140%] mt-5">
                            Вы всегда можете с нами связаться по телефону или в
                            мессенджерах
                        </p>
                    </Fade>

                    <div className="mt-[20px]">
                        <Fade
                            direction="up"
                            damping={0.1}
                            cascade={true}
                            triggerOnce={true}
                        >
                            <a
                                href="tel:+79000000000"
                                className="montserrat font-bold leading-[140%]  text-white"
                            >
                                +7 (900) 000-00-00
                            </a>
                        </Fade>
                    </div>
                    <Fade
                        direction="up"
                        damping={0.1}
                        cascade={true}
                        triggerOnce={true}
                    >
                        <div className="flex flex-col mt-[25px] gap-4">
                            <button className="bg-[#ab4743] max-w-[223px] py-[8px] px-[10px] rounded-[2px] border-[#781410] border-[1px] border-solid">
                                <a
                                    href="#"
                                    className="flex montserrat font-medium text-[14px] leading-[140%] items-center text-white gap-[11px]"
                                >
                                    <img
                                        src={whatsUp_icon}
                                        alt="whatsUp"
                                        className=" "
                                    />
                                    <span>Написать в WhatsApp</span>
                                </a>
                            </button>
                            <button className="bg-[#ab4743] max-w-[223px] py-[8px] px-[10px] rounded-[2px] border-[#781410] border-[1px] border-solid">
                                <a
                                    href="#"
                                    className="flex montserrat font-medium text-[14px] leading-[140%] items-center text-white gap-[11px]"
                                >
                                    <img
                                        src={telegram_icon}
                                        alt="whatsUp"
                                        className=" "
                                    />
                                    <span>Написать в Telegram</span>
                                </a>
                            </button>
                        </div>

                        <p className="text-white montserrat leading-[140%] mt-8">
                            Подписывайтесь на наш{" "}
                            <a
                                href="#"
                                className="underline underline-offset-[4px]"
                            >
                                Instagram
                            </a>{" "}
                            и следите за новостями
                        </p>

                        <div className="flex flex-col mt-20">
                            <h3 className="montserrat font-semibold text-[20px] leading-[140%] text-white">
                                Остались вопросы?
                            </h3>
                            <p className="text-white montserrat leading-[140%] mt-1">
                                Напишите нам и мы обязательно подробно на них
                                ответим.
                            </p>
                        </div>
                    </Fade>

                    <div className="w-full mt-4 mb-[243px]">
                        <MobileContactForm />
                    </div>
                </div>
            </div>

            <div className="hidden max-w-[1200px] w-full md:flex flex-col items-center">
                <div className="flex flex-col  text-center">
                    <Fade
                        direction="up"
                        damping={0.1}
                        cascade={true}
                        triggerOnce={true}
                    >
                        <h2 className="oswald font-bold text-[46px]  text-white py-[45px]">
                            ZOOOV
                        </h2>
                    </Fade>
                    <Fade
                        direction="up"
                        damping={0.1}
                        cascade={true}
                        triggerOnce={true}
                    >
                        <p className="montserrat font-medium mt-[-18px] text-white text-[20px]">
                            Питание, которое полюбит ваш хвостик
                        </p>
                    </Fade>
                    <Fade
                        direction="up"
                        damping={0.1}
                        cascade={true}
                        triggerOnce={true}
                    >
                        <ul className="flex gap-[35px] justify-center mt-[40px]">
                            <a href="">
                                <img
                                    src={telegram_icon}
                                    alt="whatsUp"
                                    className=" min-w-[35px]"
                                />
                            </a>

                            <a href="">
                                <img
                                    src={whatsUp_icon}
                                    alt="whatsUp"
                                    className=" min-w-[35px]"
                                />
                            </a>
                            <a href="">
                                <img
                                    src={telegram_icon}
                                    alt="whatsUp"
                                    className=" min-w-[35px]"
                                />
                            </a>
                            <a href="">
                                <img
                                    src={whatsUp_icon}
                                    alt="whatsUp"
                                    className=" min-w-[35px]"
                                />
                            </a>
                        </ul>
                    </Fade>
                </div>
            </div>

            <div className="w-full bg-[#69120E] py-8 hidden md:flex justify-center text-[18px] mt-[44px] z-[2]  ">
                <Fade
                    direction="up"
                    damping={0.1}
                    cascade={true}
                    triggerOnce={true}
                >
                    <p className="text-white montserrat ">©2024</p>
                </Fade>
            </div>

            <div className="w-full  bg-[#69120E] py-8 flex flex-col items-start justify-start text-[18px] mt-[44px] z-[2] md:hidden px-4">
                <Fade
                    direction="up"
                    damping={0.1}
                    cascade={true}
                    triggerOnce={true}
                >
                    <p className=" montserrat text-[16px]  text-[#a5716e] mb-6">
                        ИП Коваленко Евгений Геннадьевич ИНН784215731801, адрес
                        производства г. Санкт-Петербург 17-я линия В.О 66, пом.
                        2/07
                    </p>
                    <div className="flex flex-col gap-2">
                        <a
                            className="montserrat text-[16px]  text-[#a5716e] "
                            href="#"
                        >
                            Публичная оферта
                        </a>
                        <a
                            className="montserrat text-[16px]  text-[#a5716e] "
                            href="#"
                        >
                            Политика конфеденциальности
                        </a>
                    </div>
                </Fade>
            </div>
            {/*  */}
            <img
                src={footer_curl_top}
                alt="Curl at the right coner"
                className="absolute -top-[118px] right-0 md:hidden"
            />

            <img
                src={footer_top_lines}
                alt="3 lines next to the curl"
                className="absolute md:hidden top-24 right-7"
            />

            <img
                src={footer_dog}
                alt="Dog"
                className="absolute md:hidden top-[200px] right-4 max-h-[110px]"
            />

            <img
                src={footer_bacon}
                alt="Dog"
                className="absolute md:hidden top-[420px] right-4 max-h-[110px]"
            />

            <img
                src={footer_curl_bot}
                alt="curvy line at the bottom"
                className="absolute md:hidden bottom-28 min-h-[320px] right-0 "
            />

            <img
                src={footer_apple}
                alt="Apple"
                className="absolute md:hidden  left-4 slides600:left-20 bottom-[320px] max-h-[110px]"
            />
        </footer>
    );
};

export default Footer;
