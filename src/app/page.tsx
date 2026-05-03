import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import WorkHistory from '@/components/WorkHistory';
import CaseStudyGrid from '@/components/CaseStudyGrid';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <>
      <div className="scroll-bar" />
      <Nav />
      <main>
        <Hero />
        <WorkHistory />
        <CaseStudyGrid />
        <Contact />
      </main>
    </>
  );
}
