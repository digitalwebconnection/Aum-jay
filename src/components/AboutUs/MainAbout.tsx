import ComparisonTableSection from "./ComparisonTableSection";
import DealerProgramSection from "./DealerProgramSection";
import InteractiveProductShowcase from "./InteractiveProductShowcase";
import AboutHero from "./HeroAb";
import SolarSystemChooser from "./SolarSystemChooser";

export default function MainAbout() {
    return (
        <>
            <AboutHero />
            <ComparisonTableSection />
            <InteractiveProductShowcase />
            <DealerProgramSection />
            <SolarSystemChooser/>
        </>
    )
}