import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const pressQuotes = [
  {
    quote: "One of the most consistent voices in Nairobi's live scene.",
    source: "Music Blog East Africa",
  },
  {
    quote: "His guitar work is subtle until it's not—then it steals the show.",
    source: "Collaborator / Producer",
  },
  {
    quote: "A sound that feels like home, even if you've never been to the Rift.",
    source: "Fan Mail",
  },
];

export default function Press() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const cards = cardRefs.current.filter(Boolean);

    if (!section || !headline) return;

    const ctx = gsap.context(() => {
      // Headline animation
      gsap.fromTo(headline,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headline,
            start: 'top 80%',
            end: 'top 55%',
            scrub: true,
          }
        }
      );

      // Cards animation
      cards.forEach((card, i) => {
        const direction = i % 2 === 0 ? -1 : 1;
        gsap.fromTo(card,
          { x: direction * 10 + 'vw', opacity: 0, rotate: direction * 1 },
          {
            x: 0,
            opacity: 1,
            rotate: 0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 50%',
              scrub: true,
            }
          }
        );
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative z-[60] py-24 md:py-32"
      style={{ background: 'linear-gradient(135deg, #0B3A2E 0%, #0D2A24 100%)' }}
    >
      {/* Headline */}
      <div 
        ref={headlineRef}
        className="px-[7vw] mb-16"
      >
        <h2 className="font-heading font-bold text-cream text-[clamp(34px,3.6vw,56px)] uppercase leading-[1] tracking-[0.01em]">
          PRESS & PRAISE
        </h2>
        <p className="text-cream-muted text-lg mt-4">
          What critics, collaborators, and fans are saying.
        </p>
      </div>

      {/* Quote Cards */}
      <div className="px-[7vw] space-y-8">
        {pressQuotes.map((item, index) => (
          <div
            key={index}
            ref={el => { cardRefs.current[index] = el; }}
            className={`glass-card p-8 md:p-10 max-w-[40vw] ${
              index % 2 === 1 ? 'ml-auto' : ''
            }`}
          >
            <Quote className="text-gold mb-4" size={28} />
            <p className="text-cream text-lg md:text-xl italic leading-relaxed mb-4">
              "{item.quote}"
            </p>
            <div className="w-16 h-[2px] bg-gold/50 mb-4 animate-pulse-gold origin-left" />
            <p className="text-cream-muted text-sm">
              — {item.source}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
