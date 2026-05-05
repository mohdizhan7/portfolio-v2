'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { m, useInView, AnimatePresence } from 'framer-motion';
import { lenisInstance } from '@/lib/lenisInstance';

const jobs = [
  {
    id: 'stackbox',
    title: 'Assistant Project Manager',
    company: 'StackBOX',
    tenure: '2 yr 7 mo',
    period: 'Sep 2023 — Present',
    logo: '/SBX Logo_PNG.webp',
    work: 'Design and implement warehouse and supply chain process solutions for enterprise FMCG clients including P&G, ITC, and Nestlé across India and the Philippines. Own the full project lifecycle — requirement discovery, BRD documentation, system configuration validation, UAT coordination, and go-live stabilisation. Work closely with product, engineering, and automation vendor teams to ensure solutions are operationally ready before deployment.',
    bullets: [
      'Supported multi-warehouse WMS go-lives for P&G, ITC, and Nestlé — stabilising operations during critical launch phases across India and the Philippines',
      'Led HUL Samadhan automation project end-to-end: UAT across conveyors, sensors, PTL systems, Spring Logic configuration, and WES monitoring',
      'Implemented optimised pick path workflows and system-guided task allocation — ~25% warehouse productivity uplift, 30% faster fulfillment cycle time',
      'Developed KPI dashboards and operational monitoring frameworks using Tableau and Metabase for warehouse performance visibility and SLA adherence',
      'Coordinated cross-functional stakeholders — product teams, automation vendors, and client leadership — ensuring implementation readiness at every stage',
      'Currently leading nationwide PTL rollout across 50+ Philippines sites: warehouse layout design, PTL hardware planning, infrastructure and manpower calculations, and WMS implementation',
      'Managing Philippines implementation partner network — creating training manuals, delivering system and process training to consultants, and supervising day-to-day rollout activities',
    ],
    highlightLabel: 'Currently',
    highlight: 'Sole implementation lead for a nationwide PTL rollout across 50+ sites in the Philippines. Managing vendor coordination, partner training, remote commissioning, and WMS go-live for a major pharmaceutical client.',
  },
  {
    id: 'edgistify',
    title: 'Manager, Solution Design',
    company: 'Edgistify',
    tenure: '1 yr 1 mo',
    period: 'Aug 2022 — Sep 2023',
    logo: '/Edgistify Logo.webp',
    work: 'Designed end-to-end logistics and fulfillment solutions for 3PL, FMCG, and e-commerce clients — covering inbound operations, storage optimisation, inventory management, and outbound distribution. Led solution architecture for scalable supply chain networks and developed warehouse network planning models including manpower, infrastructure, and full operational cost modelling. Liaised between clients, sales leads, and the solution design head to scope, present, and finalise proposals.',
    bullets: [
      'Designed nationwide supply chain operating model for a solar panel manufacturer expanding across Tier 2 and Tier 3 cities — including warehouse network design, manpower planning, and last-mile distribution strategy',
      'Developed warehouse network planning models covering infrastructure requirements, manpower sizing, and operational cost modelling for enterprise clients',
      'Utilised advanced Excel and data analysis to simulate operational scenarios, identify efficiency improvements, and support client decision-making',
      'Led process redesign initiatives that improved warehouse productivity and reduced operational bottlenecks across multiple client sites',
      'Enabled 15–20% reduction in operational overhead through WMS process standardisation and workflow automation',
      'Reviewed performance metrics regularly — identifying improvement opportunities and presenting findings to client and internal stakeholders',
      'Built and presented solution proposals to clients and sales leadership, participating in requirement sessions, system demos, and UAT reviews',
    ],
    highlightLabel: 'Outcome',
    highlight: '99%+ order and inventory accuracy using system-guided workflows and barcode tracking. 15–20% reduction in operational overhead through WMS standardisation. Solar panel manufacturer\'s national supply chain model delivered in full.',
  },
  {
    id: 'mindseed',
    title: 'Manager, Procurement & Supply Chain',
    company: 'Mindseed Education',
    tenure: '8 mo',
    period: 'Dec 2021 — Aug 2022',
    logo: '/Mindseed Education Overview.webp',
    work: 'Built and led the centralised procurement function for a fast-growing EdTech company operating across 30+ school locations. Managed vendor sourcing, contract negotiations, and supply coordination for infrastructure and operational supplies. Implemented vendor consolidation and centralised planning processes to replace fragmented manual workflows. Introduced reporting systems and cost benchmarks to give senior management clear visibility into procurement spend and efficiency.',
    bullets: [
      'Managed 45+ vendors — coordinating nationwide procurement and supply chain operations across all school locations',
      'Negotiated supplier contracts achieving ~15% procurement cost savings through strategic sourcing and consolidation',
      'Implemented vendor consolidation and centralised procurement planning — replacing fragmented manual processes with a unified system',
      'Built real-time Google Sheets inventory tracking and spend dashboard, adopted daily by finance and operations teams',
      'Reduced procurement cycle time from 14 days to 4 days through process standardisation and pre-approved vendor lists',
      'Performed cost analysis and set benchmarks across supply categories to drive continuous cost reduction',
      'Developed and executed procurement strategies across all channels to improve purchasing efficiency and control',
    ],
    highlightLabel: 'Outcome',
    highlight: '~15% procurement cost savings in 8 months. Procurement cycle time cut from 14 days to 4. Centralised planning scaled with the business — no more firefighting.',
  },
  {
    id: 'dtdc',
    title: 'Branch Manager',
    company: 'DTDC Express',
    tenure: '2 yr',
    period: 'Jan 2020 — Dec 2021',
    logo: '/DTDC Express Limited Logo.webp',
    work: 'Managed one of Mumbai\'s largest DTDC branches — 45,000–60,000 shipments daily, 50 employees, and 70 delivery vehicles. One of the youngest Branch Managers in the DTDC network. Full responsibility for inbound and outbound operations, routing, dispatch planning, SLA adherence, customer escalation management, and P&L ownership. Engaged across three aligned teams — sales, accounts, and operations — to support strategy and execution.',
    bullets: [
      'Led 50 employees and 70 delivery vehicles — maintained 95–98% on-time delivery, 90–95% first-attempt success, and <0.5% damage rate',
      'Cleared 150,000 shipment backlog in 7 days during COVID by building an alternative last-mile delivery network from scratch in 48 hours',
      'Optimised routing, dispatch planning, and workflows — reducing delivery delays and improving throughput across the hub',
      'Implemented 5S and RCA (Root Cause Analysis) processes to proactively address operational issues before they escalated',
      'Assessed employee performance and developed improvement plans — maintaining team productivity under high-pressure conditions',
      'Resolved escalated customer issues and improved service levels by 20% through targeted operational interventions',
      'Recognised as one of the youngest Branch Managers in the DTDC network for managing a high-volume logistics hub',
    ],
    highlightLabel: 'The Crisis',
    highlight: 'During the first COVID wave, Mumbai\'s last-mile collapsed entirely. Built an alternative last-mile network using local partners with idle two-wheelers in 48 hours. Cleared 150,000 shipments in 7 days. Maintained 95–98% on-time delivery throughout with zero customer escalations.',
  },
];

type Job = typeof jobs[0];

function WorkModal({ job, onClose }: { job: Job; onClose: () => void }) {
  const [fullScreen, setFullScreen] = useState(false);

  // Scroll lock — only on mount/unmount, never re-runs
  useEffect(() => {
    lenisInstance.current?.stop();
    document.body.style.overflow = 'hidden';
    return () => {
      lenisInstance.current?.start();
      document.body.style.overflow = '';
    };
  }, []);

  // Keyboard handler — separate so scroll lock isn't affected by dep changes
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') fullScreen ? setFullScreen(false) : onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, fullScreen]);

  return createPortal(
    <>
      {/* Backdrop */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={() => fullScreen ? setFullScreen(false) : onClose()}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(10,10,10,0.45)',
          backdropFilter: 'blur(4px)',
          zIndex: 150,
        }}
      />

      {/* Modal — use framer x/y for centering to avoid CSS transform conflict */}
      <m.div
        initial={{ opacity: 0, scale: 0.96, x: '-50%', y: '-50%' }}
        animate={fullScreen
          ? { opacity: 1, scale: 1, x: 0, y: 0 }
          : { opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
        exit={{ opacity: 0, scale: 0.96, x: '-50%', y: '-50%' }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent
        style={{
          position: 'fixed',
          zIndex: 151,
          background: 'var(--bg)',
          overflowY: 'auto',
          ...(fullScreen ? {
            inset: 0,
            borderRadius: 0,
            border: 'none',
          } : {
            top: '50%',
            left: '50%',
            width: 'min(820px, 92vw)',
            maxHeight: '85vh',
            borderRadius: 12,
            border: '1px solid var(--line)',
          }),
        }}
      >
        {/* Modal header */}
        <div style={{
          position: 'sticky', top: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 24px',
          background: 'var(--bg)',
          borderBottom: '1px solid var(--line-2)',
          zIndex: 1,
        }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--fg-4)' }}>
            Work History
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* Full-screen toggle */}
            <button
              onClick={() => setFullScreen(v => !v)}
              title={fullScreen ? 'Minimise' : 'Full page view'}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: 'none', border: '1px solid var(--line)',
                borderRadius: 6, padding: '5px 10px',
                cursor: 'pointer', color: 'var(--fg-3)',
                fontSize: 11, fontWeight: 600, letterSpacing: '0.06em',
                transition: 'border-color 0.2s, color 0.2s',
              }}
            >
              {fullScreen ? (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/>
                    <line x1="10" y1="14" x2="3" y2="21"/><line x1="21" y1="3" x2="14" y2="10"/>
                  </svg>
                  Minimise
                </>
              ) : (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/>
                    <line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
                  </svg>
                  Full page
                </>
              )}
            </button>
            {/* Close */}
            <button
              onClick={onClose}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 30, height: 30,
                background: 'none', border: '1px solid var(--line)',
                borderRadius: 6, cursor: 'pointer',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--fg-3)" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: fullScreen ? '48px clamp(24px, 8vw, 160px)' : '28px 28px 40px' }}>

          {/* Logo + identity */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, marginBottom: 24 }}>
            <div style={{
              width: 68, height: 68, flexShrink: 0,
              background: '#fff',
              border: '1px solid var(--line)',
              borderRadius: 10,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden',
            }}>
              <Image src={job.logo} alt={job.company} width={52} height={52} style={{ objectFit: 'contain', padding: 8 }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h2 style={{
                fontSize: fullScreen ? 'clamp(24px, 3vw, 40px)' : 'clamp(18px, 3vw, 24px)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
                marginBottom: 6,
                transition: 'font-size 0.4s',
              }}>
                {job.title}
              </h2>
              <div style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-3)' }}>
                {job.company}
              </div>
            </div>
          </div>

          {/* Period + tenure */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            paddingBottom: 24, marginBottom: 28,
            borderBottom: '1px solid var(--line)',
          }}>
            <span style={{ fontSize: 13, color: 'var(--fg-3)', letterSpacing: '0.04em' }}>{job.period}</span>
            <span style={{
              fontSize: 11, fontWeight: 600, color: 'var(--fg-4)',
              background: 'var(--bg-card)', border: '1px solid var(--line)',
              padding: '3px 8px', borderRadius: 20, letterSpacing: '0.04em',
            }}>
              {job.tenure}
            </span>
          </div>

          {/* Two-column in fullscreen, single column in modal */}
          <div style={{
            display: fullScreen ? 'grid' : 'block',
            gridTemplateColumns: fullScreen ? '1fr 1fr' : undefined,
            gap: fullScreen ? '0 48px' : undefined,
          }}>
            {/* The Work */}
            <div style={{ marginBottom: 28 }}>
              <span style={{
                display: 'block', fontSize: 10, fontWeight: 700,
                letterSpacing: '0.2em', textTransform: 'uppercase',
                color: 'var(--fg-4)', marginBottom: 12,
              }}>
                The Work
              </span>
              <p style={{ fontSize: 14, lineHeight: 1.75, color: 'var(--fg-2)', marginBottom: 20 }}>
                {job.work}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {job.bullets.map((b, i) => (
                  <li key={i} style={{ display: 'flex', gap: 12, fontSize: 13, color: 'var(--fg-2)', lineHeight: 1.6 }}>
                    <span style={{ color: 'var(--fg-4)', flexShrink: 0, marginTop: 1 }}>→</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {/* Highlight */}
            <div>
              <div style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--line)',
                borderRadius: 8,
                padding: '18px 20px',
              }}>
                <span style={{
                  display: 'block', fontSize: 10, fontWeight: 700,
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: 'var(--fg-4)', marginBottom: 10,
                }}>
                  {job.highlightLabel}
                </span>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--fg-2)', margin: 0 }}>
                  {job.highlight}
                </p>
              </div>
            </div>
          </div>

        </div>
      </m.div>
    </>,
    document.body
  );
}

function JobCard({ job, index, onOpen }: { job: Job; index: number; onOpen: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: index * 0.06 }}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      onClick={onOpen}
      className={`exp__item${expanded ? ' is-expanded' : ''}`}
      style={{ cursor: 'pointer' }}
    >
      <div className="exp__image-wrap">
        <div className="exp__image">
          <Image
            src={job.logo}
            alt={job.company}
            width={200}
            height={200}
            style={{ objectFit: 'contain', padding: expanded ? 16 : 10, width: '100%', height: '100%', transition: 'padding 0.38s cubic-bezier(0.4,0,0.2,1)' }}
          />
        </div>
      </div>

      <div className="exp__content">
        <div className="exp__header">
          <h3 className="exp__title">{job.title}</h3>
          <span className="exp__tenure">{job.tenure}</span>
          <span className="exp__period">{job.period}</span>
        </div>
        <div className="exp__company">{job.company}</div>

        <div className={`exp__expand${expanded ? ' exp__expand--open' : ''}`}>
          <div className="exp__expand-inner">
            <div>
              <span className="exp__expand-label">The Work</span>
              <p className="exp__expand-text">{job.work}</p>
            </div>
            <div className="exp__expand-highlight">
              <span className="exp__expand-label">{job.highlightLabel}</span>
              <p className="exp__expand-text">{job.highlight}</p>
            </div>
          </div>
        </div>
      </div>
    </m.div>
  );
}

export default function WorkHistory() {
  const [activeJob, setActiveJob] = useState<Job | null>(null);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });

  return (
    <section id="work" style={{ padding: '80px 64px 60px' }}>
      <div style={{ maxWidth: 1100, width: '100%', margin: '0 auto' }}>

        <m.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="label" style={{ marginBottom: 16 }}>Work</div>
          <div className="exp__section-header">
            <h2 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05 }}>
              History.
            </h2>
            <span className="exp__total-badge">✦ Years of Experience → <b>6+</b></span>
          </div>
        </m.div>

        <div className="exp__list">
          {jobs.map((job, i) => (
            <JobCard key={job.id} job={job} index={i} onOpen={() => setActiveJob(job)} />
          ))}
        </div>

      </div>

      <AnimatePresence>
        {activeJob && <WorkModal job={activeJob} onClose={() => setActiveJob(null)} />}
      </AnimatePresence>
    </section>
  );
}
