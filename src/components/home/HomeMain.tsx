// import BottomCTASection from "./BottomCTASection";
import HeroHm from "./HeroHm";
import HighlightsSection from "./HighlightsSection";
import ImpactNumbersSection from "./ImpactNumbersSection";
import InteractiveProductShowcase from "./InteractiveProductShowcase";
import Scroll from "./Scroll";
import TestimonialsSection from "./TestimonialsSection";
import TwoPathsSection from "./TwoPathsSection";
import ValuePropositionSection from "./ValuePropositionSection";

export default function HomeMain() {
    return(
        <>
        <HeroHm/>
        <HighlightsSection/>
        <TwoPathsSection/>
        <InteractiveProductShowcase/>
        <ImpactNumbersSection/>
        <Scroll/>
        <ValuePropositionSection/>
        <TestimonialsSection/>
        {/* <BottomCTASection/> */}

        </>
    )
}