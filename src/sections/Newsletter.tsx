import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Send, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Newsletter() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

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
          { scale: 1.10, y: '6vh' },
          { scale: 1.00, y: 0, ease: 'none' },
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && name) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail('');
        setName('');
      }, 3000);
    }
  };

  return (
    <section 
      ref={sectionRef} 
      className="section-pinned z-[80]"
    >
      {/* Background Image */}
      <div 
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
      >
        <img 
          src="./newsletter_guitar_07.jpg" 
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
          JOIN THE LIST
        </h2>
        <p className="text-cream-muted text-lg mt-4">
          New music • Live dates • Behind the scenes
        </p>
      </div>

      {/* Form Card */}
      <div 
        ref={cardRef}
        className="absolute right-[8vw] top-[18vh] w-[36vw]"
      >
        <div className="glass-card p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <Mail className="text-gold" size={24} />
            <h3 className="font-heading font-semibold text-cream text-lg uppercase tracking-wide">
              Newsletter
            </h3>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full"
                required
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
                required
              />
            </div>
            <button
              type="submit"
              className="btn-primary w-full flex items-center justify-center gap-2"
              disabled={submitted}
            >
              {submitted ? (
                <>
                  <Check size={18} />
                  Subscribed!
                </>
              ) : (
                <>
                  <Send size={18} />
                  Subscribe
                </>
              )}
            </button>
          </form>

          <p className="text-cream-muted text-xs mt-4 text-center">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>

      {/* Quote */}
      <p 
        ref={quoteRef}
        className="absolute left-[7vw] bottom-[12vh] text-cream/80 text-lg md:text-xl italic max-w-[40vw] leading-relaxed"
      >
        "Be the first to hear what's next."
      </p>
    </section>
  );
}
