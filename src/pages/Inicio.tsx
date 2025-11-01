import Header from '../components/Header'
import Hero from '../components/Hero'
import IntroHighlights from '../components/IntroHighlights'
import HowItWorks from '../components/HowItWorks'
import ExperienceInfo from '../components/ExperienceInfo'
import FeaturedProjects from '../components/FeaturedProjects'
import News from '../components/News'
import About from '../components/About'
import Footer from '../components/Footer'

export default function Inicio() {
  return (
    <div className="nebula-container min-h-screen">
      <div className="bg-nebula"></div>
      <div className="bg-stars"></div>
      <div className="relative z-10 min-h-screen">
        <Header />
        <Hero />
        <IntroHighlights />
        <HowItWorks />
        <ExperienceInfo />
        <FeaturedProjects />
        <News />
        <About />
        <Footer />
      </div>
    </div>
  )
}


