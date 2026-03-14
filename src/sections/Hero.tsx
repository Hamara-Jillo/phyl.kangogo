import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Youtube, Music2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const microRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const content = contentRef.current;
    const headline = headlineRef.current;
    const tagline = taglineRef.current;
    const cta = ctaRef.current;
    const micro = microRef.current;

    if (!section || !bg || !content || !headline || !tagline || !cta || !micro) return;

    const ctx = gsap.context(() => {
      // Initial load animation
      const loadTl = gsap.timeline();
      
      loadTl
        .fromTo(bg, 
          { opacity: 0, scale: 1.06 }, 
          { opacity: 1, scale: 1, duration: 1.1, ease: 'power2.out' }
        )
        .fromTo(headline.querySelectorAll('.word'),
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.06, duration: 0.9, ease: 'power2.out' },
          '-=0.7'
        )
        .fromTo([tagline, cta],
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
          '-=0.5'
        )
        .fromTo(micro,
          { opacity: 0 },
          { opacity: 1, duration: 0.5 },
          '-=0.3'
        );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements when scrolling back to top
            gsap.set([headline, tagline, cta, micro], { opacity: 1, x: 0 });
            gsap.set(bg, { scale: 1, x: 0 });
          }
        }
      });

      // EXIT phase (70% - 100%)
      scrollTl
        .fromTo([headline, tagline, cta],
          { x: 0, opacity: 1 },
          { x: '-18vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(micro,
          { opacity: 1 },
          { opacity: 0, ease: 'power2.in' },
          0.75
        )
        .fromTo(bg,
          { scale: 1, x: 0 },
          { scale: 1.08, x: '-6vw', ease: 'none' },
          0.7
        );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="section-pinned z-10"
      id="home"
    >
      {/* Background Image */}
      <div 
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0 }}
      >
        <img 
          src="./hero_guitar_01.jpg" 
          alt="Phyl The Kangogo"
          className="w-full h-full object-cover"
          style={{ objectPosition: '62% 40%' }}
        />
        <div className="vignette" />
      </div>

      {/* Content */}
      <div 
        ref={contentRef}
        className="relative z-10 w-full h-full flex flex-col justify-center px-[7vw]"
      >
        {/* Headline */}
        <h1 
          ref={headlineRef}
          className="font-heading font-bold uppercase text-cream text-[clamp(44px,5vw,76px)] leading-[0.95] tracking-[0.02em] max-w-[44vw]"
          style={{ marginTop: '2vh' }}
        >
          <span className="word inline-block">PHYL</span>{' '}
          <span className="word inline-block">THE</span>{' '}
          <span className="word inline-block">KANGOGO</span>
        </h1>

        {/* Tagline */}
        <p 
          ref={taglineRef}
          className="mt-6 text-cream/90 text-lg md:text-xl tracking-wide"
          style={{ marginTop: '4vh' }}
        >
          Singer • Songwriter • Guitarist • Actor
        </p>

        {/* CTA Buttons */}
        <div 
          ref={ctaRef}
          className="flex flex-wrap gap-4 mt-8"
          style={{ marginTop: '5vh' }}
        >
          <a 
            href="https://www.youtube.com/channel/UCNUIVmUP4qCAC7Sqd2yGzDg" 
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Stream Latest
          </a>
          <a 
            href="#videos"
            className="btn-outline"
          >
            Watch Videos
          </a>
        </div>
      </div>

      {/* Micro info */}
      <div 
        ref={microRef}
        className="absolute bottom-[6vh] left-[7vw] z-10"
      >
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-cream/60">
          phylthekangogo.com
        </p>
        <p className="text-xs text-cream/40 mt-1">
          Nairobi, Kenya
        </p>
      </div>

      {/* Social icons */}
      <div 
        ref={microRef}
        className="absolute bottom-[6vh] right-[4vw] z-10 flex gap-4"
      >
        <a 
          href="https://www.instagram.com/phyl___/" 
          target="_blank"
          rel="noopener noreferrer"
          className="text-cream/60 hover:text-gold transition-colors"
        >
          <Instagram size={22} />
        </a>
        <a 
          href="https://www.youtube.com/channel/UCNUIVmUP4qCAC7Sqd2yGzDg" 
          target="_blank"
          rel="noopener noreferrer"
          className="text-cream/60 hover:text-gold transition-colors"
        >
          <Youtube size={22} />
        </a>
        <a 
          href="https://www.tiktok.com/@phylkangogo" 
          target="_blank"
          rel="noopener noreferrer"
          className="text-cream/60 hover:text-gold transition-colors"
        >
          <Music2 size={22} />
        </a>
      </div>
    </section>
  );
}
