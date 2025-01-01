import { Fragment } from "react/jsx-runtime";
import Home from "./Pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
    return (
        <Router>
            <Fragment>
                <Routes>
                    <Route path={"/"} element={<Home />} />

                    <Route path={"*"} element={<h1>Not Found</h1>} />
                </Routes>
            </Fragment>
        </Router>
    );
}

export default App;
