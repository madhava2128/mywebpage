'use client';

import { useState, useEffect } from 'react';
import ProfileCard from '@/components/ProfileCard';
import PillNav from '@/components/PillNav';
import FlowingMenu from '@/components/FlowingMenu';
import CardSwap, { Card } from '@/components/CardSwap';
import ScrollStack, { ScrollStackItem } from '@/components/ScrollStack';
import SpotlightCard from '@/components/SpotlightCard';
import StarBorder from '@/components/StarBorder';
import SideRays from '@/components/SideRays';
import TrueFocus from '@/components/TrueFocus';

/* ─── Data ───────────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const EXPERIENCE = [
  {
    role: 'Digital Marketing Intern',
    company: 'WebNApp Studio',
    period: 'Oct – Dec 2025',
    location: 'Remote',
    bullets: [
      'Executed SEO, PPC, and social media strategy campaigns for client brands.',
      'Applied analytics to measure performance and optimize engagement and conversions.',
      'Collaborated with senior marketers to refine content strategy and brand messaging.',
    ],
  },
  {
    role: 'Product Management Specialist',
    company: 'Teachnook',
    period: 'Sep – Oct 2024',
    location: 'Remote',
    bullets: [
      'Developed market-aligned strategies; led cross-functional teams to improve product features.',
      'Optimized user experience through data analysis and structured feedback loops.',
      'Executed product launch plans that drove measurable increases in user engagement.',
    ],
  },
  {
    role: 'Digital Marketing Specialist',
    company: 'Teachnook',
    period: 'Aug – Oct 2024',
    location: 'Remote',
    bullets: [
      'Led SEO and content strategy to grow organic visibility and brand consistency.',
      'Ran data-driven multi-channel campaigns driving measurable lifts in conversions.',
      'Collaborated cross-functionally to align marketing execution with product goals.',
    ],
  },
];

const CERTIFICATIONS = [
  { name: 'ServiceNow CSA', icon: '🏅' },
  { name: 'ServiceNow CAD', icon: '🏅' },
  { name: 'Digital Marketing Professional', icon: '📊' },
  { name: 'Product Management Crash Course', icon: '🚀' },
];

const PROJECTS = [
  {
    title: 'ServiceNow Enterprise App',
    tag: 'Production',
    tagColor: '#10b981',
    desc: 'Designed and deployed a custom enterprise app automating multi-step workflows using Flow Designer and Business Rules on the ServiceNow platform.',
    period: '2024',
    link: undefined,
  },
  {
    title: 'SHELeadsIndia — Brand Development & Growth Strategies',
    tag: 'Live',
    tagColor: '#60a5fa',
    desc: 'Developed the SHELeadsIndia platform for women entrepreneurs with 3+ years of experience, focusing on brand building, lead generation, and funnel optimization to drive growth and empowerment.',
    period: '2025',
    link: 'https://drive.google.com/drive/folders/1jzqCSwgbJqjftcB5G_S2e9Fdokxwcm2E?usp=sharing',
  },
  {
    title: 'Agriai — Pest Detection & Crop-Specific Advisory',
    tag: 'Live',
    tagColor: '#60a5fa',
    desc: 'Designed a machine learning solution for pest detection and crop-specific advisory to support small and marginal farmers, improving agricultural decision-making through AI.',
    period: '2025',
    link: 'https://github.com/madhava2128/Agriai.git',
  },
  {
    title: 'Gemini Landmark Description App',
    tag: 'Live',
    tagColor: '#a855f7',
    desc: 'Developed an AI application that generates rich landmark descriptions using the Gemini API, enhancing visual recognition use cases for travellers and accessibility tools.',
    period: '2025',
    link: 'https://github.com/NemetronStrike/Landmark-Description-App.git',
  },
  {
    title: 'NEP 2020 Timetable Optimization System',
    tag: 'Live',
    tagColor: '#a855f7',
    desc: 'Developed an AI application that generates rich landmark descriptions using the Gemini API, An advanced constraint-satisfaction based timetable generation system built in accordance with the National Education Policy (NEP) 2020 guidelines. This tool automates the scheduling of university courses, labs, and faculty across available infrastructure while adhering to strict operational constraints. visual recognition use cases for travellers and accessibility tools.',
    period: '2025',
    link: 'https://github.com/madhava2128/Nep-Timetable-Optimization',
  },
];

const OPEN_TO = [
  'Product Management',
  'ServiceNow App Developer',
  'ServiceNow Administrator',
  'Digital Marketing',
];

/* ─── Skills data ───────────────────────────────────────────── */
const SKILLS_CATEGORIES = [
  {
    icon: '⚙️',
    label: 'ServiceNow Platform',
    accent: '#00e5ff',
    spotlight: 'rgba(0, 229, 255, 0.14)' as const,
    skills: ['Flow Designer', 'Business Rules', 'Script Includes', 'UI Policies', 'Service Portal', 'ITSM', 'App Engine Studio'],
  },
  {
    icon: '🖥️',
    label: 'Development',
    accent: '#60a5fa',
    spotlight: 'rgba(96, 165, 250, 0.14)' as const,
    skills: ['JavaScript', 'HTML / CSS', 'REST APIs', 'GlideScript', 'Git & GitHub'],
  },
  {
    icon: '🚀',
    label: 'Product & Marketing',
    accent: '#a855f7',
    spotlight: 'rgba(168, 85, 247, 0.14)' as const,
    skills: ['Google Ads', 'Meta Ads', 'ChatGPT', 'GlideScript', 'Canva', 'JavaScript', 'Git/GitHub'],
  },
  {
    icon: '🛠',
    label: 'Tools & Platforms',
    accent: '#10b981',
    spotlight: 'rgba(16, 185, 129, 0.14)' as const,
    skills: ['MS-Office', 'Figma', 'Notion', 'Canva', 'Google Workspace'],
  },
];

const FEATURED_SKILLS = [
  { label: 'ServiceNow CSA', level: 100, color: '#00e5ff' },
  { label: 'ServiceNow CAD', level: 95, color: '#00e5ff' },
  { label: 'SEO / SEM', level: 85, color: '#a855f7' },
  { label: 'Product Management', level: 80, color: '#a855f7' },
  { label: 'Flow Designer', level: 90, color: '#00e5ff' },
  { label: 'Google Analytics', level: 80, color: '#10b981' },
  { label: 'JavaScript', level: 75, color: '#60a5fa' },
  { label: 'Meta Ads', level: 85, color: '#f59e0b' },
];

/* ─── Navbar ─────────────────────────────────────────────────── */
function Navbar() {
  const [activeSection, setActiveSection] = useState('#about');

  useEffect(() => {
    const sections = ['about', 'experience', 'certifications', 'skills', 'projects', 'contact'];
    const observerOptions = { root: null, rootMargin: '-20% 0px -60% 0px', threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActiveSection(`#${entry.target.id}`);
      });
    }, observerOptions);
    sections.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });
    const handleScroll = () => { if (window.scrollY < 100) setActiveSection('#about'); };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener('scroll', handleScroll); };
  }, []);

  return (
    <PillNav
      logo="/logo.svg"
      logoAlt="Madhava K"
      logoHref="#hero"
      items={NAV_LINKS}
      activeHref={activeSection}
      baseColor="#7c3aed"
      pillColor="#12121a"
    />
  );
}

/* ─── Hero ───────────────────────────────────────────────────── */
function Hero() {
  return (
    <section id="hero" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '2rem 1.5rem', maxWidth: 760 }}>

        {/* Status badge */}
        <div className="animate-fade-in" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(0,180,216,0.12)', border: '1px solid rgba(0,180,216,0.3)', borderRadius: 999, padding: '0.35rem 1rem', marginBottom: '1.5rem', fontSize: '0.78rem', fontWeight: 600, color: '#90e0ef', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: '#00e5ff', boxShadow: '0 0 8px #00e5ff' }} /> Available for Internships
        </div>

        <h1 className="animate-slide-up" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '1.25rem' }}>
          Hi, I&apos;m{' '}
          <span className="gradient-text" style={{ paddingRight: '0.1em' }}>Madhava K</span>
        </h1>

        <p className="animate-slide-up" style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: '#7a9ec0', lineHeight: 1.7, maxWidth: 560, margin: '0 auto 1.75rem', animationDelay: '0.1s', animationFillMode: 'both' }}>
          Pursuing B.Tech in CS &amp; Business Systems at VBIT, Hyderabad — building enterprise-grade workflows
          while bridging technical and business perspectives. Fast learner, growth mindset, always shipping.
        </p>

        {/* Open-to tags */}
        <div className="animate-slide-up" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', marginBottom: '2rem', animationDelay: '0.15s', animationFillMode: 'both' }}>
          {OPEN_TO.map(role => (
            <span key={role} style={{ fontSize: '0.75rem', fontWeight: 600, padding: '0.3rem 0.75rem', borderRadius: 999, background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.3)', color: '#c4b5fd' }}>
              {role}
            </span>
          ))}
        </div>

        <div className="animate-slide-up" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', animationDelay: '0.2s', animationFillMode: 'both' }}>
          <a href="#projects" style={{ background: '#00b4d8', color: '#ffffff', padding: '0.85rem 2rem', borderRadius: 999, fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none', transition: 'all 0.2s ease', boxShadow: '0 4px 14px rgba(0, 180, 216, 0.4)' }}>View Projects</a>
          <a href="#contact" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#e0f4ff', padding: '0.85rem 2rem', borderRadius: 999, fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none', transition: 'all 0.2s ease' }}>Get in Touch</a>
          <button
            onClick={() => {
              const pdfUrl = '/resume.pdf'; // Ensure this path is correct
              const link = document.createElement('a');
              link.href = pdfUrl;
              link.download = 'Madhava_Reddy_Resume.pdf';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              border: 'none',
              color: 'white',
              padding: '0.85rem 2rem',
              borderRadius: 999,
              fontWeight: 600,
              fontSize: '0.95rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 14px rgba(99, 102, 241, 0.3)'
            }}
          >
            View My Resume
          </button>
        </div>


        {/* Scroll indicator */}
        <div style={{ marginTop: '3.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', opacity: 0.4 }}>
          <div style={{ width: 1, height: 48, background: 'linear-gradient(to bottom, rgba(0,180,216,0.6), transparent)' }} />
          <span style={{ fontSize: '0.7rem', letterSpacing: '0.1em', color: '#4b5675', textTransform: 'uppercase' }}>Scroll</span>
        </div>
      </div>
    </section>
  );
}

/* ─── About ──────────────────────────────────────────────────── */
function About() {
  return (
    <section id="about" style={{ padding: '6rem 1.5rem', maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>

        {/* Profile Card */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ProfileCard
            name="Madhava K"
            title="CS Student '27"
            handle="madhava2128"
            status="Available for Internships"
            contactText="Get in Touch"
            avatarUrl="https://github.com/madhava2128.png"
            showUserInfo={true}
            enableTilt={true}
            behindGlowEnabled={true}
            behindGlowColor="rgba(124, 58, 237, 0.4)"
            innerGradient="linear-gradient(145deg, rgba(30, 20, 50, 0.9) 0%, rgba(124, 58, 237, 0.2) 100%)"
            onContactClick={() => { window.location.href = '#contact'; }}
          />
        </div>

        {/* Text */}
        <div>
          <p className="section-label">About Me</p>
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: '#e0f4ff', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.15 }}>
            Where Tech Meets<br />Business Strategy
          </h2>
          <p style={{ color: '#7a9ec0', lineHeight: 1.75, fontSize: '1.02rem', marginBottom: '1.25rem' }}>
            Pursuing B.Tech in CS &amp; Business Systems at VBIT, Hyderabad, I build and automate enterprise-grade workflows
            while bridging technical and business perspectives. Fast learner, growth mindset, always shipping.
          </p>
          <p style={{ color: '#7a9ec0', lineHeight: 1.75, fontSize: '1.02rem', marginBottom: '1.25rem' }}>
            I hold a{' '}
            <span style={{ color: '#00e5ff', fontWeight: 600 }}>ServiceNow Certified System Administrator (CSA)</span>
            {' '}and{' '}
            <span style={{ color: '#00e5ff', fontWeight: 600 }}>Certified Application Developer (CAD)</span>
            {' '}credential, validating my expertise in configuring, implementing, and building on the ServiceNow platform.
          </p>
          <p style={{ color: '#7a9ec0', lineHeight: 1.75, fontSize: '1.02rem' }}>
            Whether it&apos;s crafting a digital marketing campaign, optimizing enterprise workflows, or shipping
            a web application — I bring a holistic, problem-solving mindset to every project.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─── Experience ─────────────────────────────────────────────── */
function Experience() {
  const expColors = ['#00e5ff', '#a855f7', '#10b981'];

  return (
    <section id="experience" style={{ padding: '6rem 1.5rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        <p className="section-label">Work History</p>
        <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: '#e0f4ff', letterSpacing: '-0.02em', marginBottom: '0.75rem', lineHeight: 1.15 }}>
          Experience
        </h2>
        <p style={{ color: '#4b6580', fontSize: '1rem', marginBottom: '3.5rem' }}>
          Professional roles in marketing, product strategy, and platform development.
        </p>

        {/* Timeline */}
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '0' }}>

          {/* Vertical line */}
          <div style={{ position: 'absolute', left: 21, top: 0, bottom: 0, width: 2, background: 'linear-gradient(to bottom, rgba(0,229,255,0.6), rgba(168,85,247,0.4), rgba(16,185,129,0.3), transparent)', borderRadius: 999 }} />

          {EXPERIENCE.map((exp, i) => {
            const accent = expColors[i % expColors.length];
            return (
              <div key={i} style={{ display: 'flex', gap: '2rem', paddingBottom: i < EXPERIENCE.length - 1 ? '2.5rem' : 0 }}>

                {/* Timeline dot */}
                <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '1.6rem', zIndex: 1 }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: `${accent}18`, border: `2px solid ${accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 16px ${accent}40`, flexShrink: 0 }}>
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: accent }} />
                  </div>
                </div>

                {/* Card */}
                <SpotlightCard
                  spotlightColor={i === 0 ? 'rgba(0, 229, 255, 0.12)' : i === 1 ? 'rgba(168, 85, 247, 0.12)' : 'rgba(16, 185, 129, 0.12)'}
                  style={{
                    flex: 1,
                    background: 'rgba(12, 21, 37, 0.7)',
                    border: `1px solid ${accent}20`,
                    borderRadius: '1rem',
                    padding: '1.75rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.25rem',
                  }}
                >
                  {/* Header row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#e0f4ff', marginBottom: '0.3rem', lineHeight: 1.3 }}>{exp.role}</h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.88rem', color: accent, fontWeight: 600 }}>{exp.company}</span>
                        <span style={{ fontSize: '0.75rem', color: '#4b5675' }}>·</span>
                        <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{exp.location}</span>
                      </div>
                    </div>
                    <span style={{ fontSize: '0.78rem', fontWeight: 600, padding: '0.3rem 0.8rem', borderRadius: 999, background: `${accent}15`, border: `1px solid ${accent}30`, color: accent, whiteSpace: 'nowrap' }}>
                      {exp.period}
                    </span>
                  </div>

                  {/* Divider */}
                  <div style={{ height: 1, background: `linear-gradient(to right, ${accent}35, transparent)` }} />

                  {/* Bullets */}
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                    {exp.bullets.map((bullet, j) => (
                      <li key={j} style={{ display: 'flex', gap: '0.65rem', color: '#8ba5c0', lineHeight: 1.65, fontSize: '0.92rem' }}>
                        <span style={{ color: accent, marginTop: '0.25rem', flexShrink: 0, opacity: 0.85 }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </div>
            );
          })}
        </div>

        {/* Education */}
        <div style={{ marginTop: '4rem' }}>
          <p className="section-label">Education</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            {[
              { deg: 'B.Tech — CS & Business Systems', inst: 'Vignana Bharathi Institute of Technology (VBIT), Hyderabad', period: 'Jun 2023 – Jul 2027' },
              { deg: 'Class X – XII (CBSE)', inst: 'Delhi Public School (DPS)', period: 'Jun 2016 – Mar 2023' },
            ].map((e, i) => (
              <StarBorder key={i} as="div" color="#00e5ff" speed="4s" style={{ width: '100%', padding: '2px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', textAlign: 'left', width: '100%' }}>
                  <div>
                    <h3 style={{ fontWeight: 700, color: '#e0f4ff', fontSize: '0.97rem' }}>{e.deg}</h3>
                    <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.2rem' }}>{e.inst}</p>
                  </div>
                  <span style={{ fontSize: '0.78rem', color: '#00e5ff', fontWeight: 500, background: 'rgba(0,180,216,0.1)', padding: '0.25rem 0.65rem', borderRadius: 999, flexShrink: 0 }}>{e.period}</span>
                </div>
              </StarBorder>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}


/* ─── Certifications ─────────────────────────────────────────── */
function Certifications() {
  return (
    <section id="certifications" style={{ padding: '6rem 1.5rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <p className="section-label">Credentials</p>
        <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: '#e0f4ff', letterSpacing: '-0.02em', marginBottom: '3rem', lineHeight: 1.15 }}>
          Certifications
        </h2>

        <CardSwap>
          {CERTIFICATIONS.map((c, i) => (
            <Card key={i} id={`cert-${i}`}>
              <div style={{ padding: '2.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '1rem' }}>
                <span style={{ fontSize: '3rem' }}>{c.icon}</span>
                <h3 style={{ fontSize: '1.2rem', color: '#e0f4ff', fontWeight: 700, lineHeight: 1.4 }}>{c.name}</h3>
              </div>
            </Card>
          ))}
        </CardSwap>
      </div>
    </section>
  );
}

/* ─── Skills ─────────────────────────────────────────────────── */
function Skills() {
  return (
    <section id="skills" style={{ padding: '6rem 1.5rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        <p className="section-label">Toolkit</p>
        <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: '#e0f4ff', letterSpacing: '-0.02em', marginBottom: '0.75rem', lineHeight: 1.15 }}>
          Skills &amp; Expertise
        </h2>
        <p style={{ color: '#4b6580', fontSize: '1rem', marginBottom: '3rem' }}>
          Core competencies across platform development, product strategy, and digital growth.
        </p>

        {/* Category Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
          {SKILLS_CATEGORIES.map((cat, i) => (
            <SpotlightCard
              key={i}
              spotlightColor={cat.spotlight}
              style={{
                background: 'rgba(12, 21, 37, 0.7)',
                border: `1px solid ${cat.accent}22`,
                borderRadius: '1rem',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              {/* Card header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: 42, height: 42, borderRadius: '0.6rem', background: `${cat.accent}15`, border: `1px solid ${cat.accent}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', flexShrink: 0 }}>
                  {cat.icon}
                </div>
                <div>
                  <p style={{ fontSize: '0.7rem', fontWeight: 600, color: cat.accent, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.1rem' }}>Category</p>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#e0f4ff' }}>{cat.label}</h3>
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: `linear-gradient(to right, ${cat.accent}40, transparent)` }} />

              {/* Skill tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {cat.skills.map(skill => (
                  <span key={skill} style={{ fontSize: '0.75rem', fontWeight: 500, padding: '0.25rem 0.6rem', borderRadius: 999, background: `${cat.accent}12`, border: `1px solid ${cat.accent}25`, color: '#94a3b8', whiteSpace: 'nowrap' }}>
                    {skill}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          ))}
        </div>

        {/* Proficiency bars */}
        <div style={{ background: 'rgba(12, 21, 37, 0.6)', border: '1px solid rgba(0,180,216,0.12)', borderRadius: '1rem', padding: '2rem' }}>
          <p style={{ fontSize: '0.8rem', fontWeight: 600, color: '#00e5ff', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Key Proficiencies</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
            {FEATURED_SKILLS.map(skill => (
              <div key={skill.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#c8d8e8' }}>{skill.label}</span>
                  <span style={{ fontSize: '0.75rem', color: skill.color, fontWeight: 700 }}>{skill.level}%</span>
                </div>
                <div style={{ height: 5, borderRadius: 999, background: 'rgba(255,255,255,0.07)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${skill.level}%`, borderRadius: 999, background: `linear-gradient(to right, ${skill.color}90, ${skill.color})`, boxShadow: `0 0 8px ${skill.color}60` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

/* ─── Projects ───────────────────────────────────────────────── */
function Projects() {
  return (
    <section id="projects" style={{ padding: '6rem 1.5rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <p className="section-label">What I&apos;ve Built</p>
        <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: '#e0f4ff', letterSpacing: '-0.02em', marginBottom: '3rem', lineHeight: 1.15 }}>
          Projects &amp; Highlights
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {PROJECTS.map((p, i) => (
            <SpotlightCard
              key={i}
              className="card-hover"
              spotlightColor="rgba(0, 229, 255, 0.15)"
              style={{ background: '#0c1525', borderRadius: '0.75rem', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                <h3 style={{ fontWeight: 700, color: '#e0f4ff', fontSize: '1rem', lineHeight: 1.4 }}>{p.title}</h3>
                <span style={{ flexShrink: 0, fontSize: '0.72rem', fontWeight: 600, padding: '0.2rem 0.55rem', borderRadius: 999, border: `1px solid ${p.tagColor}33`, background: `${p.tagColor}15`, color: p.tagColor }}>{p.tag}</span>
              </div>
              <p style={{ fontSize: '0.9rem', color: '#7a9ec0', lineHeight: 1.7, flex: 1 }}>{p.desc}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: '#4b5675' }}>{p.period}</span>
                {p.link && (
                  <a href={p.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.78rem', color: '#00e5ff', textDecoration: 'none', fontWeight: 500 }}>View →</a>
                )}
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Award Banner ───────────────────────────────────────────── */
function Award() {
  return (
    <section style={{ padding: '4rem 1.5rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ borderRadius: '1rem', background: 'linear-gradient(135deg, rgba(245,158,11,0.1) 0%, rgba(0,180,216,0.1) 100%)', border: '1px solid rgba(245,158,11,0.2)', padding: '2.5rem', display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ fontSize: '4rem', lineHeight: 1 }}>🏆</div>
          <div>
            <p style={{ fontSize: '0.75rem', color: '#f59e0b', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Recognition</p>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#e0f4ff', marginBottom: '0.35rem' }}>3rd Place — NASSCOM × SmartBridge</h3>
            <p style={{ color: '#7a9ec0', fontSize: '0.95rem' }}>GenAI Hackathon · Team InnovateIntel · Feb 2025 · 24-hour sprint</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Contact ────────────────────────────────────────────────── */
function Contact() {
  const contactItems = [
    { link: 'https://www.linkedin.com/in/madhava2128', text: 'LinkedIn', image: '/contact_linkedin1.jpg' },
    { link: 'https://github.com/madhava2128', text: 'GitHub', image: '/contact_github1.jpg' },
    { link: 'mailto:mmad46052@gmail.com', text: 'Email Me', image: '/contact_email1.jpg' },
    { link: 'tel:+917981428675', text: 'Call Me', image: '/contact_phone1.jpg' },
  ];

  return (
    <section id="contact" style={{ padding: '6rem 0 0 0' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center', padding: '0 1.5rem 4rem 1.5rem' }}>
        <p className="section-label" style={{ justifyContent: 'center' }}>Let&apos;s Connect</p>
        <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: '#e0f4ff', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
          Open to Opportunities
        </h2>
        <p style={{ color: '#7a9ec0', fontSize: '1.02rem', lineHeight: 1.7, maxWidth: 600, margin: '0 auto' }}>
          Currently seeking internships in Product Management, ServiceNow Development,
          Business Technology, and Digital Marketing. Drop me a line — I respond fast!
        </p>
      </div>
      <div style={{ height: '360px', position: 'relative', borderBottom: '1px solid rgba(0,180,216,0.15)', borderTop: '1px solid rgba(0,180,216,0.15)' }}>
        <FlowingMenu
          items={contactItems}
          speed={12}
          textColor="#e0f4ff"
          bgColor="#05080f"
          marqueeBgColor="#00b4d8"
          marqueeTextColor="#ffffff"
          borderColor="rgba(0,180,216,0.15)"
        />
      </div>
    </section>
  );
}

/* ─── Footer ─────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(0,180,216,0.1)', padding: '2rem 1.5rem', textAlign: 'center', color: '#3a5570', fontSize: '0.82rem' }}>
      <p>Built by <span style={{ color: '#00e5ff', fontWeight: 600 }}>Madhava K</span> · Next.js · Tailwind CSS v4 · React Bits</p>
      <p style={{ marginTop: '0.35rem' }}>© {new Date().getFullYear()} Madhava K. All rights reserved.</p>
    </footer>
  );
}

/* ─── Responsive helper styles ───────────────────────────────── */
const responsiveStyle = `
  @media (max-width: 640px) {
    .hidden-mobile { display: none !important; }
    .show-mobile   { display: block !important; }
  }
  @media (min-width: 641px) {
    .show-mobile   { display: none !important; }
  }
  .section-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.85rem;
    font-weight: 600;
    color: #00e5ff;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    margin-bottom: 1rem;
  }
  .section-label::before {
    content: '';
    display: inline-block;
    width: 20px;
    height: 2px;
    background: #00e5ff;
  }
  .glow-border {
    position: relative;
  }
  .card-hover {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .card-hover:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 30px rgba(0,180,216,0.15);
  }
  .animate-fade-in {
    animation: fadeIn 0.8s ease both;
  }
  .animate-slide-up {
    animation: slideUp 0.8s ease both;
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .gradient-text {
    background: linear-gradient(135deg, #00e5ff 0%, #7c3aed 60%, #00ffa3 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

/* ─── Page ───────────────────────────────────────────────────── */
export default function Page() {
  return (
    <>
      <style>{responsiveStyle}</style>

      {/* Global SideRays background */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -2, pointerEvents: 'none', background: '#05080f' }}>
        <SideRays
          speed={1.5}
          rayColor1="#00e5ff"
          rayColor2="#7c3aed"
          intensity={1.4}
          spread={1.8}
          origin="top-right"
          tilt={-10}
          saturation={1.3}
          blend={0.55}
          falloff={1.8}
          opacity={0.4}
        />
      </div>

      {/* Sticky Navbar */}
      <header style={{ position: 'fixed', top: 0, width: '100%', zIndex: 50, padding: '1rem', display: 'flex', justifyContent: 'center' }}>
        <Navbar />
      </header>

      <main>
        <Hero />
        <About />
        <Experience />
        <Certifications />
        <Skills />
        <Projects />
        <Award />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
