'use client';

import { useState, useEffect } from 'react';
import BorderGlow from '@/components/BorderGlow';
import ProfileCard from '@/components/ProfileCard';
import PillNav from '@/components/PillNav';
import FlowingMenu from '@/components/FlowingMenu';
import SpotlightCard from '@/components/SpotlightCard';
import StarBorder from '@/components/StarBorder';
import SideRays from '@/components/SideRays';
import TrueFocus from '@/components/TrueFocus';

/* ─── Data ───────────────────────────────────────────────────── */
const ACCENTS = {
  platform: '#f5f5f5',
  dev: '#d4d4d4',
  product: '#b0b0b0',
  success: '#f5f5f5',
  warning: '#9a9a9a',
} as const;

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
  {
    name: 'ServiceNow CSA',
    icon: '🏅',
    issuer: 'ServiceNow',
    year: '2026',
    description: 'Certified System Administrator credential validating core platform administration and configuration expertise.',
    link: 'https://drive.google.com/file/d/12T0vR6bIWVWWOXwHaW7ltp37mM05mHIH/view?usp=sharing',
  },
  {
    name: 'ServiceNow CAD',
    icon: '🏅',
    issuer: 'ServiceNow',
    year: '2026',
    description: 'Certified Application Developer credential for building scalable, automated ServiceNow solutions.',
    link: 'https://drive.google.com/file/d/1n6FpR-AJiDMfFHz5v1nuhUDj-DEGjIF9/view?usp=sharing',
  },
  {
    name: 'Digital Marketing Professional',
    icon: '📊',
    issuer: 'Teachnook',
    year: '2024',
    description: 'Verified digital marketing credential covering analytics, search, content strategy, and campaign optimization.',
    link: 'https://drive.google.com/file/d/1-TFWxwYDzmKO7-PRsqxJ1-5TgRrfjTgg/view?usp=sharing',
  },
  {
    name: 'Product Management Crash Course',
    icon: '🚀',
    issuer: 'TNX Learning',
    year: '2024',
    description: 'Practical product management certification focused on product strategy, roadmaps, and user-centered design.',
    link: 'https://drive.google.com/file/d/1UFfwsQ2Li7KdvB4VGKAXW9cFroaVisL8/view?usp=sharing',
  },
];

const PROJECTS = [
  {
    title: 'ServiceNow Enterprise App',
    tag: 'Production',
    tagColor: ACCENTS.success,
    desc: 'Designed and deployed a custom enterprise app automating multi-step workflows using Flow Designer and Business Rules on the ServiceNow platform.',
    period: '2024',
    link: undefined,
  },
  {
    title: 'SHELeadsIndia — Brand Development & Growth Strategies',
    tag: 'Live',
    tagColor: ACCENTS.dev,
    desc: 'Developed the SHELeadsIndia platform for women entrepreneurs with 3+ years of experience, focusing on brand building, lead generation, and funnel optimization to drive growth and empowerment.',
    period: '2025',
    link: 'https://drive.google.com/drive/folders/1jzqCSwgbJqjftcB5G_S2e9Fdokxwcm2E?usp=sharing',
  },
  {
    title: 'Agriai — Pest Detection & Crop-Specific Advisory',
    tag: 'Live',
    tagColor: ACCENTS.dev,
    desc: 'Designed a machine learning solution for pest detection and crop-specific advisory to support small and marginal farmers, improving agricultural decision-making through AI.',
    period: '2025',
    link: 'https://github.com/madhava2128/Agriai.git',
  },
  {
    title: 'Gemini Landmark Description App',
    tag: 'Live',
    tagColor: ACCENTS.product,
    desc: 'Developed an AI application that generates rich landmark descriptions using the Gemini API, enhancing visual recognition use cases for travellers and accessibility tools.',
    period: '2025',
    link: 'https://github.com/NemetronStrike/Landmark-Description-App.git',
  },
  {
    title: 'NEP 2020 Timetable Optimization System',
    tag: 'Live',
    tagColor: ACCENTS.product,
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

const CONTACT_EMAIL = 'mmad46052@gmail.com';

/* ─── Skills data ───────────────────────────────────────────── */
const SKILLS_CATEGORIES = [
  {
    icon: '⚙️',
    label: 'ServiceNow Platform',
    accent: ACCENTS.platform,
    spotlight: 'rgba(214, 251, 97, 0.14)' as const,
    skills: ['Flow Designer', 'Business Rules', 'Script Includes', 'UI Policies', 'Service Portal', 'ITSM', 'App Engine Studio'],
  },
  {
    icon: '🖥️',
    label: 'Development',
    accent: ACCENTS.dev,
    spotlight: 'rgba(96, 165, 250, 0.14)' as const,
    skills: ['JavaScript', 'HTML / CSS', 'REST APIs', 'GlideScript', 'Git & GitHub'],
  },
  {
    icon: '🚀',
    label: 'Product & Marketing',
    accent: ACCENTS.product,
    spotlight: 'rgba(167, 139, 250, 0.14)' as const,
    skills: ['Google Ads', 'Meta Ads', 'ChatGPT', 'GlideScript', 'Canva', 'JavaScript', 'Git/GitHub'],
  },
  {
    icon: '🛠',
    label: 'Tools & Platforms',
    accent: ACCENTS.success,
    spotlight: 'rgba(52, 211, 153, 0.14)' as const,
    skills: ['MS-Office', 'Figma', 'Notion', 'Canva', 'Google Workspace'],
  },
];

const FEATURED_SKILLS = [
  { label: 'ServiceNow CSA', level: 100, color: ACCENTS.platform },
  { label: 'ServiceNow CAD', level: 95, color: ACCENTS.platform },
  { label: 'SEO / SEM', level: 85, color: ACCENTS.product },
  { label: 'Product Management', level: 80, color: ACCENTS.product },
  { label: 'Flow Designer', level: 90, color: ACCENTS.platform },
  { label: 'Google Analytics', level: 80, color: ACCENTS.success },
  { label: 'JavaScript', level: 75, color: ACCENTS.dev },
  { label: 'Meta Ads', level: 85, color: ACCENTS.warning },
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
      baseColor="#ffffff"
      pillColor="#111111"
    />
  );
}

/* ─── Hero ───────────────────────────────────────────────────── */
function Hero() {
  useEffect(() => {
    const handleFirst = () => {
      document.documentElement.classList.add('scrolled');
      window.removeEventListener('scroll', handleFirst);
      window.removeEventListener('touchstart', handleFirst);
    };
    window.addEventListener('scroll', handleFirst, { passive: true, once: true } as AddEventListenerOptions);
    window.addEventListener('touchstart', handleFirst, { passive: true, once: true } as AddEventListenerOptions);
    return () => {
      window.removeEventListener('scroll', handleFirst);
      window.removeEventListener('touchstart', handleFirst);
    };
  }, []);

  return (
    <section id="hero" className="hero-panel">
      <div className="hero-content">
        <div className="status-chip animate-fade-in">
          <span /> Available for Internships
        </div>

        <h1 className="animate-slide-up hero-title">
          Hi, I&apos;m{' '}
          <span className="gradient-text">Madhava K</span>
        </h1>

        <p className="animate-slide-up hero-copy delay-100">
          Pursuing B.Tech in CS &amp; Business Systems at VBIT, Hyderabad — building enterprise-grade workflows
          while bridging technical and business perspectives. Fast learner, growth mindset, always shipping.
        </p>

        <div className="animate-slide-up hero-tags delay-200">
          <TrueFocus sentence={OPEN_TO.join('·')} separator={'·'} animationDuration={0.9} pauseBetweenAnimations={1.2} blurAmount={6} borderColor={'var(--accent-bright)'} glowColor={'rgba(214,251,97,0.35)'} />
        </div>

        <div className="animate-slide-up button-group delay-300">
          <a href="#projects" className="btn btn-primary">View Projects</a>
          <a href="#contact" className="btn btn-secondary">Get in Touch</a>
          <a href={'https://drive.google.com/file/d/157ackiZ81tNAaHeQoOwfps_Vltg-7jev/view?usp=sharing'} className="btn btn-secondary">View Resume</a>
        </div>

        <div className="hero-scroll-hint" aria-hidden="true">
          <div className="mouse">
            <div className="wheel" />
          </div>
          <span className="scroll-label">Scroll</span>
        </div>
      </div>
    </section>
  );
}

/* ─── Award Banner ───────────────────────────────────────────── */
function Award() {
  return (
    <section className="section-container">
      <div className="section-wrap" style={{ maxWidth: 800 }}>
        <div style={{ borderRadius: '1rem', background: 'linear-gradient(135deg, rgba(214,251,97,0.1) 0%, rgba(214,251,97,0.1) 100%)', border: '1px solid rgba(214,251,97,0.2)', padding: '2.5rem', display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ fontSize: '4rem', lineHeight: 1 }}>🏆</div>
          <div>
            <p style={{ fontSize: '0.75rem', color: 'var(--warning)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Recognition</p>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>3rd Place — NASSCOM × SmartBridge</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>GenAI Hackathon · Team InnovateIntel · Feb 2025 · 24-hour sprint</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── About ──────────────────────────────────────────────────── */
function About() {
  return (
    <section id="about" className="section-container">
      <div className="section-grid profile-grid">

        {/* Profile Card */}
        <div className="profile-card-wrapper">
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
            behindGlowColor="rgba(214, 251, 97, 0.35)"
            innerGradient="linear-gradient(145deg, rgba(20, 18, 16, 0.95) 0%, rgba(167, 139, 250, 0.15) 100%)"
            onContactClick={() => { window.location.href = '#contact'; }}
          />
        </div>

        {/* Text */}
        <div>
          <p className="section-label">About Me</p>
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.15 }}>
            Where Tech Meets<br />Business Strategy
          </h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, fontSize: '1.02rem', marginBottom: '1.25rem' }}>
I am pursuing a B.Tech in Computer Science and Business Systems at VBIT, Hyderabad. I enjoy building web applications, automating workflows, and solving real-world problems by combining technical and business knowledge.
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, fontSize: '1.02rem', marginBottom: '1.25rem' }}>
            I hold a{' '}
            <span style={{ color: 'var(--accent-bright)', fontWeight: 600 }}>ServiceNow Certified System Administrator (CSA)</span>
            {' '}and{' '}
            <span style={{ color: 'var(--accent-bright)', fontWeight: 600 }}>Certified Application Developer (CAD)</span>
            {' '}credential, validating my expertise in configuring, implementing, and building on the ServiceNow platform.
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, fontSize: '1.02rem' }}>
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
  const expColors = [ACCENTS.platform, ACCENTS.product, ACCENTS.success];

  return (
    <section id="experience" className="section-container">
      <div className="section-wrap">

        <p className="section-label">Work History</p>
        <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: '0.75rem', lineHeight: 1.15 }}>
          Experience
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '3.5rem' }}>
          Professional roles in marketing, product strategy, and platform development.
        </p>

        {/* Timeline */}
        <div className="timeline-wrapper">

          {/* Vertical line */}
          <div style={{ position: 'absolute', left: 21, top: 0, bottom: 0, width: 2, background: 'linear-gradient(to bottom, rgba(214,251,97,0.9), rgba(214,251,97,0.55), rgba(214,251,97,0.35), transparent)', borderRadius: 999 }} />

          {EXPERIENCE.map((exp, i) => {
            const accent = expColors[i % expColors.length];
            return (
              <div key={i} className="timeline-card" style={{ paddingBottom: i < EXPERIENCE.length - 1 ? '2.5rem' : 0 }}>

                {/* Timeline dot */}
                <div className="timeline-dot">
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: `${accent}18`, border: `2px solid ${accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 16px ${accent}40`, flexShrink: 0 }}>
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: accent }} />
                  </div>
                </div>

                {/* Card */}
                <SpotlightCard
                  className="experience-card"
                  spotlightColor={i === 0 ? 'rgba(214, 251, 97, 0.12)' : i === 1 ? 'rgba(167, 139, 250, 0.12)' : 'rgba(52, 211, 153, 0.12)'}
                  style={{
                    flex: 1,
                    padding: '1.75rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.25rem',
                  }}
                >
                  {/* Header row */}
                  <div className="experience-card-header">
                    <div>
                      <h3 className="experience-card-title">{exp.role}</h3>
                      <div className="experience-card-subtitle">
                        <span className="experience-card-company">{exp.company}</span>
                        <span className="experience-card-meta">{exp.location}</span>
                      </div>
                    </div>
                    <span className="experience-card-period">
                      {exp.period}
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="experience-card-divider" />

                  {/* Bullets */}
                  <ul className="experience-card-bullets">
                    {exp.bullets.map((bullet, j) => (
                      <li key={j} className="experience-card-bullet">
                        <span className="experience-card-bullet-icon">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </span>
                        <span>{bullet}</span>
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
              <StarBorder key={i} as="div" color={ACCENTS.platform} speed="4s" style={{ width: '100%', padding: '2px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', textAlign: 'left', width: '100%' }}>
                  <div>
                    <h3 style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.97rem' }}>{e.deg}</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>{e.inst}</p>
                  </div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--accent-bright)', fontWeight: 500, background: 'var(--accent-subtle)', padding: '0.25rem 0.65rem', borderRadius: 999, flexShrink: 0 }}>{e.period}</span>
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
    <section id="certifications" className="section-container">
      <div className="section-wrap">
        <p className="section-label">Credentials</p>
        <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: '1rem', lineHeight: 1.15 }}>
          Certifications
        </h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '720px', marginBottom: '3rem', fontSize: '1rem' }}>
          Verified credentials that reinforce my technical platform, product, and marketing strengths. Each certification is chosen to highlight credibility, delivery, and real-world impact.
        </p>

        <div className="cert-grid">
          {CERTIFICATIONS.map((c, i) => (
            <BorderGlow
              key={i}
              className="cert-tile"
              edgeSensitivity={30}
              glowColor="0 0 100"
              backgroundColor="#090909"
              borderRadius={32}
              glowRadius={40}
              glowIntensity={0.8}
              coneSpread={24}
              animated={false}
              colors={['#f5f5f5', '#d4d4d4', '#ffffff']}
            >
              <div className="cert-card-inner">
                <div className="cert-card-top">
                  <div className="cert-card-badge">
                    <span>{c.icon}</span>
                  </div>
                  <span className="cert-card-tag">Credential</span>
                </div>
                <h3>{c.name}</h3>
                <p>{c.description}</p>
                <div className="cert-card-meta">
                  <span>{c.issuer}</span>
                  <span>{c.year}</span>
                </div>
                {c.link ? (
                  <a
                    href={c.link}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="cert-card-link"
                  >
                    View Credential
                  </a>
                ) : null}
              </div>
            </BorderGlow>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Skills ─────────────────────────────────────────────────── */
function Skills() {
  return (
    <section id="skills" className="section-container">
      <div className="section-wrap">

        <p className="section-label">Toolkit</p>
        <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: '0.75rem', lineHeight: 1.15 }}>
          Skills &amp; Expertise
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '3rem' }}>
          Core competencies across platform development, product strategy, and digital growth.
        </p>

        {/* Category Cards */}
        <div className="skills-grid">
          {SKILLS_CATEGORIES.map((cat, i) => (
            <SpotlightCard
              key={i}
              spotlightColor={cat.spotlight}
              style={{
                background: 'rgba(20, 18, 16, 0.7)',
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
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>{cat.label}</h3>
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: `linear-gradient(to right, ${cat.accent}40, transparent)` }} />

              {/* Skill tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {cat.skills.map(skill => (
                  <span key={skill} style={{ fontSize: '0.75rem', fontWeight: 500, padding: '0.25rem 0.6rem', borderRadius: 999, background: `${cat.accent}12`, border: `1px solid ${cat.accent}25`, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                    {skill}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          ))}
        </div>

        {/* Proficiency bars */}
        <div style={{ background: 'rgba(20, 18, 16, 0.6)', border: '1px solid var(--border)', borderRadius: '1rem', padding: '2rem' }}>
          <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent-bright)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Key Proficiencies</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
            {FEATURED_SKILLS.map(skill => (
              <div key={skill.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>{skill.label}</span>
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
    <section id="projects" className="section-container">
      <div className="section-wrap">
        <p className="section-label">What I&apos;ve Built</p>
        <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: '3rem', lineHeight: 1.15 }}>
          Projects &amp; Highlights
        </h2>

        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <SpotlightCard
              key={i}
              className="card-hover"
              spotlightColor="rgba(214, 251, 97, 0.15)"
              style={{ background: 'var(--surface)', borderRadius: '0.75rem', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                <h3 style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '1rem', lineHeight: 1.4 }}>{p.title}</h3>
                <span style={{ flexShrink: 0, fontSize: '0.72rem', fontWeight: 600, padding: '0.2rem 0.55rem', borderRadius: 999, border: `1px solid ${p.tagColor}33`, background: `${p.tagColor}15`, color: p.tagColor }}>{p.tag}</span>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7, flex: 1 }}>{p.desc}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{p.period}</span>
                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link-btn"
                  >
                    View Project
                    <span aria-hidden="true">→</span>
                  </a>
                )}
              </div>
            </SpotlightCard>
          ))}
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
    { link: `mailto:${CONTACT_EMAIL}`, text: 'Email Me', image: '/contact_email1.jpg' },
    { link: 'tel:+917981428675', text: 'Call Me', image: '/contact_phone1.jpg' },
  ];

  return (
    <section id="contact" className="section-container contact-panel">
      <div className="section-wrap section-header">
        <p className="section-label">Let&apos;s Connect</p>
        <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
          Open to Opportunities
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.02rem', lineHeight: 1.7, maxWidth: 600, margin: '0 auto' }}>
          Currently seeking internships in Product Management, ServiceNow Development,
          Business Technology, and Digital Marketing. Drop me a line — I respond fast!
        </p>
      </div>
      <div className="contact-marquee">
        <FlowingMenu
          items={contactItems}
          speed={12}
          textColor="var(--text-primary)"
          bgColor="var(--background)"
          marqueeBgColor="var(--accent)"
          marqueeTextColor="#ffffff"
          borderColor="var(--border)"
        />
      </div>
    </section>
  );
}

/* ─── Footer ─────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="footer-content">
      <p>Built by <span style={{ color: 'var(--accent-bright)', fontWeight: 600 }}>Madhava K</span> · Next.js · Tailwind CSS v4 · React Bits</p>
      <p style={{ marginTop: '0.35rem' }}>© {new Date().getFullYear()} Madhava K. All rights reserved.</p>
    </footer>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function Page() {
  return (
    <>
      {/* Global SideRays background */}
      <div className="background-layer">
        <SideRays
          speed={1.5}
          rayColor1="#ffffff"
          rayColor2="rgba(255,255,255,0.75)"
          intensity={1.6}
          spread={2.0}
          origin="top-right"
          tilt={-10}
          saturation={0.85}
          blend={0.8}
          falloff={1.8}
          opacity={0.55}
        />
      </div>

      {/* Sticky Navbar */}
      <header className="page-header" aria-label="Primary navigation">
        <Navbar />
      </header>

      <main className="page-shell">
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
