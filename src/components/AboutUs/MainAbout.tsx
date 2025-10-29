import ComparisonTableSection from "../home/ComparisonTableSection";
import DealerProgramSection from "../home/DealerProgramSection";
import InteractiveProductShowcase from "../home/InteractiveProductShowcase";
import AboutHero from "./HeroAb";

export default function MainAbout() {
    return (
        <>
            <AboutHero />
            <ComparisonTableSection />
            <InteractiveProductShowcase />
            <DealerProgramSection />
        </>
    )
}