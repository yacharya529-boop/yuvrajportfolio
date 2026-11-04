import React, { useState, useEffect, useRef } from 'react';
import { ViewfinderCursor } from './components/ViewfinderCursor';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { BrandsSection } from './components/BrandsSection';
import { WorkSection } from './components/WorkSection';
import { ServicesSection } from './components/ServicesSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ToolsSection } from './components/ToolsSection';
import { ContactSection } from './components/ContactSection';

export default function App() {
  const [is3dEnabled, setIs3dEnabled] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [activeSectionCode, setActiveSectionCode] = useState('SCN 01 // HERO');

  const stageRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);
  const smoothVelocity = useRef(0);

  // 3D Page-to-Page Scroll Transformation Engine
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const delta = scrollY - lastScrollY.current;
      lastScrollY.current = scrollY;

      smoothVelocity.current += (delta - smoothVelocity.current) * 0.18;

      // Progress bar ratio
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const ratio = Math.min(1, Math.max(0, scrollY / maxScroll));
      setScrollProgress(ratio * 100);

      const vh = window.innerHeight;
      const sections = Array.from(document.querySelectorAll<HTMLElement>('.cinema-page-section'));

      sections.forEach((sec) => {
        const rect = sec.getBoundingClientRect();

        // Identify active section
        if (rect.top <= vh * 0.52 && rect.bottom >= vh * 0.25) {
          setActiveSection(sec.id);
          const name = sec.getAttribute('data-section-name');
          if (name) setActiveSectionCode(name);
        }

        if (!is3dEnabled) {
          sec.style.transform = 'none';
          sec.style.opacity = '1';
          return;
        }

        // Entering from bottom
        if (rect.top > vh * 0.18) {
          const enterProgress = Math.min(1, Math.max(0, (vh - rect.top) / (vh * 0.85)));
          const eased = 1 - Math.pow(1 - enterProgress, 3);
          const scale = 0.88 + 0.12 * eased;
          const rotateX = (1 - eased) * 12;
          const translateY = (1 - eased) * 55;
          const opacity = 0.25 + 0.75 * eased;

          sec.style.transformOrigin = 'center top';
          sec.style.transform = `perspective(1400px) translate3d(0, ${translateY.toFixed(1)}px, 0) scale(${scale.toFixed(3)}) rotateX(${rotateX.toFixed(2)}deg)`;
          sec.style.opacity = opacity.toFixed(3);
        } else if (rect.bottom < vh * 0.82 && rect.top < 0) {
          // Receding into depth
          const exitProgress = Math.min(1, Math.max(0, Math.abs(rect.top) / (rect.height * 0.95)));
          const scale = 1 - exitProgress * 0.08;
          const rotateX = -exitProgress * 6;
          const opacity = Math.max(0.35, 1 - exitProgress * 0.65);

          sec.style.transformOrigin = 'center bottom';
          sec.style.transform = `perspective(1400px) scale(${scale.toFixed(3)}) rotateX(${rotateX.toFixed(2)}deg)`;
          sec.style.opacity = opacity.toFixed(3);
        } else {
          // Centered
          const skewY = Math.max(-1.2, Math.min(1.2, smoothVelocity.current * 0.025));
          sec.style.transform = `perspective(1400px) scale(1) rotateX(0deg) skewY(${skewY.toFixed(2)}deg)`;
          sec.style.opacity = '1';
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [is3dEnabled]);

  const toggle3d = () => {
    setIs3dEnabled(!is3dEnabled);
    if (is3dEnabled) {
      document.querySelectorAll<HTMLElement>('.cinema-page-section').forEach((sec) => {
        sec.style.transform = 'none';
        sec.style.opacity = '1';
      });
    }
  };

  const navSections = [
    { id: 'hero', label: '01. Hero', code: 'SCN 01 // HERO', cursor: '↗ HERO' },
    { id: 'brands', label: '02. Brands', code: 'SCN 02 // BRANDS', cursor: '↗ BRANDS' },
    { id: 'work', label: '03. Selected Work', code: 'SCN 03 // VIRAL HOOKS', cursor: '↗ REELS' },
    { id: 'services', label: '04. Services', code: 'SCN 04 // SERVICES', cursor: '↗ SERVICES' },
    { id: 'testimonials', label: '05. Testimonials', code: 'SCN 05 // TESTIMONIALS', cursor: '★ REVIEWS' },
    { id: 'tools', label: '06. Tools Stack', code: 'SCN 06 // TOOLS', cursor: '↗ TOOLS' },
    { id: 'contact', label: '07. Contact', code: 'SCN 07 // CONTACT', cursor: '↗ CONTACT' },
  ];

  return (
    <div className="relative min-h-screen bg-[#050508] text-[#FAF7F2]">
      {/* Subtle Film Grain Overlay */}
      <div className="film-grain" />

      {/* Ambient Cinema Glow Orbs */}
      <div className="ambient-orb w-[520px] h-[520px] bg-violet-600/30 -top-32 -left-32" />
      <div className="ambient-orb w-[460px] h-[460px] bg-pink-600/20 top-1/3 -right-32" />
      <div className="ambient-orb w-[500px] h-[500px] bg-cyan-500/20 bottom-0 left-1/4" />

      {/* Top Neon Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-[9995] bg-white/5">
        <div
          className="h-full bg-gradient-to-r from-violetNeon via-roseNeon to-limeNeon shadow-[0_0_16px_#8B5CF6] transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Custom Director's Viewfinder Cursor */}
      <ViewfinderCursor />

      {/* Floating Right-Side Section Telemetry Indicator */}
      <aside className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-end gap-3 pointer-events-auto">
        <div className="px-2.5 py-1 rounded-md bg-black/70 border border-white/10 font-mono text-[10px] text-white/50 tracking-widest uppercase mb-1">
          {activeSectionCode}
        </div>
        <nav className="flex flex-col gap-2.5 bg-panel/80 backdrop-blur-md border border-white/10 p-2 rounded-full">
          {navSections.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              data-cursor={item.cursor}
              className={`transition-all duration-300 ${
                activeSection === item.id
                  ? 'w-2.5 h-5 rounded-full bg-limeNeon shadow-[0_0_12px_#D4FF00]'
                  : 'w-2.5 h-2.5 rounded-full bg-white/20 hover:bg-white/60'
              }`}
              title={item.label}
            />
          ))}
        </nav>
      </aside>

      {/* Top Navigation Bar */}
      <Navbar is3dEnabled={is3dEnabled} onToggle3d={toggle3d} />

      {/* Main 3D Stage Container */}
      <main
        id="scroll-stage"
        ref={stageRef}
        className="relative z-10 pt-28 pb-24 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto space-y-16 sm:space-y-24"
      >
        <HeroSection />
        <BrandsSection />
        <WorkSection />
        <ServicesSection />
        <TestimonialsSection />
        <ToolsSection />
        <ContactSection />
      </main>
    </div>
  );
}
