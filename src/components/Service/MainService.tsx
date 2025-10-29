
import CaseStudiesSection from '../home/CaseStudiesSection'
import ProblemSolutionSection from '../home/ProblemSolutionSection'
import ValuePropositionSection from '../home/ValuePropositionSection'
import ServicesPage from './HeroSv'

const MainService = () => {
    return (
        <>
            <ServicesPage />
            <ValuePropositionSection />
                <CaseStudiesSection/>
            <ProblemSolutionSection />
        </>
    )
}

export default MainService
