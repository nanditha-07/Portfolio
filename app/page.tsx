'use client'

import { useState } from 'react'
import { ArrowUpRight, Check, GitBranch, Mail, Menu, Network, X } from 'lucide-react'

const portrait = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Aug%2026%2C%202026%2C%2010_12_18%20AM-foUaBFVnRgmyX1wwLovKYcM58eehzv.png'

const navItems = [
  ['Home', '#home'],
  ['About', '#about'],
  ['Skills', '#skills'],
  ['Learning Journey', '#learning'],
  ['Contact', '#contact'],
]

export default function Page() {
  const [open, setOpen] = useState(false)
  const [sent, setSent] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries(new FormData(form))) })
    if (response.ok) { setSent(true); form.reset() }
  }

  return (
    <main className="site-shell">
      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="Nanditha Nair home">NN<span>.</span></a>
        <nav className={open ? 'nav-links is-open' : 'nav-links'} aria-label="Main navigation">
          {navItems.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
        </nav>
        <a className="header-contact" href="#contact">Let&apos;s connect <ArrowUpRight size={15} /></a>
        <button className="menu-button" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </header>

      <section id="home" className="hero section-pad">
        <div className="hero-copy reveal">
          <p className="eyebrow"><span className="status-dot" /> Open to learning &amp; growth</p>
          <h1>Building skills.<br /><em>Solving problems.</em><br />Learning continuously.</h1>
          <p className="hero-intro">I&apos;m Nanditha, a Computer Science Engineering student curious about technology, thoughtful problem solving, and the craft of building meaningful software.</p>
          <div className="hero-actions"><a className="button button-primary" href="#about">About me <ArrowUpRight size={17} /></a><a className="button button-quiet" href="#contact">Get in touch <ArrowUpRight size={17} /></a></div>
        </div>
        <div className="hero-portrait reveal delay-one"><div className="portrait-frame"><img src={portrait} alt="Portrait of Nanditha Nair" /></div><div className="portrait-note">Computer Science<br />Engineering student <span>↗</span></div></div>
        <div className="scroll-cue">Scroll to explore <span>↓</span></div>
      </section>

      <section id="about" className="about section-pad section-rule">
        <div className="section-label">01 / About</div>
        <div className="about-layout"><div className="about-heading"><p className="eyebrow">A little about me</p><h2>Curious by nature.<br /><em>Consistent by choice.</em></h2></div><div className="about-copy"><p>I am a Computer Science Engineering student at Anurag University, interested in problem solving, software development, AI-powered applications, and continuous learning.</p><p>I enjoy learning new technologies, strengthening my programming fundamentals, and building meaningful software solutions. Right now, I am focused on improving my understanding of Java, Data Structures, and problem-solving skills.</p><div className="education-line"><span>Education</span><strong>B.Tech in Computer Science Engineering<br />Anurag University</strong></div></div></div>
      </section>

      <section id="skills" className="skills section-pad section-rule"><div className="section-label">02 / Skills</div><div className="section-heading"><h2>Foundations I&apos;m <em>building.</em></h2><p>A focused toolkit, growing with intention.</p></div><div className="skills-grid"><article className="skill-card"><span className="card-index">01</span><h3>Programming<br />Languages</h3><ul><li>C</li><li>Java <small>Basic</small></li><li>Python <small>Basic</small></li></ul></article><article className="skill-card skill-card-accent"><span className="card-index">02</span><h3>Core<br />Concepts</h3><ul><li>Data Structures</li><li>Problem Solving</li></ul></article></div></section>

      <section id="learning" className="learning section-pad section-rule"><div className="section-label">03 / Learning journey</div><div className="learning-layout"><div><h2>Currently <em>learning.</em></h2><p className="learning-lead">The best work starts with strong fundamentals. These are the areas receiving my attention right now.</p></div><div className="learning-list">{['Java', 'Data Structures', 'Problem Solving'].map((item, i) => <div className="learning-item" key={item}><span>0{i + 1}</span><strong>{item}</strong><span className="learning-state">In focus <i /></span></div>)}</div></div><div className="philosophy"><span>Learning philosophy</span><p>Continuous learning is a practice, not a destination. I believe in showing up consistently, asking better questions, and improving one step at a time.</p></div></section>

      <section id="contact" className="contact section-pad section-rule"><div className="section-label">04 / Contact</div><div className="contact-layout"><div><h2>Let&apos;s start a<br /><em>conversation.</em></h2><p>Have a question, an opportunity, or simply want to say hello? I&apos;d love to hear from you.</p><div className="social-links"><a href="mailto:nanditha.nair@example.com"><Mail size={17} /> Email <ArrowUpRight size={14} /></a><a href="https://github.com" target="_blank" rel="noreferrer"><GitBranch size={17} /> GitHub <span className="placeholder">Update URL</span></a><a href="https://linkedin.com" target="_blank" rel="noreferrer"><Network size={17} /> LinkedIn <span className="placeholder">Update URL</span></a></div></div><form className="contact-form" onSubmit={handleSubmit}><label>Name<input required name="name" placeholder="Your name" /></label><label>Email<input required type="email" name="email" placeholder="you@example.com" /></label><label>Message<textarea required name="message" rows={4} placeholder="Tell me a little about your message..." /></label><button className="button button-primary" type="submit">{sent ? <><Check size={17} /> Message ready</> : <>Send message <ArrowUpRight size={17} /></>}</button>{sent && <p className="form-success">Thanks — your message has been received.</p>}</form></div></section>

      <footer><span>© 2026 Nanditha Nair</span><span>Designed &amp; built with curiosity.</span><a href="#home">Back to top ↑</a></footer>
    </main>
  )
}
