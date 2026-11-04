import React, { useEffect, useState, useRef } from 'react';

export const ViewfinderCursor: React.FC = () => {
  const [enabled, setEnabled] = useState(true);
  const [label, setLabel] = useState('✦ CLICK');
  const [isHovering, setIsHovering] = useState(false);

  const mousePos = useRef({ x: -100, y: -100 });
  const reticlePos = useRef({ x: -100, y: -100 });
  const ghostPos = useRef({ x: -100, y: -100 });
  const hudPos = useRef({ x: -100, y: -100 });
  const framesRef = useRef(12 * 24 + 8);
  const scrollBoostRef = useRef(0);
  const lastScrollY = useRef(0);

  const dotRef = useRef<HTMLDivElement>(null);
  const reticleRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const actionPillRef = useRef<HTMLDivElement>(null);
  const timecodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Check if device supports fine pointer
    if (window.matchMedia('(pointer: coarse)').matches) {
      setEnabled(false);
      return;
    }

    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      // Instant 0ms hardware update for the center dot & reticle
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const delta = Math.abs(scrollY - lastScrollY.current);
      lastScrollY.current = scrollY;
      scrollBoostRef.current = Math.min(delta * 0.45, 14);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-cursor], a, button, input, select, textarea');
      if (target) {
        setIsHovering(true);
        const customText = target.getAttribute('data-cursor');
        if (customText) {
          setLabel(customText);
        } else if (target.tagName === 'A') {
          setLabel('↗ NAVIGATE');
        } else if (target.tagName === 'BUTTON') {
          setLabel('✦ SELECT');
        } else {
          setLabel('✦ INPUT');
        }
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mouseover', handleMouseOver);

    let animationFrameId: number;

    const formatTC = (frames: number) => {
      const f = Math.floor(frames % 24);
      const totalSeconds = Math.floor(frames / 24);
      const s = totalSeconds % 60;
      const m = Math.floor(totalSeconds / 60) % 60;
      const h = Math.floor(totalSeconds / 3600) % 24;
      const pad = (n: number) => String(n).padStart(2, '0');
      return `${pad(h)}:${pad(m)}:${pad(s)}:${pad(f)}`;
    };

    let lastTimecodeUpdate = 0;

    const loop = (timestamp: number) => {
      const mx = mousePos.current.x;
      const my = mousePos.current.y;

      // Ultra-snappy, on-time response (0.85+ factor = reaches target in 1-2 frames, no lag)
      reticlePos.current.x += (mx - reticlePos.current.x) * 0.88;
      reticlePos.current.y += (my - reticlePos.current.y) * 0.88;

      ghostPos.current.x += (mx - ghostPos.current.x) * 0.65;
      ghostPos.current.y += (my - ghostPos.current.y) * 0.65;

      hudPos.current.x += (mx - hudPos.current.x) * 0.82;
      hudPos.current.y += (my - hudPos.current.y) * 0.82;

      // GPU-accelerated translate3d without CSS transition interference
      if (reticleRef.current) {
        reticleRef.current.style.transform = `translate3d(${reticlePos.current.x.toFixed(1)}px, ${reticlePos.current.y.toFixed(1)}px, 0)`;
      }
      if (ghostRef.current) {
        ghostRef.current.style.transform = `translate3d(${ghostPos.current.x.toFixed(1)}px, ${ghostPos.current.y.toFixed(1)}px, 0)`;
      }
      if (hudRef.current) {
        hudRef.current.style.transform = `translate3d(${hudPos.current.x.toFixed(1)}px, ${hudPos.current.y.toFixed(1)}px, 0)`;
      }
      if (actionPillRef.current) {
        actionPillRef.current.style.transform = `translate3d(${reticlePos.current.x.toFixed(1)}px, ${reticlePos.current.y.toFixed(1)}px, 0)`;
      }

      // Live 24fps timecode updated directly on the DOM element without React re-render hitching
      if (timestamp - lastTimecodeUpdate > 41) { // ~24fps update rate
        framesRef.current += 1 + scrollBoostRef.current;
        scrollBoostRef.current *= 0.88;
        if (timecodeRef.current) {
          timecodeRef.current.textContent = formatTC(framesRef.current);
        }
        lastTimecodeUpdate = timestamp;
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className={`fixed inset-0 pointer-events-none z-[10000] overflow-hidden ${isHovering ? 'cursor-hover' : ''}`} aria-hidden="true">
      {/* Ghost ring - snappy trailing aura without CSS transform transition */}
      <div
        ref={ghostRef}
        style={{ willChange: 'transform' }}
        className={`fixed top-0 left-0 rounded-full border border-violet-500/35 bg-radial from-violet-500/10 to-transparent pointer-events-none transition-[width,height,margin,border-color,opacity] duration-150 ${
          isHovering ? 'w-16 h-16 -ml-8 -mt-8 border-limeNeon/50 from-limeNeon/15' : 'w-10 h-10 -ml-5 -mt-5'
        }`}
      />

      {/* Reticle with 4 corners - on-time with 0ms delay */}
      <div
        ref={reticleRef}
        style={{ willChange: 'transform' }}
        className={`fixed top-0 left-0 pointer-events-none transition-[width,height,margin] duration-150 ${
          isHovering ? 'w-14 h-14 -ml-7 -mt-7' : 'w-8 h-8 -ml-4 -mt-4'
        }`}
      >
        <span className={`absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 transition-colors duration-150 ${isHovering ? 'border-limeNeon' : 'border-ivory'}`} />
        <span className={`absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 transition-colors duration-150 ${isHovering ? 'border-limeNeon' : 'border-ivory'}`} />
        <span className={`absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 transition-colors duration-150 ${isHovering ? 'border-limeNeon' : 'border-ivory'}`} />
        <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 transition-colors duration-150 ${isHovering ? 'border-limeNeon' : 'border-ivory'}`} />
      </div>

      {/* Center dot - instantaneous mouse follower */}
      <div
        ref={dotRef}
        style={{ willChange: 'transform' }}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-ivory shadow-[0_0_10px_#8B5CF6,0_0_20px_#EC4899] pointer-events-none z-30"
      />

      {/* Action pill on hover */}
      <div
        ref={actionPillRef}
        style={{ willChange: 'transform' }}
        className={`fixed top-0 left-0 -ml-14 -mt-10 pointer-events-none z-40 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-violetNeon to-roseNeon text-white font-mono text-[10px] font-bold tracking-wider uppercase shadow-[0_10px_30px_rgba(139,92,246,0.6)] border border-white/30 transition-[opacity,transform] duration-150 ${
          isHovering ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
        }`}
      >
        {label}
      </div>

      {/* Mini HUD telemetry */}
      <div
        ref={hudRef}
        style={{ willChange: 'transform' }}
        className={`fixed top-0 left-0 ml-5 mt-4 pointer-events-none z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/85 border backdrop-blur-md font-mono text-[10px] tracking-wider text-slate-200 transition-[border-color,background-color] duration-150 ${
          isHovering ? 'border-limeNeon/40' : 'border-white/15'
        }`}
      >
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_#ef4444]" />
        <span className="text-red-400 font-bold">REC</span>
        <span ref={timecodeRef} className="tabular-nums font-mono text-ivory/90">00:00:12:08</span>
        <span className="text-[9px] text-limeNeon/90 px-1 py-0.2 bg-white/5 rounded">24FPS</span>
      </div>
    </div>
  );
};
