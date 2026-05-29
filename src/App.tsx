import { LightboxProvider } from './components/LightboxContext'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { SkillsSection } from './components/SkillsSection'
import { ProjectsSection } from './components/ProjectsSection'
import { Footer } from './components/Footer'
import { Lightbox } from './components/Lightbox'
import { ScrollProgress } from './components/ScrollProgress'
import { ScrollToTop } from './components/ScrollToTop'
import { RevealSection } from './components/RevealSection'

function App() {
  return (
    <LightboxProvider>
      <ScrollProgress />
      <Navbar />
      <Hero />
      <main>
        <RevealSection>
          <SkillsSection />
        </RevealSection>
        <RevealSection delay={100}>
          <ProjectsSection />
        </RevealSection>
      </main>
      <Footer />
      <Lightbox />
      <ScrollToTop />
    </LightboxProvider>
  )
}

export default App
