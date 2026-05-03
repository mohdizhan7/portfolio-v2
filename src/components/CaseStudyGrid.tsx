'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { caseStudies } from '@/lib/caseStudies';

function ProjectCard({ cs, index }: { cs: typeof caseStudies[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
    >
      <Link href={`/work/${cs.slug}`} className="project">
        <div className="project__cover">
          <Image src={cs.cover} alt={cs.title} fill style={{ objectFit: 'cover' }} sizes="(max-width: 1024px) 50vw, 25vw" />
        </div>
        <div className="project-number">{cs.number}</div>
        <div className="project__bottom">
          <div className="project__icon">{cs.icon}</div>
          <h3 className="project__title">{cs.title}</h3>
          <p className="project__subtitle">{cs.subtitle}</p>
          <div className="project__tags">
            {cs.tags.map(tag => <span key={tag} className="project__tag">{tag}</span>)}
          </div>
          <div className="project__cta">Read case study →</div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function CaseStudyGrid() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });

  return (
    <section id="projects" style={{
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
          <div className="label" style={{ marginBottom: 16 }}>Projects</div>
          <h2 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05 }}>
            Case studies.
          </h2>
        </motion.div>

        <div className="projects__grid">
          {caseStudies.map((cs, i) => <ProjectCard key={cs.slug} cs={cs} index={i} />)}
        </div>
      </div>
    </section>
  );
}
