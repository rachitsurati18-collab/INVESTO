import { useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import TrustStrip from './components/TrustStrip.jsx'
import Calculator from './components/Calculator.jsx'
import Framework from './components/Framework.jsx'
import Services from './components/Services.jsx'
import SampleReport from './components/SampleReport.jsx'
import { Deliverables, Expectations, Grievances } from './components/Sections.jsx'
import FAQ from './components/FAQ.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import './App.css'

export default function App() {
  // Shared FORT selection keeps the homepage towers and the process section in sync.
  const [activeWall, setActiveWall] = useState('F')
  const [service, setService] = useState('')

  return (
    <>
      <Header />
      <main>
        <Hero active={activeWall} onSelect={setActiveWall} />
        <TrustStrip />
        <Framework active={activeWall} onSelect={setActiveWall} />
        <Services onEnquire={setService} />
        <Calculator />
        <SampleReport />
        <Deliverables />
        <Expectations />
        {/* How to Join (Onboarding in Sections.jsx) is hidden for now — add <Onboarding /> back here to show it */}
        <Grievances />
        <FAQ />
        <Contact service={service} onService={setService} />
      </main>
      <Footer />
    </>
  )
}
