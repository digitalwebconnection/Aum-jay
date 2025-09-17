// import BottomCTASection from "./BottomCTASection";
import Calculator from "./Calculator";
import CaseStudiesSection from "./CaseStudiesSection";
import ComparisonTableSection from "./ComparisonTableSection";
import DealerProgramSection from "./DealerProgramSection";
import FAQSection from "./Faq";
import HeroHm from "./HeroHm";
import HighlightsSection from "./HighlightsSection";
import ImpactNumbersSection from "./ImpactNumbersSection";
import InteractiveProductShowcase from "./InteractiveProductShowcase";
import ProblemSolutionSection from "./ProblemSolutionSection";
import ProjectGallerySection from "./ProjectGallerySection";
import Scroll from "./Scroll";
import TestimonialsSection from "./TestimonialsSection";
import TwoPathsSection from "./TwoPathsSection";
import ValuePropositionSection from "./ValuePropositionSection";

export default function HomeMain() {
    return(
        <>
        <HeroHm/>
        <HighlightsSection/>
        <Scroll/>
        <ValuePropositionSection/>
        <ProblemSolutionSection/>
        <ImpactNumbersSection/>
        <ProjectGallerySection/>
        <TwoPathsSection/>
        <InteractiveProductShowcase/>
        <DealerProgramSection/>
        <ComparisonTableSection/>
        <CaseStudiesSection/>
        <Calculator/>
        <TestimonialsSection/>
        <FAQSection/>
        {/* <BottomCTASection/> */}

        </>
    )
}