import { LightboxProvider } from './components/LightboxContext'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { SkillsSection } from './components/SkillsSection'
import { ProjectsSection } from './components/ProjectsSection'
import { Footer } from './components/Footer'
import { Lightbox } from './components/Lightbox'

function App() {
  return (
    <LightboxProvider>
      <Navbar />
      <Hero />
      <main>
        <SkillsSection />
        <ProjectsSection />
      </main>
      <Footer />
      <Lightbox />
    </LightboxProvider>
  )
}

export default App
