import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedRelease() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const card = cardRef.current;
    const title = titleRef.current;
    const quote = quoteRef.current;

    if (!section || !bg || !card || !title || !quote) return;

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
          { scale: 1.10, x: '8vw' },
          { scale: 1.00, x: 0, ease: 'none' },
          0
        )
        .fromTo(card,
          { x: '60vw', opacity: 0, scale: 0.96 },
          { x: 0, opacity: 1, scale: 1, ease: 'power2.out' },
          0
        )
        .fromTo(title,
          { x: '10vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'power2.out' },
          0.08
        )
        .fromTo(quote,
          { y: '10vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'power2.out' },
          0.14
        );

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(card,
          { x: 0, opacity: 1 },
          { x: '-22vw', opacity: 0, ease: 'power2.in' },
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
      className="section-pinned z-20"
      id="music"
    >
      {/* Background Image */}
      <div 
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
      >
        <img 
          src="./release_guitar_02.jpg" 
          alt="Phyl The Kangogo"
          className="w-full h-full object-cover"
        />
        <div className="vignette" />
      </div>

      {/* Poster Card */}
      <div 
        ref={cardRef}
        className="absolute right-[8vw] top-[14vh] w-[38vw] min-h-[72vh] glass-card p-8 md:p-10 flex flex-col justify-center"
      >
        {/* Label */}
        <span className="font-mono text-xs uppercase tracking-[0.14em] text-gold mb-4">
          NEW SINGLE
        </span>

        {/* Title */}
        <h2 
          ref={titleRef}
          className="font-heading font-bold text-cream text-[clamp(32px,3.5vw,56px)] uppercase leading-[1] tracking-[0.01em]"
        >
          POSITIONS
        </h2>

        {/* Meta */}
        <p className="text-cream-muted text-sm mt-6">
          Out now • Available everywhere
        </p>

        {/* CTA */}
        <a 
          href="https://www.youtube.com/channel/UCNUIVmUP4qCAC7Sqd2yGzDg"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary w-fit mt-8 flex items-center gap-2"
        >
          Listen Now
          <ExternalLink size={16} />
        </a>

        {/* Platforms */}
        <div className="mt-8 flex flex-wrap gap-3 text-xs text-cream/60">
          <a href="#" className="link-hover hover:text-gold transition-colors">Spotify</a>
          <span>•</span>
          <a href="#" className="link-hover hover:text-gold transition-colors">Apple Music</a>
          <span>•</span>
          <a href="#" className="link-hover hover:text-gold transition-colors">Boomplay</a>
          <span>•</span>
          <a href="#" className="link-hover hover:text-gold transition-colors">YouTube</a>
        </div>
      </div>

      {/* Quote */}
      <p 
        ref={quoteRef}
        className="absolute left-[7vw] bottom-[12vh] text-cream/80 text-lg md:text-xl italic max-w-[38vw] leading-relaxed"
      >
        "A love letter to choosing each other—again and again."
      </p>
    </section>
  );
}
