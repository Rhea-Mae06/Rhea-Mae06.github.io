import { useEffect, useState } from 'react'
import profileImage from '../images/profile.jpg'
import medicalImage from '../images/online-doctor-and-calendar-medical-booking.jpg'
import boardingImage from '../images/bh.png'
import regexImage from '../images/RegEx_game.jpg'
import lexicalImage from '../images/Lexical_Analizer.jpg'

const projects = [
  { title: 'Medical Booking App', desc: 'A convenient appointment-booking application that helps patients find doctors, schedule consultations, and manage healthcare visits in one place.', tags: ['Healthcare', 'Appointment Booking', 'Mobile App', 'UI/UX'], image: medicalImage },
  { title: 'Boarding House Management System', desc: 'A management system for handling boarding house rooms, tenant records, rental payments, and availability in one organized platform.', tags: ['Management System', 'Tenant Records', 'Room Booking', 'UI/UX'], image: boardingImage },
  { title: 'RegEx Game', desc: 'An interactive game that makes regular expressions easier to learn through pattern-matching challenges and instant feedback.', tags: ['JavaScript', 'Regular Expressions', 'Game Design', 'Learning Tool'], image: regexImage },
  { title: 'Lexical Analyzer', desc: 'A tool that reads source code and breaks it into meaningful tokens, helping users understand the first stage of compiler design.', tags: ['JavaScript', 'Compiler Design', 'Tokenization', 'Programming'], image: lexicalImage },
]

const services = [
  ['Web Development', 'Responsive, accessible, performant websites built from scratch.'],
  ['Full-Stack Systems', 'End-to-end apps from database schema to polished front end.'],
  ['UI/UX Design', 'Interfaces designed for clarity first, delight second.'],
  ['Database Design', 'Normalized schemas and CRUD systems that hold up under load.'],
  ['API Integration', 'Connecting services cleanly with REST and third-party APIs.'],
  ['Desktop & Mobile', 'C#/.NET desktop tools and Flutter cross-platform apps.'],
]

function SectionHeading({ number, children }) {
  return <div className="section-head reveal"><span className="section-tag">{number}</span><h2>{children}</h2></div>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [workOpen, setWorkOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showTop, setShowTop] = useState(false)
  const [phrase, setPhrase] = useState('')

  useEffect(() => {
    const phrases = ['compilers.', 'full-stack systems.', 'premium interfaces.', 'things that ship.']
    let phraseIndex = 0
    let characterIndex = 0
    let deleting = false
    let timer
    const tick = () => {
      const current = phrases[phraseIndex]
      characterIndex += deleting ? -1 : 1
      setPhrase(current.slice(0, characterIndex))
      if (!deleting && characterIndex === current.length) {
        deleting = true
        timer = setTimeout(tick, 1500)
        return
      }
      if (deleting && characterIndex === 0) {
        deleting = false
        phraseIndex = (phraseIndex + 1) % phrases.length
      }
      timer = setTimeout(tick, deleting ? 35 : 65)
    }
    tick()
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(max ? (window.scrollY / max) * 100 : 0)
      setShowTop(window.scrollY > 700)
      const sections = [...document.querySelectorAll('main section[id]')]
      const current = sections.reduce((value, section) => window.scrollY >= section.offsetTop - 220 ? section.id : value, 'home')
      setActiveSection(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('in-view')), { threshold: 0.12 })
    document.querySelectorAll('.reveal').forEach(element => observer.observe(element))
    onScroll()
    return () => { window.removeEventListener('scroll', onScroll); observer.disconnect() }
  }, [])

  const closeMenu = () => setMenuOpen(false)
  const navLink = (id, label) => <a className={activeSection === id ? 'active' : ''} href={`#${id}`} onClick={closeMenu}>{label}</a>

  return <>
    <div className="loader"><strong>RB</strong><span /></div>
    <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
    <div className="bg-mesh"><i className="orb orb-one" /><i className="orb orb-two" /><i className="orb orb-three" /></div>

    <nav className="navbar">
      <a className="nav-logo" href="#home">Rhea</a>
      <div className="nav-links">
        {navLink('home', 'Home')}{navLink('about', 'About')}
        <div className={`dropdown ${workOpen ? 'open' : ''}`}>
          <button onClick={() => setWorkOpen(!workOpen)} aria-expanded={workOpen}>Work <span>⌄</span></button>
          <div className="dropdown-menu">{projects.map(project => <a key={project.title} href="#work" onClick={() => setWorkOpen(false)}>{project.title}</a>)}</div>
        </div>
        {navLink('contact', 'Contact')}
      </div>
      <button className={`nav-burger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu"><i /><i /><i /></button>
    </nav>
    <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>{navLink('home', 'Home')}{navLink('about', 'About')}{navLink('work', 'Work')}{navLink('contact', 'Contact')}</div>

    <main>
      <section className="hero" id="home"><div className="hero-inner"><div>
        <p className="eyebrow"><span className="live-dot" /> Available for opportunities · Tangub City, PH</p>
        <h1>Hi, I'm <span className="gradient">Rhea Bustamante</span><br />I build <span className="typed">{phrase}</span></h1>
        <p className="hero-desc">BS Computer Science student crafting compilers, full-stack systems, and interfaces engineered to feel expensive. I care about the pixel and the parser equally.</p>
        <a className="button" href="#work">View Projects</a>
      </div><div className="portrait"><div><img src={profileImage} alt="Portrait of Rhea Mae Bustamante" /></div></div></div><a className="scroll-cue" href="#about">↓<small>Scroll</small></a></section>

      <section id="about"><SectionHeading number="01 — About">The person behind the <span className="gradient">syntax tree</span></SectionHeading><div className="about-grid"><div className="copy reveal"><p className="lead">I'm a Computer Science student who treats software like a craft, not a checklist. Somewhere between debugging a lexer at 2am and refining a border-radius by two pixels, I found the work I actually want to do for a living.</p><p>My focus sits at the intersection of <b>systems programming</b> and <b>interface design</b> — I like understanding a problem from the token stream up, then wrapping the solution in something people enjoy using.</p><p>Off-screen, I'm based in Tangub City, Misamis Occidental, chasing feasible ideas that can actually ship.</p></div><div className="info-card reveal"><h3>Quick Info</h3>{[['Name', 'Rhea Mae'], ['Role', 'Software Engineer'], ['Study', 'BS Computer Science'], ['School', 'Tangub City Global College'], ['Address', 'Bintana, Tangub City'], ['Email', 'rheamaeb17@gmail.com']].map(item => <p key={item[0]}><span>{item[0]}</span><strong>{item[1]}</strong></p>)}</div></div></section>

      <section id="work"><SectionHeading number="02 — Selected Work">Things I've <span className="gradient">built & shipped</span></SectionHeading><div className="projects">{projects.map((project, index) => <article className="project reveal" key={project.title}><div className="project-image"><img src={project.image} alt={project.title} /></div><div className="project-body"><small>Project 0{index + 1}</small><h3>{project.title}</h3><p>{project.desc}</p><div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><a href="https://github.com/Rhea-Mae06" target="_blank" rel="noreferrer">View Code ↗</a></div></article>)}</div></section>

      <section id="services"><SectionHeading number="03 — What I Do">Where I can <span className="gradient">help</span></SectionHeading><div className="services">{services.map(([title, desc], index) => <article className="service reveal" key={title}><small>0{index + 1}</small><h3>{title}</h3><p>{desc}</p></article>)}</div></section>

      <section id="contact"><div className="contact reveal"><span className="section-tag">04 — Contact</span><h2>Let's build something <span className="gradient">worth remembering.</span></h2><p>Open to internships, junior roles, freelance projects, and thesis collaborations. I usually reply within a day.</p><div className="contact-info"><a href="mailto:rheamaeb17@gmail.com"><span>Email</span><b>rheamaeb17@gmail.com</b></a><a href="tel:+639706733910"><span>Phone</span><b>09706733910</b></a><div><span>Address</span><b>Bintana, Tangub City, Misamis Occidental</b></div></div><div className="socials">{['GitHub', 'Facebook', 'Google', 'Instagram', 'TikTok'].map(name => <a href="https://github.com/Rhea-Mae06" key={name} target="_blank" rel="noreferrer">{name}</a>)}</div></div></section>
    </main>
    <footer>© {new Date().getFullYear()} Rhea Mae. Designed and built from scratch, pixel by pixel.</footer>
    <button className={`back-top ${showTop ? 'show' : ''}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">↑</button>
  </>
}

export default App
