import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './index.css';

import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import FeaturedRelease from './sections/FeaturedRelease';
import Discography from './sections/Discography';
import Live from './sections/Live';
import Story from './sections/Story';
import Press from './sections/Press';
import Film from './sections/Film';
import Newsletter from './sections/Newsletter';
import Contact from './sections/Contact';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Wait for all ScrollTriggers to be created
    const timeout = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      
      if (!maxScroll || pinned.length === 0) return;

      // Build ranges and snap targets from pinned sections
      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      // Global snap configuration
      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            // Check if within any pinned range (with buffer)
            const inPinned = pinnedRanges.some(
              r => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            
            // If not in a pinned section, allow free scroll
            if (!inPinned) return value;

            // Find nearest pinned center
            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );

            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    }, 500);

    return () => {
      clearTimeout(timeout);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div className="relative bg-forest">
      {/* Grain Overlay */}
      <div className="grain-overlay" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="relative">
        {/* Section 1: Hero - z-10 */}
        <Hero />
        
        {/* Section 2: Featured Release - z-20 */}
        <FeaturedRelease />
        
        {/* Section 3: Discography - z-30 */}
        <Discography />
        
        {/* Section 4: Live - z-40 */}
        <Live />
        
        {/* Section 5: Story - z-50 */}
        <Story />
        
        {/* Section 6: Press - z-60 (flowing) */}
        <Press />
        
        {/* Section 7: Film - z-70 */}
        <Film />
        
        {/* Section 8: Newsletter - z-80 */}
        <Newsletter />
        
        {/* Section 9: Contact - z-90 (flowing) */}
        <Contact />
      </main>
    </div>
  );
}

export default App;
