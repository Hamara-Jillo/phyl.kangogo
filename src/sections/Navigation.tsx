import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: 'Music', href: '#music' },
  { label: 'Live', href: '#live' },
  { label: 'Story', href: '#story' },
  { label: 'Film', href: '#film' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Show nav after scrolling past hero
    ScrollTrigger.create({
      trigger: '#home',
      start: 'bottom 80%',
      onEnter: () => setIsVisible(true),
      onLeaveBack: () => setIsVisible(false),
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === '#home') st.kill();
      });
    };
  }, []);

  useEffect(() => {
    if (navRef.current) {
      gsap.to(navRef.current, {
        y: isVisible ? 0 : -100,
        opacity: isVisible ? 1 : 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  }, [isVisible]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileOpen(false);
    
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav 
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-[100] px-[4vw] py-4 hidden md:flex items-center justify-between"
        style={{ 
          background: 'rgba(11, 58, 46, 0.85)',
          backdropFilter: 'blur(12px)',
          transform: 'translateY(-100%)',
          opacity: 0,
        }}
      >
        {/* Logo */}
        <a 
          href="#home"
          onClick={(e) => handleLinkClick(e, '#home')}
          className="font-heading font-bold text-gold text-sm uppercase tracking-[0.14em]"
        >
          Phyl The Kangogo
        </a>

        {/* Nav Links */}
        <div className="flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-cream/80 text-sm hover:text-gold transition-colors link-hover"
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed top-4 right-4 z-[100]">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="w-12 h-12 rounded-full bg-forest/90 backdrop-blur-md flex items-center justify-center text-cream border border-gold/30"
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-[99] bg-forest/98 backdrop-blur-lg flex flex-col items-center justify-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="font-heading font-bold text-cream text-2xl uppercase tracking-wide hover:text-gold transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      {/* Persistent Logo (always visible on mobile) */}
      <div className="md:hidden fixed top-4 left-4 z-[100]">
        <a 
          href="#home"
          onClick={(e) => handleLinkClick(e, '#home')}
          className="font-heading font-bold text-gold text-xs uppercase tracking-[0.14em]"
        >
          Phyl The Kangogo
        </a>
      </div>
    </>
  );
}
