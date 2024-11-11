import {
    footer_curl_top,
    footer_dog,
    footer_bacon,
    footer_apple,
    footer_curl_bot,
    whatsUp_icon,
    telegram_icon,
} from "../../assets";
import { Fade } from "react-awesome-reveal";

const Footer = () => {
    return (
        <footer className="w-full flex flex-col items-center mt-[74px] md:mt-[120px] bg-mainRed">
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

                    <Fade
                        direction="up"
                        damping={0.1}
                        cascade={true}
                        triggerOnce={true}
                    >
                        <a
                            href="tel:+79000000000"
                            className="montserrat font-bold leading-[140%] mt-[35px] text-white"
                        >
                            +7 (900) 000-00-00
                        </a>
                    </Fade>

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

                        <p className="text-white montserrat leading-[140%] mt-5">
                            Подписывайтесь на наш{" "}
                            <a
                                href="#"
                                className="underline underline-offset-[4px]"
                            >
                                Instagram
                            </a>{" "}
                            и следите за новостями
                        </p>

                        <div className="flex flex-col mt-14">
                            <h3 className="montserrat font-semibold text-[20px] leading-[140%] text-white">
                                Остались вопросы?
                            </h3>
                            <p className="text-white montserrat leading-[140%] mt-1">
                                Напишите нам и мы обязательно подробно на них
                                ответим.
                            </p>
                        </div>
                    </Fade>

                    <form action="post"></form>
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

            <div className="w-full bg-[#69120E] py-8 flex justify-center text-[18px] mt-[44px]">
                <Fade
                    direction="up"
                    damping={0.1}
                    cascade={true}
                    triggerOnce={true}
                >
                    <p className="text-white montserrat">©2024 ZOOOV</p>
                </Fade>
            </div>
        </footer>
    );
};

export default Footer;
