import React from 'react';

export const ToolsSection: React.FC = () => {
  return (
    <section id="tools" data-section-name="SCN 06 // TOOLS" className="cinema-page-section">
      <div className="cinema-page-card p-6 sm:p-10 lg:p-14">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-limeNeon/15 border border-limeNeon/35 font-mono text-xs text-limeNeon uppercase tracking-widest">
              <span>● PRODUCTION ARSENAL</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-ivory mt-3 tracking-tight">
              Tools I Use
            </h2>
            <p className="text-white/60 text-sm sm:text-base mt-2 max-w-2xl">
              My hybrid post-production &amp; generative AI workflow—combining industry-standard NLEs with next-generation neural video, audio, and reasoning models.
            </p>
          </div>
          <div className="font-mono text-xs text-white/45 border border-white/10 rounded-xl px-4 py-2.5 bg-white/[0.02]">
            8 CORE TOOLS • AUTHENTIC PIPELINE
          </div>
        </div>

        {/* CATEGORY 1: EDITING & MOTION */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-violet-300 font-semibold">[ 01 // EDITING &amp; MOTION ]</span>
            <div className="h-px flex-1 bg-gradient-to-r from-violetNeon/40 to-transparent" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* 1. CAPCUT */}
            <div
              className="tool-pill"
              style={{
                ['--tool-glow' as string]: 'rgba(255,255,255,0.18)',
                ['--tool-border' as string]: 'rgba(255,255,255,0.45)',
                ['--tool-shadow' as string]: 'rgba(255,255,255,0.15)',
              }}
              data-cursor="✦ CAPCUT PRO"
            >
              <div className="tool-icon-wrap bg-[#09090b] border border-white/25">
                <svg className="w-9 h-9" viewBox="0 0 64 64" fill="none" aria-label="CapCut Logo">
                  <rect x="4" y="4" width="56" height="56" rx="14" fill="#0A0A0E" stroke="#FFFFFF" strokeWidth="3" />
                  <path d="M15 16H49" stroke="#FFFFFF" strokeWidth="3.6" strokeLinecap="round" />
                  <path d="M15 48H49" stroke="#FFFFFF" strokeWidth="3.6" strokeLinecap="round" />
                  <path d="M16 23.5L47 40.5" stroke="#FFFFFF" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16 40.5L47 23.5" stroke="#FFFFFF" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16 23.5V40.5" stroke="#FFFFFF" strokeWidth="4.2" strokeLinecap="round" />
                  <path d="M47 20V25.5" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
                  <path d="M47 38.5V44" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-bold text-base text-ivory">CapCut</h3>
                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white/80">PRO</span>
                </div>
                <p className="text-xs text-white/55 mt-0.5">Fast-Paced Reels &amp; Rhythm Cuts</p>
              </div>
            </div>

            {/* 2. AFTER EFFECTS */}
            <div
              className="tool-pill"
              style={{
                ['--tool-glow' as string]: 'rgba(153,153,255,0.28)',
                ['--tool-border' as string]: '#9999FF',
                ['--tool-shadow' as string]: 'rgba(153,153,255,0.3)',
              }}
              data-cursor="✦ AFTER EFFECTS"
            >
              <div className="tool-icon-wrap bg-[#00005B] border-2 border-[#9999FF]">
                <svg className="w-9 h-9" viewBox="0 0 64 64" fill="none" aria-label="Adobe After Effects Logo">
                  <path d="M11.5 46L21.2 17.5H27.4L37.1 46H31.5L29.4 39.2H19.1L17 46H11.5ZM20.5 34.4H28L24.3 22.6H24.1L20.5 34.4Z" fill="#9999FF" />
                  <path d="M48.2 46.5C42.1 46.5 38.3 42.4 38.3 36.1C38.3 29.7 42.2 25.4 47.9 25.4C53.6 25.4 56.9 29.3 56.9 35.2C56.9 36.1 56.8 36.9 56.7 37.3H43.4C43.7 40.6 45.6 42.2 48.6 42.2C50.9 42.2 52.5 41.3 53.7 40.1L56.2 43.3C54.4 45.4 51.7 46.5 48.2 46.5ZM43.5 33.7H52C51.9 30.8 50.3 29.3 47.9 29.3C45.5 29.3 43.9 30.9 43.5 33.7Z" fill="#9999FF" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-bold text-base text-ivory">After Effects</h3>
                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[#9999FF]/20 text-[#9999FF]">VFX</span>
                </div>
                <p className="text-xs text-white/55 mt-0.5">Motion Graphics &amp; Compositing</p>
              </div>
            </div>

            {/* 3. CANVA */}
            <div
              className="tool-pill"
              style={{
                ['--tool-glow' as string]: 'rgba(0,196,204,0.28)',
                ['--tool-border' as string]: '#00C4CC',
                ['--tool-shadow' as string]: 'rgba(125,42,232,0.35)',
              }}
              data-cursor="✦ CANVA DESIGN"
            >
              <div className="tool-icon-wrap rounded-full p-0.5">
                <svg className="w-11 h-11" viewBox="0 0 64 64" fill="none" aria-label="Canva Logo">
                  <defs>
                    <radialGradient id="canvaGradReact" cx="25%" cy="20%" r="85%">
                      <stop offset="0%" stopColor="#00C4CC" />
                      <stop offset="48%" stopColor="#3B73E2" />
                      <stop offset="100%" stopColor="#7D2AE8" />
                    </radialGradient>
                  </defs>
                  <circle cx="32" cy="32" r="29" fill="url(#canvaGradReact)" />
                  <path d="M41.8 23.6C43.2 23.6 44.5 22.3 44.5 20.1C44.5 16.9 40.9 14.5 35.6 14.5C25.9 14.5 17.8 23.1 17.8 34.4C17.8 43.5 23.6 49.5 32.5 49.5C39.6 49.5 44.7 45.4 46.8 39.7C47.2 38.6 46.2 37.7 45.2 38.4C42.6 42.3 38.5 44.8 33.8 44.8C27.5 44.8 23.8 40.2 23.8 33.7C23.8 24.8 29.6 18.2 36.1 18.2C38.8 18.2 40.2 19.5 40.2 21.1C40.2 22.2 39.5 22.9 39.5 23.2C39.5 23.5 40.5 23.6 41.8 23.6Z" fill="#FFFFFF" />
                  <path d="M35.5 33.8C37.8 31.8 40.8 31.5 42.9 32.8" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" opacity="0.85" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-bold text-base text-ivory">Canva</h3>
                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-cyan-400/20 text-cyan-300">LAYOUT</span>
                </div>
                <p className="text-xs text-white/55 mt-0.5">Thumbnails, Storyboards &amp; Kits</p>
              </div>
            </div>

            {/* 4. DAVINCI RESOLVE */}
            <div
              className="tool-pill"
              style={{
                ['--tool-glow' as string]: 'rgba(0,122,255,0.28)',
                ['--tool-border' as string]: '#38BDF8',
                ['--tool-shadow' as string]: 'rgba(255,59,48,0.25)',
              }}
              data-cursor="✦ DAVINCI RESOLVE"
            >
              <div className="tool-icon-wrap bg-[#0b0e17] border border-white/20">
                <svg className="w-10 h-10 resolve-wheel" viewBox="0 0 64 64" fill="none" aria-label="DaVinci Resolve Logo">
                  <circle cx="32" cy="32" r="27" fill="#0B0E17" stroke="rgba(255,255,255,0.22)" strokeWidth="2" />
                  <path d="M32 9C38.5 14.5 39.5 23.5 32 29.5C24.5 23.5 25.5 14.5 32 9Z" fill="#FF3B30" />
                  <circle cx="32" cy="19.5" r="7.5" fill="#FF453A" fillOpacity="0.85" />
                  <path d="M12.5 43.5C14 35 21.5 30 30 33.5C28.5 42 20.5 46.5 12.5 43.5Z" fill="#30D158" />
                  <circle cx="21.5" cy="38.2" r="7.5" fill="#34C759" fillOpacity="0.85" />
                  <path d="M51.5 43.5C43.5 46.5 35.5 42 34 33.5C42.5 30 50 35 51.5 43.5Z" fill="#0A84FF" />
                  <circle cx="42.5" cy="38.2" r="7.5" fill="#00C7BE" fillOpacity="0.85" />
                  <circle cx="32" cy="32" r="4.2" fill="#0B0E17" stroke="#FFFFFF" strokeWidth="1.8" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-bold text-base text-ivory">DaVinci Resolve</h3>
                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300">STUDIO</span>
                </div>
                <p className="text-xs text-white/55 mt-0.5">Cinema Color Grading &amp; Finishing</p>
              </div>
            </div>
          </div>
        </div>

        {/* CATEGORY 2: AI TOOLS */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-limeNeon font-semibold">[ 02 // GENERATIVE AI STACK ]</span>
            <div className="h-px flex-1 bg-gradient-to-r from-limeNeon/40 to-transparent" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* 5. HIGGSFIELD */}
            <div
              className="tool-pill"
              style={{
                ['--tool-glow' as string]: 'rgba(212,255,0,0.28)',
                ['--tool-border' as string]: '#D4FF00',
                ['--tool-shadow' as string]: 'rgba(212,255,0,0.32)',
              }}
              data-cursor="✦ HIGGSFIELD AI"
            >
              <div className="tool-icon-wrap bg-[#D4FF00] border border-white/40 shadow-[0_0_24px_rgba(212,255,0,0.45)]">
                <svg className="w-9 h-9" viewBox="0 0 64 64" fill="none" aria-label="Higgsfield AI Logo">
                  <path d="M16 12L25 12L21 52H12L16 12Z" fill="#060609" />
                  <path d="M43 12L52 12L48 52H39L43 12Z" fill="#060609" />
                  <path d="M15 35L49 25L47 32L13 42L15 35Z" fill="#060609" />
                  <path d="M32 16L36.5 27.5L48 32L36.5 36.5L32 48L27.5 36.5L16 32L27.5 27.5L32 16Z" fill="#060609" />
                  <circle cx="32" cy="32" r="3.2" fill="#D4FF00" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-bold text-base text-ivory">Higgsfield</h3>
                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-limeNeon/20 text-limeNeon">GEN-VIDEO</span>
                </div>
                <p className="text-xs text-white/55 mt-0.5">AI Camera Control &amp; VFX Motion</p>
              </div>
            </div>

            {/* 6. KLING AI */}
            <div
              className="tool-pill"
              style={{
                ['--tool-glow' as string]: 'rgba(6,182,212,0.3)',
                ['--tool-border' as string]: '#06B6D4',
                ['--tool-shadow' as string]: 'rgba(139,92,246,0.35)',
              }}
              data-cursor="✦ KLING AI"
            >
              <div className="tool-icon-wrap bg-[#0b0d18] border border-cyan-400/40">
                <svg className="w-10 h-10" viewBox="0 0 64 64" fill="none" aria-label="Kling AI Logo">
                  <defs>
                    <linearGradient id="klingA" x1="10" y1="10" x2="54" y2="54" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#00F2FE" />
                      <stop offset="55%" stopColor="#4FACFE" />
                      <stop offset="100%" stopColor="#8B5CF6" />
                    </linearGradient>
                    <linearGradient id="klingB" x1="54" y1="12" x2="14" y2="52" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#A855F7" />
                      <stop offset="50%" stopColor="#EC4899" />
                      <stop offset="100%" stopColor="#06B6D4" />
                    </linearGradient>
                  </defs>
                  <path d="M38 11C25.5 11 16 19.5 16 29.5C16 37 22 41.5 31.5 43.5L42 28C36 26.5 30.5 25 30.5 21.5C30.5 18.5 34 16.5 39.5 16.5C43.5 16.5 47 18 49.5 20L53 14.5C49 12 44 11 38 11Z" fill="url(#klingA)" />
                  <path d="M26 53C38.5 53 48 44.5 48 34.5C48 27 42 22.5 32.5 20.5L22 36C28 37.5 33.5 39 33.5 42.5C33.5 45.5 30 47.5 24.5 47.5C20.5 47.5 17 46 14.5 44L11 49.5C15 52 20 53 26 53Z" fill="url(#klingB)" />
                  <circle cx="32" cy="32" r="3.5" fill="#FFFFFF" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-bold text-base text-ivory">Kling AI</h3>
                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-cyan-400/20 text-cyan-300">1.6 PRO</span>
                </div>
                <p className="text-xs text-white/55 mt-0.5">Photorealistic AI Video Synthesis</p>
              </div>
            </div>

            {/* 7. ELEVENLABS */}
            <div
              className="tool-pill"
              style={{
                ['--tool-glow' as string]: 'rgba(255,255,255,0.22)',
                ['--tool-border' as string]: 'rgba(255,255,255,0.5)',
                ['--tool-shadow' as string]: 'rgba(139,92,246,0.28)',
              }}
              data-cursor="✦ ELEVENLABS"
            >
              <div className="tool-icon-wrap bg-gradient-to-br from-[#0a0a0f] to-[#1a1429] border border-white/25">
                <svg className="w-9 h-9" viewBox="0 0 64 64" fill="none" aria-label="ElevenLabs Logo">
                  <rect x="6" y="6" width="52" height="52" rx="14" stroke="rgba(255,255,255,0.14)" strokeWidth="1.5" />
                  <rect className="eleven-bar-1" x="21" y="15" width="7.5" height="34" rx="2.5" fill="#FAF7F2" />
                  <rect className="eleven-bar-2" x="35.5" y="15" width="7.5" height="34" rx="2.5" fill="#FAF7F2" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-bold text-base text-ivory">ElevenLabs</h3>
                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white/80">AUDIO AI</span>
                </div>
                <p className="text-xs text-white/55 mt-0.5">Neural Voiceovers &amp; SFX Design</p>
              </div>
            </div>

            {/* 8. CLAUDE */}
            <div
              className="tool-pill"
              style={{
                ['--tool-glow' as string]: 'rgba(217,119,87,0.3)',
                ['--tool-border' as string]: '#D97757',
                ['--tool-shadow' as string]: 'rgba(217,119,87,0.32)',
              }}
              data-cursor="✦ CLAUDE AI"
            >
              <div className="tool-icon-wrap bg-[#1c1310] border border-[#D97757]/50">
                <svg className="w-10 h-10 claude-star" viewBox="0 0 64 64" fill="none" aria-label="Anthropic Claude Logo">
                  <g stroke="#D97757" strokeLinecap="round">
                    <line x1="32" y1="32" x2="32" y2="10" strokeWidth="5.2" />
                    <line x1="32" y1="32" x2="51.5" y2="21" strokeWidth="5.2" />
                    <line x1="32" y1="32" x2="50.5" y2="43.5" strokeWidth="5.2" />
                    <line x1="32" y1="32" x2="32" y2="54" strokeWidth="5.2" />
                    <line x1="32" y1="32" x2="13" y2="43" strokeWidth="5.2" />
                    <line x1="32" y1="32" x2="13.5" y2="20.5" strokeWidth="5.2" />
                    <line x1="32" y1="32" x2="43.5" y2="13" strokeWidth="4.4" />
                    <line x1="32" y1="32" x2="54" y2="32.5" strokeWidth="4.4" />
                    <line x1="32" y1="32" x2="42.5" y2="51" strokeWidth="4.4" />
                    <line x1="32" y1="32" x2="20.5" y2="51.5" strokeWidth="4.4" />
                    <line x1="32" y1="32" x2="10" y2="31.5" strokeWidth="4.4" />
                    <line x1="32" y1="32" x2="21.5" y2="12.5" strokeWidth="4.4" />
                  </g>
                  <circle cx="32" cy="32" r="5.5" fill="#D97757" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-bold text-base text-ivory">Claude</h3>
                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[#D97757]/20 text-[#D97757]">SCRIPT &amp; PROMPTS</span>
                </div>
                <p className="text-xs text-white/55 mt-0.5">Creative Direction, Hooks &amp; Prompts</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
