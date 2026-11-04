import React from 'react';

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" data-section-name="SCN 04 // SERVICES" className="cinema-page-section">
      <div className="cinema-page-card p-6 sm:p-10 lg:p-14">
        <div className="max-w-2xl mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-roseNeon/15 border border-roseNeon/30 font-mono text-xs text-rose-300 uppercase tracking-widest">
            <span>● WHAT I DELIVER</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-ivory mt-3 tracking-tight">
            Services Built for Attention
          </h2>
          <p className="text-white/60 text-sm sm:text-base mt-2">
            Combining cinema-grade editing fundamentals with bleeding-edge generative AI models to produce visuals that previously required a 10-person studio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Service 1 */}
          <div className="p-7 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-violetNeon/50 transition-all group" data-cursor="✦ AI COMMERCIALS">
            <div className="w-12 h-12 rounded-xl bg-violetNeon/15 border border-violetNeon/30 flex items-center justify-center text-violet-300 font-mono font-bold text-sm mb-5 group-hover:scale-110 transition-transform">
              01
            </div>
            <h3 className="font-display font-bold text-xl text-ivory">AI Video Ads &amp; Commercials</h3>
            <p className="text-white/60 text-sm mt-2.5 leading-relaxed">
              Full-concept AI commercials using Kling AI, Higgsfield, and custom workflows—delivering surreal product visuals, impossible camera moves, and lifelike storytelling.
            </p>
            <ul className="mt-5 pt-5 border-t border-white/10 space-y-2 font-mono text-xs text-white/70">
              <li className="flex items-center gap-2"><span className="text-limeNeon">✓</span> Generative CGI Product Shots</li>
              <li className="flex items-center gap-2"><span className="text-limeNeon">✓</span> ElevenLabs Voice &amp; Sound Design</li>
              <li className="flex items-center gap-2"><span className="text-limeNeon">✓</span> Claude-Assisted Ad Scripting</li>
            </ul>
          </div>

          {/* Service 2 */}
          <div className="p-7 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-roseNeon/50 transition-all group" data-cursor="✦ SHORT-FORM REELS">
            <div className="w-12 h-12 rounded-xl bg-roseNeon/15 border border-roseNeon/30 flex items-center justify-center text-rose-300 font-mono font-bold text-sm mb-5 group-hover:scale-110 transition-transform">
              02
            </div>
            <h3 className="font-display font-bold text-xl text-ivory">High-Retention Reels &amp; Shorts</h3>
            <p className="text-white/60 text-sm mt-2.5 leading-relaxed">
              Pacing-obsessed vertical video edits for Instagram Reels, YouTube Shorts, and TikTok engineered for maximum 3-second hook retention and shareability.
            </p>
            <ul className="mt-5 pt-5 border-t border-white/10 space-y-2 font-mono text-xs text-white/70">
              <li className="flex items-center gap-2"><span className="text-limeNeon">✓</span> Kinetic Captions &amp; Motion Graphics</li>
              <li className="flex items-center gap-2"><span className="text-limeNeon">✓</span> Seamless Speed-Ramps &amp; Transitions</li>
              <li className="flex items-center gap-2"><span className="text-limeNeon">✓</span> Viral Audio Mastering</li>
            </ul>
          </div>

          {/* Service 3 */}
          <div className="p-7 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-cyanNeon/50 transition-all group" data-cursor="✦ MOTION & COLOR">
            <div className="w-12 h-12 rounded-xl bg-cyanNeon/15 border border-cyanNeon/30 flex items-center justify-center text-cyan-300 font-mono font-bold text-sm mb-5 group-hover:scale-110 transition-transform">
              03
            </div>
            <h3 className="font-display font-bold text-xl text-ivory">Motion Design &amp; Color Grading</h3>
            <p className="text-white/60 text-sm mt-2.5 leading-relaxed">
              Bespoke After Effects compositing, 3D camera tracking, UI/UX callouts, and theatrical DaVinci Resolve color grading tailored to your brand palette.
            </p>
            <ul className="mt-5 pt-5 border-t border-white/10 space-y-2 font-mono text-xs text-white/70">
              <li className="flex items-center gap-2"><span className="text-limeNeon">✓</span> After Effects VFX &amp; Compositing</li>
              <li className="flex items-center gap-2"><span className="text-limeNeon">✓</span> DaVinci Resolve Film Emulation</li>
              <li className="flex items-center gap-2"><span className="text-limeNeon">✓</span> Multi-Ratio Campaign Delivery</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
