import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { dashBopardNavLink } from "../constants";
import HomeIcon from "@mui/icons-material/Home";
import QuizIcon from "@mui/icons-material/Quiz";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LogoutIcon from "@mui/icons-material/Logout";
import Products from "../components/dashboard/Products/Products";

interface DecodedToken {
    id: number;
    username: string;
    role: string;
    exp: number;
}

const Dashboard = () => {
    const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            try {
                const decoded: DecodedToken = jwtDecode(token);
                setDecodedToken(decoded);
            } catch (error) {
                console.error("Invalid token", error);
            }
        }
    }, []);

    /* Navigate to default query if query is empty (just /dashboard) */
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const menu = searchParams.get("menu");

        if (!menu) {
            // If no 'menu' query parameter, update the URL
            navigate(`${location.pathname}?menu=products&p=1`, {
                replace: true,
            });
        }
    }, []);

    const getIcon = (type: string) => {
        if (type === "products") {
            return <HomeIcon />;
        } else if (type === "questions") {
            return <QuizIcon />;
        } else if (type === "orders") {
            return <CalendarMonthIcon />;
        }
    };

    const logoutButton = () => {
        localStorage.removeItem("authToken");
        navigate(0);
    };

    return (
        <div className="w-full flex relative justify-center">
            <div className="w-full flex max-w-[1920px]">
                {decodedToken !== null && (
                    <div className="min-h-screen bg-[#212529] min-w-[200px] flex flex-col px-6 pt-4 tracking-wider">
                        <h2 className="montserrat text-white font-semibold text-2xl mt-4 ">
                            Admin Dashboard
                        </h2>
                        <p className="montserrat text-white font-semibold text-xl mt-2 ">
                            Role:{" "}
                            <span className="capitalize">
                                {decodedToken.role}
                            </span>
                        </p>
                        {/* Menu */}
                        <div className="flex flex-col mt-4 min-w-[80%] w-full  ">
                            <div className="w-full bg-white min-h-[2px] "></div>
                            <ul className="mt-4  montserrat text-white flex flex-col gap-4">
                                {dashBopardNavLink.map((link) => {
                                    return (
                                        <NavLink
                                            to={link.linkTo}
                                            reloadDocument={false}
                                            key={link.type}
                                        >
                                            <li
                                                className={`py-2 px-2 flex items-center gap-2 ${
                                                    new URLSearchParams(
                                                        location.search
                                                    ).get("menu") ===
                                                        link.type &&
                                                    "bg-blue-700 rounded-[5px]"
                                                }`}
                                            >
                                                {getIcon(link.type)}{" "}
                                                {link.title}
                                            </li>
                                        </NavLink>
                                    );
                                })}
                            </ul>
                        </div>
                        <button
                            className={`py-2 montserrat  mt-44 px-2 flex items-center gap-2 text-white`}
                            onClick={() => logoutButton()}
                        >
                            {
                                <LogoutIcon
                                    style={{
                                        color: "white",
                                    }}
                                />
                            }{" "}
                            Выйти
                        </button>
                    </div>
                )}

                <div className="w-full mx-4">
                    {new URLSearchParams(location.search).get("menu") ===
                        "products" && <Products />}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
