'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

const jobs = [
  {
    id: 'stackbox',
    title: 'Assistant Project Manager',
    company: 'StackBOX',
    tenure: '2 yr 7 mo',
    period: 'Sep 2023 — Present',
    logo: '/SBX Logo_PNG.webp',
    work: 'WMS implementations for P&G, ITC, and Nestlé. Warehouse layouts, hardware planning, system config, and go-live.',
    highlightLabel: 'Currently',
    highlight: 'PTL rollout across 50+ sites in the Philippines — sole implementation lead.',
  },
  {
    id: 'edgistify',
    title: 'Manager, Solution Design',
    company: 'Edgistify',
    tenure: '1 yr 1 mo',
    period: 'Aug 2022 — Sep 2023',
    logo: '/Edgistify Logo.webp',
    work: 'End-to-end supply chain solution design for 3PL and e-commerce clients. BRD, UAT, and go-live across 12+ warehouses.',
    highlightLabel: 'Outcome',
    highlight: '25% avg productivity uplift. 5 concurrent go-lives. 18% reduction in implementation cost.',
  },
  {
    id: 'mindseed',
    title: 'Manager, Procurement & Supply Chain',
    company: 'Mindseed Education',
    tenure: '8 mo',
    period: 'Dec 2021 — Aug 2022',
    logo: '/Mindseed Education Overview.webp',
    work: 'Built centralised procurement from scratch. Renegotiated 45+ vendor contracts, standardised SKUs, built real-time spend tracker.',
    highlightLabel: 'Outcome',
    highlight: '~15% cost savings. Procurement now scales with the business instead of firefighting.',
  },
  {
    id: 'dtdc',
    title: 'Branch Manager',
    company: 'DTDC Express',
    tenure: '2 yr',
    period: 'Jan 2020 — Dec 2021',
    logo: '/DTDC Express Limited Logo.webp',
    work: '50 staff, 70 vehicles, 60K shipments/day. One of the youngest branch managers in the DTDC network.',
    highlightLabel: 'The Crisis',
    highlight: 'Built an alternative last-mile network in 48h during COVID. Cleared 150K backlog in 7 days. 98% on-time delivery.',
  },
];

function JobCard({ job, index }: { job: typeof jobs[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -48 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
      onClick={() => setExpanded(v => !v)}
      className={`exp__item${expanded ? ' is-expanded' : ''}`}
      style={{ cursor: 'pointer' }}
    >
      <div className="exp__image-wrap">
        <div className="exp__image">
          <Image src={job.logo} alt={job.company} width={200} height={200} style={{ objectFit: 'contain', padding: expanded ? 16 : 10, width: '100%', height: '100%' }} />
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
    </motion.div>
  );
}

export default function WorkHistory() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });

  return (
    <section id="work" style={{
      minHeight: '100vh',
      padding: '120px 48px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{ maxWidth: 1200, width: '100%', margin: '0 auto' }}>

        <motion.div
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
        </motion.div>

        <div className="exp__list">
          {jobs.map((job, i) => <JobCard key={job.id} job={job} index={i} />)}
        </div>

      </div>
    </section>
  );
}
