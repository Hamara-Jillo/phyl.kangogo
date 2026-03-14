import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Mic2, Users, Building2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const credits = [
  { icon: Mic2, text: 'The Alchemist Bar (Nairobi) residency' },
  { icon: Users, text: 'East African festivals & showcases' },
  { icon: Building2, text: 'Corporate events & brand activations' },
];

export default function Live() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const headline = headlineRef.current;
    const card = cardRef.current;
    const quote = quoteRef.current;

    if (!section || !bg || !headline || !card || !quote) return;

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
          { scale: 1.10, x: '-6vw' },
          { scale: 1.00, x: 0, ease: 'none' },
          0
        )
        .fromTo(headline,
          { x: '-35vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'power2.out' },
          0
        )
        .fromTo(card,
          { x: '50vw', opacity: 0, scale: 0.98 },
          { x: 0, opacity: 1, scale: 1, ease: 'power2.out' },
          0.06
        )
        .fromTo(quote,
          { y: '10vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'power2.out' },
          0.16
        );

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(headline,
          { x: 0, opacity: 1 },
          { x: '-14vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(card,
          { x: 0, opacity: 1 },
          { x: '14vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(quote,
          { opacity: 1 },
          { opacity: 0, ease: 'power2.in' },
          0.75
        )
        .fromTo(bg,
          { scale: 1, y: 0 },
          { scale: 1.06, y: '4vh', ease: 'none' },
          0.7
        );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="section-pinned z-40"
      id="live"
    >
      {/* Background Image */}
      <div 
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
      >
        <img 
          src="./live_guitar_04.jpg" 
          alt="Phyl The Kangogo Live"
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
          LIVE
        </h2>
        <p className="text-cream-muted text-lg mt-4">
          Festivals • Clubs • Corporate • Private
        </p>
      </div>

      {/* Performance Card */}
      <div 
        ref={cardRef}
        className="absolute right-[8vw] top-[18vh] w-[36vw]"
      >
        <div className="glass-card p-6 md:p-8">
          <h3 className="font-heading font-semibold text-cream text-xl uppercase tracking-wide mb-6">
            Performance Credits
          </h3>
          
          <div className="space-y-4">
            {credits.map((credit, index) => (
              <div key={index} className="flex items-start gap-4">
                <credit.icon className="text-gold mt-1 flex-shrink-0" size={20} />
                <span className="text-cream/80">{credit.text}</span>
              </div>
            ))}
          </div>

          <a 
            href="#contact"
            className="btn-primary w-full mt-8 flex items-center justify-center gap-2"
          >
            <Calendar size={18} />
            Book Phyl
          </a>
        </div>
      </div>

      {/* Quote */}
      <p 
        ref={quoteRef}
        className="absolute left-[7vw] bottom-[12vh] text-cream/80 text-lg md:text-xl italic max-w-[40vw] leading-relaxed"
      >
        "A live set that turns a room into a sing-along."
      </p>
    </section>
  );
}
