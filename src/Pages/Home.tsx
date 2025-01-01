import Hero from "../components/Home/Hero";
import SubHero from "../components/Home/SubHero";
import Rations from "../components/Home/Rations";
import WhyZoov from "../components/Home/WhyZoov";
import LoveNCare from "../components/Home/LoveNCare";
import HowToGet from "../components/Home/HowToGet";
import FAQ from "../components/Home/FAQ";
import Footer from "../components/Footer/Footer";

const Home = () => {
    return (
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
    );
};

export default Home;
