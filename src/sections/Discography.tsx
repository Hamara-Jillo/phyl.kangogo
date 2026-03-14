import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const releases = [
  { title: 'HeadWraped', type: 'Album', year: '2019' },
  { title: 'Mdogo Mdogo', type: 'Single', year: '2020' },
  { title: 'Kot Nebo', type: 'Single', year: '2021' },
  { title: 'Bwerere', type: 'Single', year: '2022' },
  { title: 'Anyone Gaa', type: 'Single', year: '2023' },
  { title: 'Bipolar', type: 'Single', year: '2024' },
  { title: 'Positions', type: 'Single', year: '2025' },
];

export default function Discography() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const headline = headlineRef.current;
    const underline = underlineRef.current;
    const list = listRef.current;
    const items = itemRefs.current.filter(Boolean);

    if (!section || !bg || !headline || !underline || !list) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE (0% - 30%)
      scrollTl
        .fromTo(bg,
          { scale: 1.08, y: '6vh' },
          { scale: 1.00, y: 0, ease: 'none' },
          0
        )
        .fromTo(headline,
          { x: '-40vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'power2.out' },
          0
        )
        .fromTo(underline,
          { scaleX: 0 },
          { scaleX: 1, ease: 'power2.out' },
          0.10
        )
        .fromTo(list,
          { x: '40vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'power2.out' },
          0.06
        );

      // Stagger items
      items.forEach((item, i) => {
        scrollTl.fromTo(item,
          { x: '6vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'power2.out' },
          0.06 + (i * 0.02)
        );
      });

      // EXIT (70% - 100%)
      scrollTl
        .fromTo([headline, list],
          { y: 0, opacity: 1 },
          { y: '-10vh', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(bg,
          { scale: 1, x: 0 },
          { scale: 1.07, x: '6vw', ease: 'none' },
          0.7
        );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="section-pinned z-30"
    >
      {/* Background Image */}
      <div 
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
      >
        <img 
          src="./discography_guitar_03.jpg" 
          alt="Phyl The Kangogo"
          className="w-full h-full object-cover"
        />
        <div className="vignette" />
      </div>

      {/* Headline Block */}
      <div 
        ref={headlineRef}
        className="absolute left-[7vw] top-[18vh]"
      >
        <h2 className="font-heading font-bold text-cream text-[clamp(34px,3.6vw,56px)] uppercase leading-[1] tracking-[0.01em]">
          DISCOGRAPHY
        </h2>
        <p className="text-cream-muted text-lg mt-4">
          Albums • EPs • Singles
        </p>
        <div 
          ref={underlineRef}
          className="w-[10vw] h-[3px] bg-gold mt-6 origin-left"
        />
      </div>

      {/* Release List */}
      <div 
        ref={listRef}
        className="absolute right-[8vw] top-[18vh] w-[36vw]"
      >
        <div className="glass-card p-6 md:p-8">
          {releases.map((release, index) => (
            <div 
              key={release.title}
              ref={el => { itemRefs.current[index] = el; }}
              className="flex justify-between items-center py-3 border-b border-gold/20 last:border-0 group cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs text-gold">{release.year}</span>
                <span className="text-cream group-hover:text-gold transition-colors">{release.title}</span>
              </div>
              <span className="text-cream-muted text-sm">{release.type}</span>
            </div>
          ))}
          
          <a 
            href="https://www.youtube.com/channel/UCNUIVmUP4qCAC7Sqd2yGzDg"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gold text-sm mt-6 hover:underline"
          >
            View all releases
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
