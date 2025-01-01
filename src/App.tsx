import Home from "./Pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

function App() {
    return (
        <Router>
            <div className="flex flex-col items-center overflow-hidden w-full ">
                <Navbar />
                <Routes>
                    <Route path={"/"} element={<Home />} />

                    <Route path={"*"} element={<h1>Not Found</h1>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
