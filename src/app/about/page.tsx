import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import ToolsLogoLoop from '@/components/ToolsLogoLoop';

export const metadata: Metadata = {
  title: 'About — Mohammed Izhan Shaikh',
  description: 'Project Manager specializing in supply chain, warehouse operations, and process design. 6+ years building operations that scale.',
  openGraph: {
    title: 'About — Mohammed Izhan Shaikh',
    description: 'Project Manager specializing in supply chain, warehouse operations, and process design.',
    url: 'https://mohmmedizhan.com/about',
  },
};


const APPROACH = [
  {
    title: 'Structured Thinking',
    body: 'Map the full system before touching any part of it. Solutions that fix one thing and break three others aren\'t solutions.',
  },
  {
    title: 'Process-First Mindset',
    body: 'A warehouse runs on its processes, not its tools. Get the workflow right first — the software follows.',
  },
  {
    title: 'Data-Driven Decisions',
    body: 'Gut feel gets you started. Data gets you repeatable. KPI dashboards aren\'t overhead — they\'re how you know.',
  },
  {
    title: 'Outcome-Focused Execution',
    body: 'I measure against results, not activity. Go-live is the beginning, not the end.',
  },
];

const SKILLS = {
  competencies: [
    'WMS Implementation & Go-Live',
    'TMS Rollout & Integration',
    'Warehouse Layout Design',
    'Process Design & Optimisation',
    'Enterprise UAT Management',
    'KPI Dashboard Design',
    'Last-Mile Logistics',
    'Change Management',
    'BRD Documentation',
    'Team Leadership',
    'Supply Chain Network Design',
    'Go-Live Coordination',
  ],
  tools: [
    'Excel', 'SQL', 'Metabase', 'Python',
    'Postman', 'Google Sheets', 'ClickHouse',
    'PostgreSQL', 'Jira', 'Setu', 'Scribe', 'Power BI',
  ],
};

const HOW_I_WORK = [
  ['Structured', 'chaotic'],
  ['Practical', 'theoretical'],
  ['Ownership', 'delegation'],
  ['Clarity', 'complexity'],
];

const EXPERIENCE = [
  { company: 'StackBox',            role: 'Assistant Project Manager',         period: 'Sep 2023 — Present',   duration: '2yr 7mo' },
  { company: 'Edgistify',           role: 'Manager, Solution Design',          period: 'Aug 2022 — Sep 2023',  duration: '1yr 1mo' },
  { company: 'Mindseed Education',  role: 'Manager, Procurement & Supply Chain', period: 'Dec 2021 — Aug 2022', duration: '8mo' },
  { company: 'DTDC Express',        role: 'Branch Manager',                    period: 'Jan 2020 — Dec 2021',  duration: '2yr' },
];

const LABEL: React.CSSProperties = {
  fontSize: 11, fontWeight: 700, letterSpacing: '0.2em',
  textTransform: 'uppercase', color: 'var(--fg-3)',
};

const SECTION: React.CSSProperties = {
  maxWidth: 1100, margin: '0 auto',
  padding: '80px clamp(24px, 4.5vw, 64px)',
  borderBottom: '1px solid var(--line)',
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: 80 }}>

        {/* ── 1. HERO ─────────────────────────────────────────────────── */}
        <div style={{ ...SECTION, borderBottom: 'none', paddingBottom: 48 }}>
          <p style={LABEL}>About</p>
          <h1 style={{
            fontSize: 'clamp(44px, 7vw, 80px)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            maxWidth: 820,
            marginTop: 20,
            marginBottom: 28,
          }}>
            I build systems that make operations scale.
          </h1>
          <p style={{
            fontSize: 'clamp(17px, 2vw, 20px)',
            color: 'var(--fg-2)',
            maxWidth: 580,
            lineHeight: 1.55,
          }}>
            Project Manager specialising in supply chain, warehouse operations, and process design.
          </p>
        </div>

        {/* ── 2. QUICK INTRO ──────────────────────────────────────────── */}
        <div style={{ ...SECTION, paddingTop: 56, paddingBottom: 56 }}>
          <p style={{
            fontSize: 'clamp(19px, 2.4vw, 24px)',
            fontWeight: 500,
            lineHeight: 1.65,
            letterSpacing: '-0.01em',
            color: 'var(--fg)',
            maxWidth: 780,
          }}>
            I work at the intersection of operations, technology, and execution —
            turning <strong style={{ fontWeight: 700 }}>complex workflows</strong> into
            scalable systems. Six years across DTDC, Mindseed, Edgistify, and StackBox
            have taught me that the gap between a good plan and a working operation
            is almost always <strong style={{ fontWeight: 700 }}>execution discipline</strong>.
          </p>
        </div>

        {/* ── Tools banner ────────────────────────────────────────────── */}
        <ToolsLogoLoop />

        {/* ── 3. MY APPROACH ──────────────────────────────────────────── */}
        <div style={SECTION}>
          <p style={{ ...LABEL, marginBottom: 40 }}>My Approach</p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 16,
          }} className="approach-grid">
            {APPROACH.map((card) => (
              <div key={card.title} style={{
                padding: '28px 32px',
                background: 'var(--bg-card)',
                border: '1px solid var(--line)',
                borderRadius: 8,
              }}>
                <div style={{
                  fontSize: 15, fontWeight: 700,
                  letterSpacing: '-0.01em',
                  marginBottom: 10,
                  color: 'var(--fg)',
                }}>
                  {card.title}
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--fg-2)', margin: 0 }}>
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── 4. WHAT DRIVES ME ───────────────────────────────────────── */}
        <div style={SECTION}>
          <p style={{ ...LABEL, marginBottom: 32 }}>What Drives Me</p>
          <div style={{ maxWidth: 680, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--fg-2)', margin: 0 }}>
              Operations isn&apos;t glamorous — it&apos;s early mornings, floor-level problems, and
              decisions made with incomplete data. What drives me is the moment a warehouse that
              was <strong style={{ color: 'var(--fg)', fontWeight: 600 }}>chaotic becomes predictable</strong>.
              When a team that was firefighting every day starts running on process.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--fg-2)', margin: 0 }}>
              I care about building things that outlast my involvement.
              Not heroics — <strong style={{ color: 'var(--fg)', fontWeight: 600 }}>systems</strong>.
            </p>
          </div>
        </div>

        {/* ── 5. HOW I WORK ───────────────────────────────────────────── */}
        <div style={SECTION}>
          <p style={{ ...LABEL, marginBottom: 40 }}>How I Work</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {HOW_I_WORK.map(([pref, not]) => (
              <div key={pref} style={{
                display: 'flex', alignItems: 'center', gap: 16,
                padding: '20px 0',
                borderBottom: '1px solid var(--line)',
              }}>
                <span style={{ fontSize: 'clamp(18px, 2.5vw, 24px)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--fg)', minWidth: 160 }}>
                  {pref}
                </span>
                <span style={{ fontSize: 13, color: 'var(--fg-4)', fontWeight: 600 }}>over</span>
                <span style={{ fontSize: 'clamp(16px, 2vw, 20px)', fontWeight: 400, color: 'var(--fg-3)', letterSpacing: '-0.01em' }}>
                  {not}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── 6. SKILLS & TOOLS ───────────────────────────────────────── */}
        <div style={SECTION}>
          <p style={{ ...LABEL, marginBottom: 40 }}>Skills & Tools</p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '40px 80px',
          }} className="skills-grid">

            {/* Core Competencies */}
            <div>
              <p style={{ ...LABEL, marginBottom: 20, color: 'var(--fg-4)' }}>Core Competencies</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {SKILLS.competencies.map(s => (
                  <span key={s} style={{
                    fontSize: 12, fontWeight: 600,
                    letterSpacing: '0.04em',
                    padding: '6px 12px',
                    border: '1px solid var(--line)',
                    borderRadius: 4,
                    color: 'var(--fg-2)',
                    background: 'var(--bg-card)',
                  }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div>
              <p style={{ ...LABEL, marginBottom: 20, color: 'var(--fg-4)' }}>Tools & Software</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {SKILLS.tools.map(t => (
                  <span key={t} style={{
                    fontSize: 12, fontWeight: 700,
                    letterSpacing: '0.04em',
                    padding: '6px 12px',
                    border: '1px solid var(--line)',
                    borderRadius: 4,
                    color: 'var(--fg)',
                    background: 'transparent',
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ── 7. CURRENT FOCUS ────────────────────────────────────────── */}
        <div style={{ ...SECTION, paddingTop: 56, paddingBottom: 56 }}>
          <p style={{ ...LABEL, marginBottom: 20 }}>Current Focus</p>
          <p style={{
            fontSize: 'clamp(18px, 2.2vw, 22px)',
            fontWeight: 500,
            lineHeight: 1.55,
            letterSpacing: '-0.01em',
            color: 'var(--fg)',
            maxWidth: 620,
          }}>
            Exploring data, dashboards, and system design for better
            decision-making in warehouse and supply chain operations.
          </p>
        </div>

        {/* ── 7. CTA ──────────────────────────────────────────────────── */}
        <div style={{ ...SECTION, borderBottom: 'none', paddingTop: 64, paddingBottom: 96 }}>
          <p style={{
            fontSize: 'clamp(26px, 4vw, 44px)',
            fontWeight: 700,
            letterSpacing: '-0.025em',
            lineHeight: 1.2,
            maxWidth: 640,
            marginBottom: 36,
          }}>
            Let&apos;s connect if you&apos;re building or scaling operations.
          </p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <a href="mailto:mohdizhan7@gmail.com" style={{
              fontSize: 14, fontWeight: 700, letterSpacing: '0.02em',
              padding: '12px 28px',
              background: 'var(--fg)', color: 'var(--bg)',
              borderRadius: 4, textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center',
            }}>
              Email Me
            </a>
            <a href="/resume.pdf" target="_blank" rel="noreferrer" style={{
              fontSize: 14, fontWeight: 700, letterSpacing: '0.02em',
              padding: '11px 28px',
              background: 'transparent', color: 'var(--fg)',
              border: '1.5px solid var(--fg)',
              borderRadius: 4, textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center',
            }}>
              View Resume
            </a>
          </div>
        </div>

        {/* ── Experience (reference) ──────────────────────────────────── */}
        <div style={{
          maxWidth: 1100, margin: '0 auto',
          padding: '64px clamp(24px, 4.5vw, 64px) 96px',
          borderTop: '1px solid var(--line)',
        }}>
          <p style={{ ...LABEL, marginBottom: 40 }}>Experience</p>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {EXPERIENCE.map((e) => (
              <div key={e.company} style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: '4px 24px',
                padding: '20px 0',
                borderBottom: '1px solid var(--line)',
                alignItems: 'start',
              }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4, color: 'var(--fg)' }}>
                    {e.company}
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--fg-3)' }}>{e.role}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 13, color: 'var(--fg-3)', whiteSpace: 'nowrap' }}>{e.period}</div>
                  <div style={{
                    display: 'inline-block', marginTop: 4,
                    fontSize: 11, fontWeight: 600, color: 'var(--fg-4)',
                    background: 'var(--bg-card)', border: '1px solid var(--line)',
                    padding: '2px 8px', borderRadius: 20, letterSpacing: '0.04em',
                  }}>
                    {e.duration}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
    </>
  );
}
