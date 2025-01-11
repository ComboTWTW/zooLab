import Home from "./Pages/Home";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { Scrollama, Step } from "react-scrollama";
import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Auth from "./Pages/Auth";
import { jwtDecode } from "jwt-decode";
import Dashboard from "./Pages/Dashboard";

function App() {
    const [auth, setAuth] = useState<boolean>(false);

    const [scrollTrigger, setScrollTriger] = useState<boolean>(false);

    const scrollCallback = () => {
        scrollTrigger ? setScrollTriger(false) : setScrollTriger(true);
    };

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                enabled: false,
            },
        },
    });
    /* True if user is signed in */
    const [isSigned, setIsSigned] = useState<boolean>(
        localStorage.getItem("authToken") ? true : false
    );

    useEffect(() => {
        // Check if the token exists in localStorage
        const token = localStorage.getItem("authToken");
        if (token) {
            setIsSigned(true);
        }
    }, []);

    /* Get path after  after 1 / in url*/
    const location = useLocation();
    const noNavbarPath = location.pathname.split("/")[1];

    return (
        <QueryClientProvider client={queryClient}>
            <div className="flex flex-col items-center overflow-hidden w-full relative">
                {noNavbarPath === "dashboard" ||
                noNavbarPath === "auth" ? null : (
                    <Navbar scrollTrigger={scrollTrigger} />
                )}

                <Scrollama offset={0} onStepEnter={scrollCallback}>
                    <Step>
                        <div
                            style={{ height: "calc(100% + 100vh)" }}
                            className="min-w-[1px]   bg-transparent bottom-0 absolute top-32 z-20"
                        ></div>
                    </Step>
                </Scrollama>

                <Scrollama
                    offset={0}
                    onStepEnter={() => setScrollTriger(false)}
                >
                    <Step>
                        <div className="min-w-[100px] min-h-[20px] bg-transparent  absolute top-0 z-20"></div>
                    </Step>
                </Scrollama>

                {/* Pages */}

                <Routes>
                    {/* Home Page */}
                    <Route path={"/"} element={<Home />} />
                    {/* Auth page */}
                    <Route path={"/auth"} element={<Auth />} />

                    {/* Private routes */}

                    <Route
                        path={"/dashboard"}
                        element={isSigned ? <Dashboard /> : <Navigate to="/" />}
                    />

                    {/* Not found route  */}
                    <Route path={"*"} element={<h1>Not Found</h1>} />
                </Routes>
            </div>
        </QueryClientProvider>
    );
}

export default App;
