import { useEffect, useRef } from 'react'
import { SmoothScroll } from './animations/SmoothScroll'
import { useRevealAnimations } from './animations/useRevealAnimations'
import { ScrollTrigger } from './animations/gsap'
import { SectionProvider } from './hooks/useActiveSection'
import { Header } from './components/Header'
import { ConstellationNav } from './components/ConstellationNav'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Skills } from './sections/Skills'
import { Akron } from './sections/akron/Akron'
import { Certificates } from './sections/Certificates'
import { GitHubSection } from './sections/GitHub'
import { Contact } from './sections/Contact'
import { Footer } from './sections/Footer'

export default function App() {
  const mainRef = useRef<HTMLElement>(null)
  useRevealAnimations(mainRef)

  // Abrir o site com um endereço como ".../#certificados" leva direto à seção.
  useEffect(() => {
    const { hash } = window.location
    if (!hash) return
    const timer = window.setTimeout(() => {
      document.querySelector(hash)?.scrollIntoView()
      ScrollTrigger.refresh()
    }, 200)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <SmoothScroll>
      <SectionProvider>
        <a href="#conteudo" className="skip-link">
          Pular para o conteúdo
        </a>
        <Header />
        <ConstellationNav />
        <main id="conteudo" ref={mainRef} tabIndex={-1}>
          <Hero />
          <About />
          <Skills />
          <Akron />
          <Certificates />
          <GitHubSection />
          <Contact />
        </main>
        <Footer />
      </SectionProvider>
    </SmoothScroll>
  )
}
