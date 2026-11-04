import React from 'react';

interface NavbarProps {
  is3dEnabled: boolean;
  onToggle3d: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ is3dEnabled, onToggle3d }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 pt-4 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 py-3.5 rounded-2xl bg-obsidian/75 backdrop-blur-xl border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.6)] pointer-events-auto">
        {/* Brand Lockup */}
        <a href="#hero" data-cursor="✦ HOME" className="group flex items-center gap-3">
          <span className="font-mono text-xs text-violetNeon/80 group-hover:-translate-x-0.5 transition-transform">[</span>
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-limeNeon opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-limeNeon shadow-[0_0_10px_#D4FF00]"></span>
          </span>
          <span className="font-display font-bold text-lg sm:text-xl tracking-tight text-ivory group-hover:text-violet-300 transition-colors">
            Portfolio
          </span>
          <span className="font-mono text-xs text-violetNeon/80 group-hover:translate-x-0.5 transition-transform">]</span>
          <span className="hidden sm:inline-block font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 rounded bg-white/5 text-white/50 border border-white/10">
            v2.6 STUDIO
          </span>
        </a>

        {/* Center Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 font-sans text-sm text-white/70">
          <a href="#brands" data-cursor="↗ BRANDS" className="px-3.5 py-1.5 rounded-lg hover:text-ivory hover:bg-white/5 transition-all">Brands</a>
          <a href="#work" data-cursor="▶ REELS" className="px-3.5 py-1.5 rounded-lg hover:text-ivory hover:bg-white/5 transition-all">Work</a>
          <a href="#services" data-cursor="↗ SERVICES" className="px-3.5 py-1.5 rounded-lg hover:text-ivory hover:bg-white/5 transition-all">Services</a>
          <a href="#testimonials" data-cursor="★ REVIEWS" className="px-3.5 py-1.5 rounded-lg hover:text-ivory hover:bg-white/5 transition-all">Testimonials</a>
          <a href="#tools" data-cursor="↗ STACK" className="px-3.5 py-1.5 rounded-lg hover:text-ivory hover:bg-white/5 transition-all">Tools</a>
          <a href="#contact" data-cursor="↗ CONTACT" className="px-3.5 py-1.5 rounded-lg hover:text-ivory hover:bg-white/5 transition-all">Contact</a>
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2.5">
          {/* 3D Motion Mode Toggle */}
          <button
            onClick={onToggle3d}
            data-cursor="✦ 3D MOTION"
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 font-mono text-[11px] text-white/80 transition-all cursor-pointer"
            title="Toggle 3D Page Scroll Depth"
          >
            <span className={`w-2 h-2 rounded-full ${is3dEnabled ? 'bg-violetNeon shadow-[0_0_8px_#8B5CF6]' : 'bg-white/30'}`} />
            <span>3D SCROLL: <strong className={is3dEnabled ? 'text-limeNeon' : 'text-white/40'}>{is3dEnabled ? 'ON' : 'OFF'}</strong></span>
          </button>

          <a
            href="#contact"
            data-cursor="✦ BOOK CALL"
            className="relative inline-flex items-center gap-2 px-4 py-2 rounded-xl font-sans font-semibold text-xs sm:text-sm text-obsidian bg-gradient-to-r from-ivory via-violet-200 to-limeNeon hover:brightness-110 transition-all shadow-[0_0_25px_rgba(139,92,246,0.35)]"
          >
            <span>Let's Create</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H8M17 7V16" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
};
