import Calculator from "./Calculator";
import FAQSection from "./Faq";
import HeroHm from "./HeroHm";
import HighlightsSection from "./HighlightsSection";
import ImpactNumbersSection from "./ImpactNumbersSection";
import Scroll from "./Scroll";
import TestimonialsSection from "./TestimonialsSection";
import TwoPathsSection from "./TwoPathsSection";


export default function HomeMain() {
    return (
        <>
            <HeroHm />
            <HighlightsSection />
            <Scroll />
            <ImpactNumbersSection />
            <TwoPathsSection />
            <Calculator />
            <TestimonialsSection />
            <FAQSection />
        </>
    )
}