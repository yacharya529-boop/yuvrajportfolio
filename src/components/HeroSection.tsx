import React, { useState, useEffect } from 'react';

export const HeroSection: React.FC = () => {
  const [liveClock, setLiveClock] = useState('01:00:00:00');

  useEffect(() => {
    let frame = 1 * 3600 * 24;
    const interval = setInterval(() => {
      frame += 1;
      const f = Math.floor(frame % 24);
      const totalSec = Math.floor(frame / 24);
      const s = totalSec % 60;
      const m = Math.floor(totalSec / 60) % 60;
      const h = Math.floor(totalSec / 3600) % 24;
      const pad = (n: number) => String(n).padStart(2, '0');
      setLiveClock(`${pad(h)}:${pad(m)}:${pad(s)}:${pad(f)}`);
    }, 1000 / 24);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" data-section-name="SCN 01 // HERO" className="cinema-page-section min-h-[85vh] flex flex-col justify-center">
      <div className="cinema-page-card p-6 sm:p-12 lg:p-16 relative overflow-hidden">
        {/* Subtle Viewfinder Telemetry Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-white/10 font-mono text-xs text-white/50">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              AVAILABLE FOR NEW PROJECTS
            </span>
            <span className="hidden sm:inline text-white/30">|</span>
            <span className="hidden sm:inline">INDIA • WORLDWIDE REMOTE</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-violet-300">RES: 4K DCI</span>
            <span>COLOR: ACEScct</span>
            <span className="text-limeNeon tabular-nums font-mono">TC {liveClock}</span>
          </div>
        </div>

        {/* Centerpiece Hero Content */}
        <div className="py-10 sm:py-14 text-center relative">
          {/* Role Pill Above Name */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-violetNeon/10 border border-violetNeon/30 mb-5">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-violet-300 font-semibold">
              AI Video Creator &amp; Senior Video Editor
            </span>
          </div>

          {/* MAIN HERO TITLE IN GOOGLE FONT 'GREAT VIBES' */}
          <h1 className="hero-script-title select-none mx-auto" data-cursor="✦ YUVRAJ ACHARYA">
            Yuvraj Acharya
          </h1>

          {/* Subtitle & Value Proposition */}
          <p className="max-w-2xl mx-auto mt-4 sm:mt-6 text-base sm:text-xl text-white/75 font-normal leading-relaxed">
            Crafting <span className="text-ivory font-semibold underline decoration-violetNeon/60 decoration-2 underline-offset-4">hyper-retention commercial edits</span>, cinematic generative AI commercials, and scroll-stopping motion reels for high-growth D2C brands &amp; global creators.
          </p>

          {/* Primary Hero CTAs */}
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#work"
              data-cursor="▶ WATCH REELS"
              className="group relative inline-flex items-center gap-3 px-7 py-4 rounded-2xl bg-gradient-to-r from-violetNeon via-fuchsia-500 to-roseNeon text-white font-display font-bold text-sm sm:text-base tracking-wide shadow-[0_14px_40px_rgba(139,92,246,0.45)] hover:scale-[1.03] transition-all"
            >
              <span className="w-7 h-7 rounded-full bg-black/30 flex items-center justify-center">
                <svg className="w-3.5 h-3.5 translate-x-0.5 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              </span>
              <span>Explore Showreel &amp; Edits</span>
            </a>

            <a
              href="#tools"
              data-cursor="↗ AI PIPELINE"
              className="inline-flex items-center gap-2.5 px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-ivory font-sans font-semibold text-sm sm:text-base transition-all"
            >
              <span>View AI &amp; Editing Stack</span>
              <span className="font-mono text-xs text-limeNeon">[8 TOOLS]</span>
            </a>
          </div>
        </div>

        {/* Bottom Hero Metrics Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-8 border-t border-white/10">
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-center sm:text-left">
            <div className="font-mono text-xs text-white/45 uppercase tracking-wider">Organic &amp; Paid Views</div>
            <div className="font-display font-extrabold text-2xl sm:text-3xl text-ivory mt-1">50M<span className="text-violetNeon">+</span></div>
            <div className="font-mono text-[11px] text-emerald-400 mt-0.5">Across Reels, Shorts &amp; Meta Ads</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-center sm:text-left">
            <div className="font-mono text-xs text-white/45 uppercase tracking-wider">Projects Shipped</div>
            <div className="font-display font-extrabold text-2xl sm:text-3xl text-ivory mt-1">150<span className="text-roseNeon">+</span></div>
            <div className="font-mono text-[11px] text-white/50 mt-0.5">Commercials, UGC &amp; AI Films</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-center sm:text-left">
            <div className="font-mono text-xs text-white/45 uppercase tracking-wider">Hook Retention Lift</div>
            <div className="font-display font-extrabold text-2xl sm:text-3xl text-ivory mt-1">3.4<span className="text-limeNeon">x</span></div>
            <div className="font-mono text-[11px] text-white/50 mt-0.5">First 3-Second Thumbstop Rate</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-center sm:text-left">
            <div className="font-mono text-xs text-white/45 uppercase tracking-wider">Avg Turnaround</div>
            <div className="font-display font-extrabold text-2xl sm:text-3xl text-ivory mt-1">24–48<span className="text-cyanNeon">h</span></div>
            <div className="font-mono text-[11px] text-white/50 mt-0.5">AI-Accelerated Studio Pipeline</div>
          </div>
        </div>
      </div>
    </section>
  );
};
