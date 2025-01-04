import Home from "./Pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { Scrollama, Step } from "react-scrollama";
import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
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

    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <div className="flex flex-col items-center overflow-hidden w-full relative">
                    <Navbar scrollTrigger={scrollTrigger} />
                    <Scrollama offset={0} onStepEnter={scrollCallback}>
                        <Step>
                            <div
                                style={{ height: "calc(100% + 100vh)" }}
                                className="min-w-[100px]   bg-transparent bottom-0 absolute top-32 z-20"
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
                        <Route path={"/"} element={<Home />} />

                        <Route path={"*"} element={<h1>Not Found</h1>} />
                    </Routes>
                </div>
            </Router>
        </QueryClientProvider>
    );
}

export default App;
