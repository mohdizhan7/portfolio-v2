import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About — Mohammed Izhan Shaikh',
  description: 'Supply chain systems designer with 6+ years building operations that scale — WMS, warehouse layouts, TMS integrations, and the human workflows that make them work.',
  openGraph: {
    title: 'About — Mohammed Izhan Shaikh',
    description: 'Supply chain systems designer with 6+ years building operations that scale.',
    url: 'https://mohmmedizhan.com/about',
  },
};

const experience = [
  { company: 'StackBox', role: 'Assistant Project Manager', period: 'Sep 2023 — Present', duration: '2yr 7mo' },
  { company: 'Edgistify', role: 'Supply Chain Operations', period: '2021 — 2023', duration: '2yr' },
  { company: 'Mindseed Education', role: 'Operations & Logistics', period: '2019 — 2021', duration: '1yr 8mo' },
  { company: 'DTDC Express', role: 'Branch Manager', period: '2018 — 2019', duration: '1yr' },
];

const skills = [
  'WMS & TMS System Design',
  'Warehouse Operations & Process Optimisation',
  'Enterprise Implementation Leadership',
  'Supply Chain Network Design',
  'Team Leadership & Mentorship',
  'Business Process Redesign',
];

const stats = [
  { num: '6+', label: 'Years' },
  { num: '50+', label: 'Sites' },
];

export default function AboutPage() {
  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '20px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: 'var(--bg)', borderBottom: '1px solid var(--line)',
      }}>
        <Link href="/" style={{ fontSize: 15, fontWeight: 700, letterSpacing: '-0.01em' }}>Mohammed Izhan</Link>
        <div style={{ display: 'flex', gap: 32, fontSize: 14, fontWeight: 600 }}>
          <Link href="/#work">Work</Link>
          <Link href="/about" style={{ opacity: 0.4 }}>About</Link>
        </div>
      </nav>

      <main style={{ paddingTop: 80 }}>
        {/* Hero intro */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 48px 64px' }}>
          <h1 style={{ fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 28 }}>
            Hi, I&apos;m Mohammed Izhan.
          </h1>
          <p style={{ fontSize: 20, color: 'var(--fg-2)', maxWidth: 680, lineHeight: 1.6, marginBottom: 32 }}>
            A supply chain systems designer passionate about building operations that scale — simplifying complexity into elegant solutions.
          </p>
          <div style={{ fontSize: 16, color: 'var(--fg-2)', maxWidth: 680, display: 'flex', flexDirection: 'column', gap: 16, lineHeight: 1.75 }}>
            <p>
              <strong style={{ color: 'var(--fg)' }}>Currently</strong> leading implementations at StackBox. Previously built supply chain solutions at Edgistify, Mindseed, and DTDC — scaling warehouses, designing processes, and coordinating go-lives for some of India&apos;s largest enterprises.
            </p>
            <p>
              Based in Mumbai. 6+ years designing systems that bridge operations and technology — WMS implementations, warehouse layouts, TMS integrations, and the human workflows that make them work.
            </p>
            <p>
              My journey started in operations, evolved through startups, and solidified in enterprise. I&apos;m most energised by taking messy, complicated processes and transforming them into intuitive, scalable systems.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 24, marginTop: 40 }}>
            <a href="mailto:hello@mohammedizhan.com" style={{ fontSize: 14, fontWeight: 600, color: 'var(--fg)', display: 'flex', alignItems: 'center', gap: 6 }}>
              → Email
            </a>
            <a href="/resume/Resume_Izhan.pdf" target="_blank" rel="noreferrer" style={{ fontSize: 14, fontWeight: 600, color: 'var(--fg)', display: 'flex', alignItems: 'center', gap: 6 }}>
              → Resume
            </a>
          </div>
        </div>

        {/* Two-column grid */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px 120px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 80px' }}>

          {/* Left: Experience */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <h3 style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--fg-3)' }}>Experience</h3>
            {experience.map(e => (
              <div key={e.company} style={{ borderBottom: '1px solid var(--line)', paddingBottom: 24 }}>
                <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{e.company}</div>
                <div style={{ fontSize: 13, color: 'var(--fg-3)', lineHeight: 1.6 }}>
                  {e.role}<br />{e.period} ({e.duration})
                </div>
              </div>
            ))}

            {/* Stats */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 8 }}>
              {stats.map(s => (
                <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 24, padding: 24, background: 'var(--bg-card)', borderRadius: 8 }}>
                  <div style={{ flexShrink: 0, textAlign: 'center' }}>
                    <div style={{ fontSize: 48, fontWeight: 800, lineHeight: 1 }}>{s.num}</div>
                    <div style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--fg-3)', marginTop: 8 }}>{s.label}</div>
                  </div>
                  <div style={{ flex: 1, height: 3, background: 'var(--line)', borderRadius: 2 }} />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Skills + Education + Currently */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
            <div>
              <h3 style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: 24 }}>Skills</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {skills.map(s => (
                  <div key={s} style={{ fontSize: 14, color: 'var(--fg-2)', display: 'flex', gap: 10 }}>
                    <span style={{ color: 'var(--fg-4)' }}>•</span> {s}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: 24 }}>Education</h3>
              <div style={{ borderBottom: '1px solid var(--line)', paddingBottom: 24 }}>
                <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>Bachelor of Technology</div>
                <div style={{ fontSize: 13, color: 'var(--fg-3)', lineHeight: 1.6 }}>Industrial Engineering<br />2016 — 2018</div>
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: 24 }}>Currently</h3>
              <p style={{ fontSize: 14, color: 'var(--fg-2)', lineHeight: 1.75 }}>
                Leading PTL rollout across 50+ sites in the Philippines. Architecting warehouse layouts, managing hardware procurement, and coordinating go-live for one of South Asia&apos;s largest FMCG companies.
              </p>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
