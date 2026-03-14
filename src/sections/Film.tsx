import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Film as FilmIcon, Music, Clapperboard, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const credits = [
  { icon: Clapperboard, title: 'Cheza', year: '2022', role: 'Actor' },
  { icon: FilmIcon, title: 'Tom, Dick & Harrie', year: '2021', role: 'Actor + Composer' },
  { icon: Music, title: 'Present Chronicles Love Gone Sour', year: '2021', role: 'Composer' },
];

export default function Film() {
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
          { scale: 1.08, x: '6vw' },
          { scale: 1.00, x: 0, ease: 'none' },
          0
        )
        .fromTo(headline,
          { x: '-35vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'power2.out' },
          0
        )
        .fromTo(card,
          { x: '50vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'power2.out' },
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
          { scale: 1.06, y: '-3vh', ease: 'none' },
          0.7
        );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="section-pinned z-[70]"
      id="film"
    >
      {/* Background Image */}
      <div 
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
      >
        <img 
          src="./film_guitar_06.jpg" 
          alt="Phyl The Kangogo Film"
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
          FILM & TV
        </h2>
        <p className="text-cream-muted text-lg mt-4">
          Acting • Scoring • Soundtracks
        </p>
      </div>

      {/* Film Card */}
      <div 
        ref={cardRef}
        className="absolute right-[8vw] top-[18vh] w-[36vw]"
      >
        <div className="glass-card p-6 md:p-8">
          <h3 className="font-heading font-semibold text-cream text-xl uppercase tracking-wide mb-6">
            Selected Credits
          </h3>
          
          <div className="space-y-5">
            {credits.map((credit, index) => (
              <div key={index} className="flex items-start gap-4 group">
                <credit.icon className="text-gold mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="text-cream group-hover:text-gold transition-colors">
                    {credit.title} ({credit.year})
                  </p>
                  <p className="text-cream-muted text-sm">{credit.role}</p>
                </div>
              </div>
            ))}
          </div>

          <a 
            href="https://www.imdb.com/name/nm15706849/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gold text-sm mt-6 hover:underline"
          >
            View IMDb
            <ExternalLink size={16} />
          </a>
        </div>
      </div>

      {/* Quote */}
      <p 
        ref={quoteRef}
        className="absolute left-[7vw] bottom-[12vh] text-cream/80 text-lg md:text-xl italic max-w-[40vw] leading-relaxed"
      >
        "Music that carries a scene. Presence that holds a frame."
      </p>
    </section>
  );
}