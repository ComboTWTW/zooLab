import { useState, useEffect } from "react";
import {
    navbar_logo,
    sm_menu_curl_left,
    sm_menu_curl_right,
} from "../../assets";
import { navLinks, heroText } from "../../constants";
import { HamburgerSqueeze } from "react-animated-burgers";
import { Fade } from "react-awesome-reveal";

interface Props {
    scrollTrigger: boolean;
}

const Navbar = ({ scrollTrigger }: Props) => {
    const [toggleBurger, setToggleBurger] = useState<boolean>(false);

    useEffect(() => {
        console.log(scrollTrigger);
    }, [scrollTrigger]);

    useEffect(() => {
        if (toggleBurger) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [toggleBurger]);

    return (
        <nav
            className={`  ${
                toggleBurger || scrollTrigger
                    ? `bg-white ${!scrollTrigger && `md:bg-transparent`}`
                    : "bg-transparent"
            }    w-full  fixed z-50  flex justify-center duration-500`}
        >
            <div className="max-w-[1200px] w-full">
                <div
                    className={`z-[11] pt-[10px] pb-[10px] px-5 flex justify-between items-center `}
                >
                    {/* Logo */}
                    <Fade
                        direction="up"
                        damping={0.1}
                        cascade={true}
                        triggerOnce={true}
                    >
                        <a href="#">
                            <img
                                src={navbar_logo}
                                alt="Navbar Logo"
                                className={` ${
                                    scrollTrigger
                                        ? `max-h-[50px] md:max-h-[60px]`
                                        : `max-h-[60px] md:max-h-[80px]`
                                } duration-500`}
                            />
                        </a>
                    </Fade>
                    {/* Navlinks Desktop */}
                    <Fade
                        direction="up"
                        damping={0.08}
                        cascade={true}
                        triggerOnce={true}
                    >
                        <ul className="hidden md:flex md:gap-8 lg:gap-[52px]">
                            {navLinks.map((link) => {
                                return (
                                    <a
                                        key={link.id}
                                        href={link.linkTo}
                                        className={`montserrat ${
                                            scrollTrigger
                                                ? `text-black duration-200`
                                                : `text-white duration-200`
                                        } hover:underline hover:decoration-mainRed duration-0  hover:decoration-[2px] hover:underline-offset-4`}
                                    >
                                        {link.tittle}
                                    </a>
                                );
                            })}
                        </ul>
                    </Fade>
                    {/* Hamburger Menu Mobile */}
                    <div className="md:hidden ">
                        <HamburgerSqueeze
                            barColor={`${
                                toggleBurger || scrollTrigger
                                    ? "black"
                                    : "white"
                            }`}
                            isActive={toggleBurger}
                            buttonStyle={{
                                padding: 0,
                            }}
                            buttonWidth={scrollTrigger ? 30 : 35}
                            toggleButton={() => setToggleBurger(!toggleBurger)}
                        />
                    </div>
                </div>
            </div>

            {/* Navlinks Mobile */}
            <div
                className={`md:hidden z-10 fixed inset-0 ${
                    toggleBurger ? "top-[70px]" : "top-[-755px]"
                } bg-white w-full flex flex-col items-center py-12 duration-500 overflow-y-auto h-[100vh]`}
            >
                <ul className="flex flex-col items-center gap-12">
                    {navLinks.map((link) => {
                        return (
                            <a
                                key={link.id}
                                href={link.linkTo}
                                className="montserrat text-black text-2xl font-medium"
                            >
                                {link.tittle}
                            </a>
                        );
                    })}
                </ul>

                <button className="z-10 min-w-12 bg-mainRed mt-16 px-12 py-3 rounded-lg montserrat font-semibold text-white mb-20">
                    {heroText.btn}
                </button>

                <img
                    src={sm_menu_curl_left}
                    alt="Mobile Menu curl at left"
                    className="absolute left-0 top-28"
                />

                <img
                    src={sm_menu_curl_right}
                    alt="Mobile Menu curl at right"
                    className="absolute right-0 top-64"
                />
            </div>
        </nav>
    );
};

export default Navbar;
