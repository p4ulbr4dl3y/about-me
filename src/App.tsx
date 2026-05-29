import { LightboxProvider } from './components/LightboxContext'
import { Hero } from './components/Hero'
import { SkillsSection } from './components/SkillsSection'
import { ProjectsSection } from './components/ProjectsSection'
import { Lightbox } from './components/Lightbox'
import { ScrollToTop } from './components/ScrollToTop'
import { RevealSection } from './components/RevealSection'

function App() {
  return (
    <LightboxProvider>
      <main>
        <RevealSection>
          <Hero />
        </RevealSection>
        <RevealSection delay={100}>
          <SkillsSection />
        </RevealSection>
        <RevealSection delay={100}>
          <ProjectsSection />
        </RevealSection>
      </main>
      <Lightbox />
      <ScrollToTop />
    </LightboxProvider>
  )
}

export default App
