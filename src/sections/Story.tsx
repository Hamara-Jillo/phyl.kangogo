import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, GraduationCap, Users, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  { icon: MapPin, text: 'Kalenjin folk + Afro-urban pop' },
  { icon: GraduationCap, text: 'Kenyatta University Music grad' },
  { icon: Users, text: 'Former LIKIZO member' },
];

export default function Story() {
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
          { scale: 1.08, y: '6vh' },
          { scale: 1.00, y: 0, ease: 'none' },
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
          { y: 0, opacity: 1 },
          { y: '-10vh', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(card,
          { y: 0, opacity: 1 },
          { y: '10vh', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(quote,
          { opacity: 1 },
          { opacity: 0, ease: 'power2.in' },
          0.75
        )
        .fromTo(bg,
          { scale: 1 },
          { scale: 1.06, ease: 'none' },
          0.7
        );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="section-pinned z-50"
      id="story"
    >
      {/* Background Image */}
      <div 
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
      >
        <img 
          src="./story_guitar_05.jpg" 
          alt="Phyl The Kangogo Story"
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
          STORY
        </h2>
        <p className="text-cream-muted text-lg mt-4">
          Roots • Training • Process
        </p>
      </div>

      {/* Story Card */}
      <div 
        ref={cardRef}
        className="absolute right-[8vw] top-[18vh] w-[36vw]"
      >
        <div className="glass-card p-6 md:p-8">
          <div className="space-y-4 text-cream/80 leading-relaxed">
            <p>
              Phyl is a Kenyan singer-songwriter and actor born in the Rift Valley. 
              His sound blends Afro-urban production with Kalenjin folk melodies—
              heartfelt, rhythmic, and unmistakably Kenyan.
            </p>
            <p>
              He studied Music at Kenyatta University, cut his teeth in the boy band 
              LIKIZO, and has since built a catalog that moves between love, identity, 
              and homecoming.
            </p>
          </div>

          <div className="mt-8 space-y-3">
            {highlights.map((highlight, index) => (
              <div key={index} className="flex items-center gap-3">
                <highlight.icon className="text-gold flex-shrink-0" size={18} />
                <span className="text-cream/70 text-sm">{highlight.text}</span>
              </div>
            ))}
          </div>

          <a 
            href="#"
            className="flex items-center gap-2 text-gold text-sm mt-6 hover:underline"
          >
            Read the full bio
            <ArrowRight size={16} />
          </a>
        </div>
      </div>

      {/* Quote */}
      <p 
        ref={quoteRef}
        className="absolute left-[7vw] bottom-[12vh] text-cream/80 text-lg md:text-xl italic max-w-[40vw] leading-relaxed"
      >
        "From the Rift Valley to the city stage—still telling the same truth."
      </p>
    </section>
  );
}
