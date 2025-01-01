import { useState } from "react";
import {
    navbar_logo,
    sm_menu_curl_left,
    sm_menu_curl_right,
} from "../../assets";
import { navLinks, heroText } from "../../constants";
import { HamburgerSqueeze } from "react-animated-burgers";
import { Fade } from "react-awesome-reveal";
import { Scrollama, Step } from "react-scrollama";

const Navbar = () => {
    const [toggleBurger, setToggleBurger] = useState<boolean>(false);
    const [rectMoving, setRectMoving] = useState(false);

    return (
        <nav
            className={`  ${
                toggleBurger ? "bg-white md:bg-transparent" : "bg-transparent"
            }  h-[70px] md:h-[100px] duration-500  `}
            onScroll={() => {
                setRectMoving(true);
            }}
        >
            <div className="z-[11] pt-[10px] pb-[10px] px-5 flex justify-between items-center">
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
                            className="max-h-[60px] md:max-h-[80px]"
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
                                    className="montserrat text-white hover:underline hover:decoration-mainRed hover:udn hover:decoration-[2px] hover:underline-offset-4"
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
                        barColor={`${toggleBurger ? "black" : "white"}`}
                        isActive={toggleBurger}
                        buttonStyle={{
                            padding: 0,
                        }}
                        buttonWidth={35}
                        toggleButton={() => setToggleBurger(!toggleBurger)}
                    />
                </div>
            </div>

            {/* Navlinks Mobile */}
            <div
                className={`md:hidden z-10 absolute right-0 left-0 ${
                    toggleBurger ? "top-[70px]" : "top-[-755px]"
                } bg-white w-full flex flex-col items-center py-12 duration-500`}
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

                <button className="z-10 min-w-12 bg-mainRed mt-24 px-12 py-3 rounded-lg montserrat font-semibold text-white">
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
