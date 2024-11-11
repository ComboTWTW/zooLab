import { Fragment } from "react/jsx-runtime";
import Hero from "./components/design/Hero";
import SubHero from "./components/design/SubHero";
import Rations from "./components/Rations";
import WhyZoov from "./components/design/WhyZoov";
import LoveNCare from "./components/design/LoveNCare";
import HowToGet from "./components/HowToGet";
import FAQ from "./components/design/FAQ";
import Footer from "./components/Footer/Footer";

function App() {
    return (
        <Fragment>
            <div className="w-full overflow-hidden">
                <Hero />
                <SubHero />
                <Rations />
                <WhyZoov />
                <LoveNCare />
                <HowToGet />
                <FAQ />
                <Footer />
            </div>
        </Fragment>
    );
}

export default App;
