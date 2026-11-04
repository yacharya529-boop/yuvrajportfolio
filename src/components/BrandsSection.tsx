import React, { useRef } from 'react';

export const BrandsSection: React.FC = () => {
  const frameRef = useRef<HTMLDivElement>(null);

  const handleFrameMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    frameRef.current.style.setProperty('--mouse-x', `${x}px`);
    frameRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
    card.style.setProperty('--card-x', `${x}px`);
    card.style.setProperty('--card-y', `${y}px`);
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  };

  return (
    <section id="brands" data-section-name="SCN 02 // BRANDS" className="cinema-page-section">
      <div
        ref={frameRef}
        onMouseMove={handleFrameMouseMove}
        className="bracket-showcase-frame shadow-2xl"
      >
        {/* Animated Laser Scanlines */}
        <div className="laser-line-top" />
        <div className="laser-line-bottom" />

        {/* Giant Architectural / Camera Viewfinder Corner Brackets [ ] */}
        <div className="mega-bracket mega-bracket-tl" />
        <div className="mega-bracket mega-bracket-tr" />
        <div className="mega-bracket mega-bracket-bl" />
        <div className="mega-bracket mega-bracket-br" />

        {/* Camera Telemetry Corner Labels */}
        <div className="hidden sm:flex justify-between items-center font-mono text-[10px] text-white/40 tracking-widest uppercase mb-6 px-3">
          <span>[ FRAME_REF: BRAND_ROSTER_2026 ]</span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-violetNeon" />
            VERIFIED COMMERCIAL PARTNERSHIPS
          </span>
        </div>

        {/* Bracketed Section Header Badge */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-violetNeon/40 font-mono text-xs text-limeNeon tracking-widest uppercase shadow-[0_0_24px_rgba(139,92,246,0.25)]">
            <span>[ TRUSTED BY BRANDS &amp; AGENCIES ]</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-ivory mt-4 tracking-tight">
            Worked With Industry Leaders
          </h2>
          <p className="text-white/60 text-sm sm:text-base mt-2.5">
            Delivering high-converting AI video commercials, motion graphics, and performance edits inside a precision production frame.
          </p>
        </div>

        {/* Interactive 3D-Tilt Brand Cards inside the Giant Brackets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 relative z-10">
          {/* Brand Card 1: The Derma Co */}
          <div
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            className="brand-tilt-card rounded-2xl p-6 flex flex-col justify-between min-h-[250px]"
            data-cursor="✦ THE DERMA CO"
          >
            <div className="brand-card-spotlight" />
            <div>
              <div className="flex items-center justify-between gap-2 mb-5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-600/20 border border-cyan-400/30 flex items-center justify-center p-2.5 shadow-inner">
                  <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none">
                    <rect x="4" y="4" width="40" height="40" rx="10" stroke="#06B6D4" strokeWidth="2.2" />
                    <path d="M15 15H24C30.075 15 35 19.925 35 26C35 32.075 30.075 37 24 37H15V15Z" stroke="#FAF7F2" strokeWidth="2.8" />
                    <circle cx="24" cy="26" r="4.5" fill="#06B6D4" />
                    <path d="M24 10V13M38 26H41" stroke="#D4FF00" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-400/30">
                  AI Video Ads
                </span>
              </div>

              <h3 className="font-display font-bold text-xl text-ivory tracking-tight">The Derma Co</h3>
              <p className="text-white/60 text-xs sm:text-sm mt-2 leading-relaxed">
                Hyper-realistic AI product visualizers, clinical ingredient motion graphics &amp; high-ROAS reels.
              </p>
            </div>

            <div className="pt-4 mt-5 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-white/50">
              <span>D2C SKINCARE</span>
              <span className="text-cyan-300 font-semibold">● DELIVERED</span>
            </div>
          </div>

          {/* Brand Card 2: Lumera */}
          <div
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            className="brand-tilt-card rounded-2xl p-6 flex flex-col justify-between min-h-[250px]"
            data-cursor="✦ LUMERA"
          >
            <div className="brand-card-spotlight" />
            <div>
              <div className="flex items-center justify-between gap-2 mb-5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-fuchsia-500/20 to-amber-500/20 border border-fuchsia-400/30 flex items-center justify-center p-2.5 shadow-inner">
                  <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="19" stroke="#EC4899" strokeWidth="2" />
                    <path d="M24 8L28.5 19.5L40 24L28.5 28.5L24 40L19.5 28.5L8 24L19.5 19.5L24 8Z" stroke="#FAF7F2" strokeWidth="2.2" fill="rgba(236,72,153,0.2)" />
                    <circle cx="24" cy="24" r="3" fill="#D4FF00" />
                  </svg>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-fuchsia-500/15 text-fuchsia-300 border border-fuchsia-400/30">
                  Brand Reels
                </span>
              </div>

              <h3 className="font-display font-bold text-xl text-ivory tracking-tight">Lumera</h3>
              <p className="text-white/60 text-xs sm:text-sm mt-2 leading-relaxed">
                Luxury aesthetic campaign films, generative lighting lookbooks, and editorial rhythm cuts.
              </p>
            </div>

            <div className="pt-4 mt-5 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-white/50">
              <span>LUXURY LIFESTYLE</span>
              <span className="text-fuchsia-300 font-semibold">● DELIVERED</span>
            </div>
          </div>

          {/* Brand Card 3: Highland Homes & Real Estate */}
          <div
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            className="brand-tilt-card rounded-2xl p-6 flex flex-col justify-between min-h-[250px]"
            data-cursor="✦ REAL ESTATE MONTAGE"
          >
            <div className="brand-card-spotlight" />
            <div>
              <div className="flex items-center justify-between gap-2 mb-5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-indigo-600/20 border border-violet-400/30 flex items-center justify-center p-2.5 shadow-inner">
                  <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none">
                    <path d="M6 22L24 8L42 22V40C42 41.1046 41.1046 42 40 42H8C6.89543 42 6 41.1046 6 40V22Z" stroke="#8B5CF6" strokeWidth="2.2" />
                    <rect x="18" y="24" width="12" height="18" rx="2" fill="#0B0B14" stroke="#FAF7F2" strokeWidth="2" />
                    <circle cx="24" cy="16" r="3" fill="#D4FF00" />
                  </svg>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-violet-500/15 text-violet-300 border border-violet-400/30">
                  Real Estate Montages
                </span>
              </div>

              <h3 className="font-display font-bold text-xl text-ivory tracking-tight">Real Estate Luxury Tours</h3>
              <p className="text-white/60 text-xs sm:text-sm mt-2 leading-relaxed">
                Highland Homes &amp; luxury property walkthroughs, cinematic drone sweeps, speed-ramped rhythm cuts &amp; viral hooks.
              </p>
            </div>

            <div className="pt-4 mt-5 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-white/50">
              <span>REAL ESTATE &amp; HOMES</span>
              <span className="text-violet-300 font-semibold">● DELIVERED</span>
            </div>
          </div>

          {/* Brand Card 4: Talking Head Edits & Motion Graphics */}
          <div
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            className="brand-tilt-card rounded-2xl p-6 flex flex-col justify-between min-h-[250px]"
            data-cursor="✦ TALKING HEAD EDITS"
          >
            <div className="brand-card-spotlight" />
            <div>
              <div className="flex items-center justify-between gap-2 mb-5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-lime-400/20 to-emerald-500/20 border border-lime-400/30 flex items-center justify-center p-2.5 shadow-inner">
                  <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="18" r="8" stroke="#D4FF00" strokeWidth="2.2" />
                    <path d="M10 40C10 32 16 28 24 28C32 28 38 32 38 40" stroke="#FAF7F2" strokeWidth="2.4" strokeLinecap="round" />
                    <path d="M34 12L42 8M34 16L44 16" stroke="#D4FF00" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-lime-400/15 text-limeNeon border border-lime-400/30">
                  Talking Head Reels
                </span>
              </div>

              <h3 className="font-display font-bold text-xl text-ivory tracking-tight">Talking Head &amp; Motion</h3>
              <p className="text-white/60 text-xs sm:text-sm mt-2 leading-relaxed">
                Stop static posts in 2026. High-velocity kinetic typography, sound design risers, AI motion &amp; scroll-stopping hooks.
              </p>
            </div>

            <div className="pt-4 mt-5 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-white/50">
              <span>CREATORS &amp; FOUNDERS</span>
              <span className="text-limeNeon font-semibold">● ACTIVE RETAINERS</span>
            </div>
          </div>
        </div>

        {/* Infinite Dual-Direction Film-Strip Marquee Ticker Underneath */}
        <div className="mt-10 pt-6 border-t border-white/10 space-y-3 overflow-hidden relative">
          <div className="marquee-track gap-4 items-center">
            <div className="flex items-center gap-4 pr-4 font-mono text-xs uppercase tracking-widest text-white/65">
              <span className="px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-ivory">[ THE DERMA CO ]</span>
              <span className="text-violetNeon">✦</span>
              <span className="px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-ivory">[ LUMERA ]</span>
              <span className="text-roseNeon">✦</span>
              <span className="px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-ivory">[ REAL ESTATE MONTAGES ]</span>
              <span className="text-limeNeon">✦</span>
              <span className="px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-ivory">[ TALKING HEAD EDITS ]</span>
              <span className="text-cyanNeon">✦</span>
              <span className="px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-ivory">[ AI VIDEO COMMERCIALS ]</span>
              <span className="text-violetNeon">✦</span>
              <span className="px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-ivory">[ THE DERMA CO ]</span>
              <span className="text-violetNeon">✦</span>
              <span className="px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-ivory">[ LUMERA ]</span>
              <span className="text-roseNeon">✦</span>
              <span className="px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-ivory">[ REAL ESTATE MONTAGES ]</span>
              <span className="text-limeNeon">✦</span>
              <span className="px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-ivory">[ TALKING HEAD EDITS ]</span>
              <span className="text-cyanNeon">✦</span>
              <span className="px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-ivory">[ D2C PERFORMANCE ADS ]</span>
              <span className="text-violetNeon">✦</span>
              <span className="px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-ivory">[ HIGGSFIELD + KLING VFX ]</span>
              <span className="text-roseNeon">✦</span>
              <span className="px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-ivory">[ THE DERMA CO ]</span>
              <span className="text-violetNeon">✦</span>
              <span className="px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-ivory">[ LUMERA ]</span>
              <span className="text-roseNeon">✦</span>
              <span className="px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-ivory">[ BACKDROP INDIA ]</span>
              <span className="text-limeNeon">✦</span>
              <span className="px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-ivory">[ AI VIDEO COMMERCIALS ]</span>
              <span className="text-cyanNeon">✦</span>
            </div>
          </div>

          <div className="marquee-track-reverse gap-4 items-center">
            <div className="flex items-center gap-4 pr-4 font-mono text-[11px] uppercase tracking-widest text-white/45">
              <span>🎬 24FPS CINEMA GRADE</span><span>•</span>
              <span>⚡ HIGH-RETENTION HOOKS</span><span>•</span>
              <span>🧠 GENERATIVE AI WORKFLOWS</span><span>•</span>
              <span>🎧 ELEVENLABS SPATIAL SFX</span><span>•</span>
              <span>🎨 DAVINCI ACES COLOR</span><span>•</span>
              <span>✨ AFTER EFFECTS MOTION</span><span>•</span>
              <span>🎬 24FPS CINEMA GRADE</span><span>•</span>
              <span>⚡ HIGH-RETENTION HOOKS</span><span>•</span>
              <span>🧠 GENERATIVE AI WORKFLOWS</span><span>•</span>
              <span>🎧 ELEVENLABS SPATIAL SFX</span><span>•</span>
              <span>🎨 DAVINCI ACES COLOR</span><span>•</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
