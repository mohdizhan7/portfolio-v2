'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="contact" style={{
      minHeight: '60vh',
      padding: '120px 48px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderTop: '1px solid var(--line)',
    }}>
      <div style={{ maxWidth: 1200, width: '100%', margin: '0 auto' }} ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="label" style={{ marginBottom: 16 }}>Get In Touch</div>
          <h2 className="contact__heading" style={{
            fontSize: 'clamp(40px, 5vw, 64px)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
          }}>
            Let&apos;s talk.
          </h2>
        </motion.div>

        <div className="contact__grid">
          {[
            { label: 'mohdizhan7@gmail.com', href: 'mailto:mohdizhan7@gmail.com' },
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mohmmedizhan/' },
          ].map((item, i) => (
            <motion.a
              key={item.href}
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
              className="contact__link"
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.15 + i * 0.1 }}
            >
              {item.label}
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
