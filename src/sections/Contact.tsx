import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MapPin, Send, Instagram, Youtube, Facebook, Music2, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const info = infoRef.current;
    const form = formRef.current;
    const footer = footerRef.current;

    if (!section || !headline || !info || !form || !footer) return;

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

      // Info animation
      gsap.fromTo(info,
        { x: '-8vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: info,
            start: 'top 75%',
            end: 'top 50%',
            scrub: true,
          }
        }
      );

      // Form animation
      gsap.fromTo(form,
        { x: '8vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: form,
            start: 'top 70%',
            end: 'top 45%',
            scrub: true,
          }
        }
      );

      // Footer animation
      gsap.fromTo(footer,
        { opacity: 0 },
        {
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 90%',
            end: 'top 80%',
            scrub: true,
          }
        }
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', message: '' });
      }, 3000);
    }
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative z-[90] py-24 md:py-32 min-h-screen"
      style={{ background: '#0D2A24' }}
      id="contact"
    >
      {/* Headline */}
      <div 
        ref={headlineRef}
        className="px-[7vw] mb-16"
      >
        <h2 className="font-heading font-bold text-cream text-[clamp(34px,3.6vw,56px)] uppercase leading-[1] tracking-[0.01em]">
          CONTACT
        </h2>
        <p className="text-cream-muted text-lg mt-4">
          Booking • Press • Collaborations
        </p>
      </div>

      {/* Content Grid */}
      <div className="px-[7vw] grid md:grid-cols-2 gap-12 md:gap-16">
        {/* Contact Info */}
        <div ref={infoRef}>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Mail className="text-gold mt-1 flex-shrink-0" size={22} />
              <div>
                <p className="text-cream-muted text-sm mb-1">Email</p>
                <a 
                  href="mailto:kangogobrand@gmail.com"
                  className="text-cream hover:text-gold transition-colors"
                >
                  kangogobrand@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="text-gold mt-1 flex-shrink-0" size={22} />
              <div>
                <p className="text-cream-muted text-sm mb-1">Location</p>
                <p className="text-cream">Nairobi, Kenya</p>
              </div>
            </div>

            <div className="pt-4">
              <p className="text-cream-muted text-sm">
                For live bookings, include date, city, and venue type.
              </p>
            </div>

            {/* Social Links */}
            <div className="pt-6">
              <p className="text-cream-muted text-sm mb-4">Follow</p>
              <div className="flex gap-4">
                <a 
                  href="https://www.instagram.com/phyl___/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-cream/60 hover:text-gold hover:border-gold transition-colors"
                >
                  <Instagram size={18} />
                </a>
                <a 
                  href="https://www.youtube.com/channel/UCNUIVmUP4qCAC7Sqd2yGzDg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-cream/60 hover:text-gold hover:border-gold transition-colors"
                >
                  <Youtube size={18} />
                </a>
                <a 
                  href="https://www.tiktok.com/@phylkangogo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-cream/60 hover:text-gold hover:border-gold transition-colors"
                >
                  <Music2 size={18} />
                </a>
                <a 
                  href="https://www.facebook.com/PhylTheKangogo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-cream/60 hover:text-gold hover:border-gold transition-colors"
                >
                  <Facebook size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div ref={formRef}>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <input
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full"
                required
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full"
                required
              />
            </div>
            <div>
              <textarea
                placeholder="Your message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full min-h-[140px] resize-none"
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
                  Message Sent!
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <div 
        ref={footerRef}
        className="absolute bottom-8 left-[7vw] right-[7vw]"
      >
        <div className="border-t border-gold/20 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-cream-muted text-sm">
            © Phyl The Kangogo. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-cream-muted">
            <a href="#home" className="hover:text-gold transition-colors">Home</a>
            <a href="#music" className="hover:text-gold transition-colors">Music</a>
            <a href="#live" className="hover:text-gold transition-colors">Live</a>
            <a href="#contact" className="hover:text-gold transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </section>
  );
}
