import React, { useState, useEffect, useRef } from 'react';
import {
  saveVideoToDB,
  getAllStoredVideos,
  deleteVideoFromDB,
} from '../utils/videoStorage';

interface ReelProject {
  id: string;
  brand: string;
  title: string;
  subtitle: string;
  duration: number;
  hook: string;
  tags: string[];
  aspectRatio: string;
  badgeColor: string;
  defaultVideoSources: string[];
}

const DEFAULT_PROJECTS: ReelProject[] = [
  {
    id: 'reel-1',
    brand: 'The Derma Co',
    title: '10% Vitamin C Serum AI Commercial',
    subtitle: 'THE DERMA CO // 01',
    duration: 11,
    hook: '10% Vitamin C & 5% Niacinamide deep penetration formula for sun radiance, dark spot reduction & natural glow.',
    tags: ['10% Vitamin C Serum', 'Niacinamide Formula', '3D Active Molecules', 'Hyper-Retention Ad'],
    aspectRatio: '9:16 VERTICAL',
    badgeColor: 'cyan',
    defaultVideoSources: [
      '/videos/the_derma_co_reel.mp4',
      '/assets/aistudio/From_Klickpin.com-_23_Beautiful_wedding_centerpiece_ideas_that_instantly_upgrade_your_space_style_or_celebration_without_much_effort_for_people_wh_8b93f070.mp4',
    ],
  },
  {
    id: 'reel-2',
    brand: 'Lumera',
    title: 'Lumera Luxury Powdery Gel-Cream Commercial',
    subtitle: 'LUMERA // 02',
    duration: 16,
    hook: 'Experience luxury skin. Pure, powerful, radiant. High-retention product reveal with sensory texture closeups.',
    tags: ['Luxury Skincare', 'Powdery Gel-Cream', 'Sensory Macro Shots', 'Kinetic Lighting'],
    aspectRatio: '9:16 VERTICAL',
    badgeColor: 'rose',
    defaultVideoSources: [
      '/videos/lumera_luxury_ad.mp4',
      '/assets/aistudio/Lumera_185f3261.mp4',
    ],
  },
  {
    id: 'reel-3',
    brand: 'Real Estate Montage',
    title: 'Real Estate Cinematic Tour & Montage',
    subtitle: 'REAL ESTATE // 03',
    duration: 49,
    hook: 'Austin luxury Highland Home tour under $500K. Dynamic speed-ramped whip transitions and cinematic drone tracking.',
    tags: ['Real Estate Montage', 'Speed-Ramp Pacing', 'FPV Drone Sync', 'Viral Attention Hook'],
    aspectRatio: '9:16 VERTICAL',
    badgeColor: 'violet',
    defaultVideoSources: [
      '/videos/real_estate_montage.mp4',
      '/assets/aistudio/Real_estate_edit_montage_ed0a0911.mp4',
    ],
  },
  {
    id: 'reel-4',
    brand: 'Talking Head Edit',
    title: 'Talking Head Retention Edit & Motion Graphics',
    subtitle: 'TALKING HEAD // 04',
    duration: 41,
    hook: 'Stop posting static images in 2026. Good visuals need good movement. High-energy talking head edit with kinetic typography and dynamic B-roll.',
    tags: ['Talking Head Edit', 'Kinetic Typography', 'Veo 3.0 Motion', 'Viral Hook Retention'],
    aspectRatio: '9:16 VERTICAL',
    badgeColor: 'lime',
    defaultVideoSources: [
      '/videos/talking_head_edit.mp4',
      '/assets/aistudio/Talking_head_edit_a83bd009.mp4',
    ],
  },
];

export const WorkSection: React.FC = () => {
  const [projects, setProjects] = useState<ReelProject[]>(DEFAULT_PROJECTS);
  const [playingStates, setPlayingStates] = useState<boolean[]>([false, false, false, false]);
  const [mutedStates, setMutedStates] = useState<boolean[]>([true, true, true, true]);
  const [currentTimes, setCurrentTimes] = useState<number[]>([0, 0, 0, 0]);
  const [durations, setDurations] = useState<number[]>([11, 16, 49, 41]);
  // All 4 slots are pre-loaded with the user's uploaded videos
  const [hasLoadedVideo, setHasLoadedVideo] = useState<boolean[]>([true, true, true, true]);
  const [loadedVideoNames, setLoadedVideoNames] = useState<string[]>([
    'the_derma_co_reel.mp4',
    'Lumera_luxury_ad.mp4',
    'Real_estate_montage.mp4',
    'Talking_head_edit.mp4',
  ]);
  const [saveToast, setSaveToast] = useState<string | null>(null);

  // Modal editor state
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [customUrlInput, setCustomUrlInput] = useState('');
  const [customBrandInput, setCustomBrandInput] = useState('');
  const [customTitleInput, setCustomTitleInput] = useState('');
  const [customHookInput, setCustomHookInput] = useState('');

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Master NLE Scrubber state
  const [isNlePlaying, setIsNlePlaying] = useState(true);
  const [nleTime, setNleTime] = useState(8.5);
  const isDraggingNle = useRef(false);
  const nleTrackRef = useRef<HTMLDivElement>(null);

  const formatSec = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  const formatTC = (seconds: number) => {
    const totalFrames = Math.floor(seconds * 24);
    const f = totalFrames % 24;
    const s = Math.floor(seconds) % 60;
    const m = Math.floor(seconds / 60) % 60;
    const h = Math.floor(seconds / 3600);
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${pad(h)}:${pad(m)}:${pad(s)}:${pad(f)}`;
  };

  // Load persistently stored videos from IndexedDB or default paths
  useEffect(() => {
    const loadStoredVideos = async () => {
      try {
        const stored = await getAllStoredVideos();

        DEFAULT_PROJECTS.forEach((proj, idx) => {
          const item = stored[proj.id];
          const video = videoRefs.current[idx];

          if (item) {
            let videoSourceUrl = '';
            if (item.blob) {
              videoSourceUrl = URL.createObjectURL(item.blob);
            } else if (item.url) {
              videoSourceUrl = item.url;
            }

            if (videoSourceUrl && video) {
              video.src = videoSourceUrl;
              video.load();

              setHasLoadedVideo((prev) => {
                const copy = [...prev];
                copy[idx] = true;
                return copy;
              });

              if (item.fileName) {
                setLoadedVideoNames((prev) => {
                  const copy = [...prev];
                  copy[idx] = item.fileName || 'Your Brand Video';
                  return copy;
                });
              }
            }

            // Restore custom brand / title / hook
            if (item.brandName || item.title || item.hook) {
              setProjects((prev) => {
                const copy = [...prev];
                copy[idx] = {
                  ...copy[idx],
                  brand: item.brandName || copy[idx].brand,
                  title: item.title || copy[idx].title,
                  hook: item.hook || copy[idx].hook,
                };
                return copy;
              });
            }
          } else if (video && proj.defaultVideoSources.length > 0) {
            // Default file provided by Yuvraj
            video.src = proj.defaultVideoSources[0];
            video.load();
            setHasLoadedVideo((prev) => {
              const copy = [...prev];
              copy[idx] = true;
              return copy;
            });
            setLoadedVideoNames((prev) => {
              const copy = [...prev];
              copy[idx] = proj.defaultVideoSources[0].split('/').pop() || '';
              return copy;
            });
          }
        });
      } catch (err) {
        console.error('Error loading stored videos:', err);
      }
    };

    loadStoredVideos();
  }, []);

  // Scroll-into-view Live Preview: Auto-previews videos as you scroll the website!
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const indexAttr = entry.target.getAttribute('data-reel-index');
          if (indexAttr === null) return;
          const idx = parseInt(indexAttr, 10);
          const video = videoRefs.current[idx];

          if (entry.isIntersecting) {
            // In view: preview play (muted for smooth browsing)
            if (video && hasLoadedVideo[idx]) {
              video.muted = true;
              video.play().catch(() => {});
              setPlayingStates((prev) => {
                const copy = [...prev];
                copy[idx] = true;
                return copy;
              });
            }
          } else {
            // Out of view: pause to conserve memory
            if (video) {
              video.pause();
              setPlayingStates((prev) => {
                const copy = [...prev];
                copy[idx] = false;
                return copy;
              });
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    const cards = document.querySelectorAll('.reel-video-card');
    cards.forEach((c) => observer.observe(c));

    return () => {
      observer.disconnect();
    };
  }, [hasLoadedVideo]);

  // Hover-on-play feature
  const handleCardMouseEnter = (index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      video.play().catch(() => {});
      const newStates = [...playingStates];
      newStates[index] = true;
      setPlayingStates(newStates);
    }
  };

  const handleCardMouseLeave = (index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      video.pause();
      const newStates = [...playingStates];
      newStates[index] = false;
      setPlayingStates(newStates);
    }
  };

  const handleTogglePlay = (index: number) => {
    const nextPlaying = !playingStates[index];
    const newStates = [...playingStates];
    newStates[index] = nextPlaying;
    setPlayingStates(newStates);

    const video = videoRefs.current[index];
    if (video) {
      if (nextPlaying) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    }
  };

  const handleToggleSound = (index: number) => {
    const nextMuted = !mutedStates[index];
    const newMuted = [...mutedStates];
    newMuted[index] = nextMuted;
    setMutedStates(newMuted);

    const video = videoRefs.current[index];
    if (video) {
      video.muted = nextMuted;
      if (!nextMuted) {
        video.play().catch(() => {});
      }
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    const targetDuration = durations[index] || projects[index].duration;
    const newTime = ratio * targetDuration;

    const newTimes = [...currentTimes];
    newTimes[index] = newTime;
    setCurrentTimes(newTimes);

    const video = videoRefs.current[index];
    if (video && video.duration) {
      video.currentTime = ratio * video.duration;
    }
  };

  // Upload MP4 and permanently persist into IndexedDB
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const project = projects[index];
    const fileUrl = URL.createObjectURL(file);
    const video = videoRefs.current[index];

    if (video) {
      video.src = fileUrl;
      video.muted = false;
      video.load();
      video.play().catch(() => {});

      const nextLoaded = [...hasLoadedVideo];
      nextLoaded[index] = true;
      setHasLoadedVideo(nextLoaded);

      const nextNames = [...loadedVideoNames];
      nextNames[index] = file.name;
      setLoadedVideoNames(nextNames);

      const nextMuted = [...mutedStates];
      nextMuted[index] = false;
      setMutedStates(nextMuted);

      const nextPlay = [...playingStates];
      nextPlay[index] = true;
      setPlayingStates(nextPlay);

      // Persist to IndexedDB
      await saveVideoToDB({
        reelId: project.id,
        blob: file,
        fileName: file.name,
        brandName: project.brand,
        title: project.title,
        hook: project.hook,
        updatedAt: Date.now(),
      });

      setSaveToast(`✓ Video saved permanently for ${project.brand}! It will now preview automatically as you scroll.`);
      setTimeout(() => setSaveToast(null), 5000);
    }
  };

  // Save manual URL / custom details from modal
  const handleSaveModalSettings = async () => {
    if (editingIndex === null) return;
    const idx = editingIndex;
    const project = projects[idx];

    const updatedProjects = [...projects];
    updatedProjects[idx] = {
      ...project,
      brand: customBrandInput.trim() || project.brand,
      title: customTitleInput.trim() || project.title,
      hook: customHookInput.trim() || project.hook,
    };
    setProjects(updatedProjects);

    if (customUrlInput.trim()) {
      const video = videoRefs.current[idx];
      if (video) {
        video.src = customUrlInput.trim();
        video.muted = false;
        video.load();
        video.play().catch(() => {});

        const nextLoaded = [...hasLoadedVideo];
        nextLoaded[idx] = true;
        setHasLoadedVideo(nextLoaded);

        const nextNames = [...loadedVideoNames];
        nextNames[idx] = customUrlInput.split('/').pop() || 'Custom Video';
        setLoadedVideoNames(nextNames);
      }

      await saveVideoToDB({
        reelId: project.id,
        url: customUrlInput.trim(),
        fileName: customUrlInput.split('/').pop(),
        brandName: updatedProjects[idx].brand,
        title: updatedProjects[idx].title,
        hook: updatedProjects[idx].hook,
        updatedAt: Date.now(),
      });
    }

    setSaveToast(`✓ Updated ${updatedProjects[idx].brand} project details!`);
    setTimeout(() => setSaveToast(null), 4000);
    setEditingIndex(null);
  };

  const handleResetVideo = async (index: number) => {
    const project = projects[index];
    await deleteVideoFromDB(project.id);

    const video = videoRefs.current[index];
    if (video) {
      video.pause();
      video.removeAttribute('src');
      video.load();
    }

    const nextLoaded = [...hasLoadedVideo];
    nextLoaded[index] = false;
    setHasLoadedVideo(nextLoaded);

    const nextNames = [...loadedVideoNames];
    nextNames[index] = '';
    setLoadedVideoNames(nextNames);

    setSaveToast(`✓ Video slot reset for ${project.brand}.`);
    setTimeout(() => setSaveToast(null), 3000);
  };

  // Update time tracker & duration
  const handleTimeUpdate = (index: number) => {
    const video = videoRefs.current[index];
    if (video && video.duration) {
      const newTimes = [...currentTimes];
      newTimes[index] = video.currentTime;
      setCurrentTimes(newTimes);

      if (durations[index] !== video.duration) {
        const newDurs = [...durations];
        newDurs[index] = video.duration;
        setDurations(newDurs);
      }
    }
  };

  // NLE Timeline scrub
  const handleNleScrub = (clientX: number) => {
    if (!nleTrackRef.current) return;
    const rect = nleTrackRef.current.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    setNleTime(ratio * 40);
  };

  useEffect(() => {
    let animationFrameId: number;
    const loop = () => {
      if (isNlePlaying && !isDraggingNle.current) {
        setNleTime((prev) => (prev + 0.016) % 36);
      }
      animationFrameId = requestAnimationFrame(loop);
    };
    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isNlePlaying]);

  const openEditor = (idx: number) => {
    setEditingIndex(idx);
    setCustomBrandInput(projects[idx].brand);
    setCustomTitleInput(projects[idx].title);
    setCustomHookInput(projects[idx].hook);
    setCustomUrlInput('');
  };

  return (
    <section id="work" data-section-name="SCN 03 // VIRAL HOOKS" className="cinema-page-section">
      <div className="cinema-page-card p-6 sm:p-10 lg:p-14 relative">
        {/* Toast Notification */}
        {saveToast && (
          <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-emerald-500/90 text-white font-mono text-xs shadow-2xl backdrop-blur-md border border-white/20 flex items-center gap-3">
            <span className="text-lg">✓</span>
            <span>{saveToast}</span>
          </div>
        )}

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violetNeon/15 border border-violetNeon/30 font-mono text-xs text-violet-300 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-limeNeon animate-pulse" />
              <span>● CLIENT WORK: PAST BRANDS &amp; VIRAL HOOKS</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-ivory mt-3 tracking-tight">
              Edited Videos with Viral Hooks
            </h2>
            <p className="text-white/60 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              Real high-retention commercial reels and AI spots produced for past client brands. Videos auto-preview while scrolling or on hover, and custom video uploads remain saved permanently.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="text-limeNeon px-3 py-1.5 rounded-lg bg-limeNeon/10 border border-limeNeon/30 flex items-center gap-1.5">
              <span>●</span> LIVE SCROLL PREVIEW ON
            </span>
            <span className="text-white/60 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
              4 BRAND SLOTS
            </span>
          </div>
        </div>

        {/* 4 Brand Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {projects.map((proj, index) => {
            const isPlaying = playingStates[index];
            const isMuted = mutedStates[index];
            const currentTime = currentTimes[index];
            const duration = durations[index] || proj.duration;
            const pct = ((currentTime / duration) * 100).toFixed(1);
            const isLoaded = hasLoadedVideo[index];
            const loadedName = loadedVideoNames[index];

            return (
              <article
                key={proj.id}
                data-reel-index={index}
                onMouseEnter={() => handleCardMouseEnter(index)}
                onMouseLeave={() => handleCardMouseLeave(index)}
                className={`reel-video-card bg-obsidian/90 border transition-all duration-300 rounded-3xl p-4 flex flex-col group shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative ${
                  isPlaying
                    ? 'border-violetNeon shadow-[0_20px_60px_rgba(139,92,246,0.35)] -translate-y-1'
                    : 'border-white/10 hover:border-violetNeon/60'
                }`}
                data-cursor={isPlaying ? `⏸ PAUSE ${proj.brand}` : `▶ PREVIEW ${proj.brand}`}
              >
                {/* Header Meta: Brand Name & Aspect Ratio */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono">
                  <div className="flex items-center gap-2 truncate pr-2">
                    <span className={`w-2 h-2 rounded-full shrink-0 transition-colors ${isPlaying ? 'bg-limeNeon animate-pulse shadow-[0_0_8px_#D4FF00]' : 'bg-white/30'}`} />
                    <span className="text-ivory font-bold truncate tracking-wide text-xs">
                      {proj.brand}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-semibold transition-colors flex items-center gap-1 ${
                      isPlaying
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40'
                        : 'bg-white/5 text-white/50 border border-white/10'
                    }`}>
                      {isPlaying ? (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                          <span>PLAYING</span>
                        </>
                      ) : (
                        <span>HOVER / SCROLL</span>
                      )}
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-violetNeon/20 text-violet-300 border border-violetNeon/30 text-[9px] font-semibold">
                      9:16
                    </span>
                  </div>
                </div>

                {/* Video Player Frame */}
                <div className="relative aspect-[9/16] w-full rounded-2xl overflow-hidden bg-[#07070b] mt-3.5 flex items-center justify-center border border-white/10 shadow-2xl select-none group/player">
                  {/* Native HTML5 Video Element */}
                  <video
                    ref={(el) => {
                      videoRefs.current[index] = el;
                    }}
                    className={`absolute inset-0 w-full h-full object-cover z-10 ${
                      isLoaded ? 'opacity-100' : 'opacity-0'
                    } transition-opacity duration-300`}
                    playsInline
                    loop
                    muted={isMuted}
                    preload="auto"
                    src={proj.defaultVideoSources[0]}
                    onLoadedMetadata={(e) => {
                      const v = e.currentTarget;
                      if (v.duration && !isNaN(v.duration)) {
                        setDurations((prev) => {
                          const copy = [...prev];
                          copy[index] = Math.round(v.duration);
                          return copy;
                        });
                      }
                    }}
                    onTimeUpdate={() => handleTimeUpdate(index)}
                  >
                    {proj.defaultVideoSources.map((src, sIdx) => (
                      <source key={sIdx} src={src} type="video/mp4" />
                    ))}
                  </video>

                  {/* Clean Cinematic Backdrop when video is waiting to be loaded */}
                  {!isLoaded && (
                    <div className="absolute inset-0 flex flex-col items-center justify-between p-5 bg-gradient-to-b from-[#141420] via-[#090910] to-[#040407] z-0 text-center">
                      <div className="w-full flex items-center justify-between font-mono text-[9px] text-white/40">
                        <span>4K DCI · ACES</span>
                        <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-limeNeon font-bold">
                          READY
                        </span>
                      </div>

                      <div className="space-y-3 px-2">
                        <div className="w-14 h-14 rounded-2xl bg-violetNeon/15 border border-violetNeon/30 mx-auto flex items-center justify-center text-violet-300 shadow-inner group-hover/player:scale-110 transition-transform">
                          <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                            <path d="M17 10.5V7a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1v-3.5l4 4v-11l-4 4z" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-display font-bold text-base text-ivory">
                            {proj.brand}
                          </div>
                          <div className="font-mono text-[10px] text-white/50 mt-0.5">
                            {proj.title}
                          </div>
                        </div>
                      </div>

                      <label className="w-full py-2.5 px-3 rounded-xl bg-violetNeon hover:bg-violet-500 text-white font-mono text-[11px] font-bold tracking-wide flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(139,92,246,0.5)] transition-all hover:scale-[1.02]">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M9 16h6v-6h4l-7-7-7 7h4v6zm-4 2h14v2H5v-2z" />
                        </svg>
                        <span>Put Your Video Here</span>
                        <input
                          ref={(el) => {
                            fileInputRefs.current[index] = el;
                          }}
                          type="file"
                          accept="video/mp4,video/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, index)}
                        />
                      </label>
                    </div>
                  )}

                  {/* Viewfinder HUD Overlays */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none z-20 font-mono text-[9px]">
                    <span className="px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-white/15 text-cyan-300 truncate max-w-[140px]">
                      {isLoaded ? loadedName || proj.brand : proj.brand}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-red-500/25 border border-red-500/40 text-red-300 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                      24 FPS
                    </span>
                  </div>

                  {/* Center Play/Pause Button (active when video is loaded) */}
                  {isLoaded && (
                    <button
                      onClick={() => handleTogglePlay(index)}
                      className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-violetNeon/90 hover:bg-violetNeon text-white flex items-center justify-center backdrop-blur-md border border-white/40 shadow-[0_0_30px_rgba(139,92,246,0.75)] z-20 opacity-0 group-hover/player:opacity-100 transition-all duration-300 cursor-pointer"
                      aria-label={`Play or Pause ${proj.title}`}
                    >
                      {isPlaying ? (
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
                      ) : (
                        <svg className="w-5 h-5 fill-current translate-x-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                      )}
                    </button>
                  )}

                  {/* Bottom Controls Bar (when video is loaded) */}
                  {isLoaded && (
                    <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/95 via-black/80 to-transparent z-20 flex flex-col gap-1.5">
                      {/* Progress Scrubber */}
                      <div
                        onClick={(e) => handleProgressClick(e, index)}
                        className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer"
                      >
                        <div
                          className="h-full bg-gradient-to-r from-violetNeon to-limeNeon transition-all duration-75"
                          style={{ width: `${pct}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between gap-2 pt-0.5">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleToggleSound(index)}
                            className="text-white/80 hover:text-limeNeon transition-colors cursor-pointer"
                            title="Toggle Audio"
                          >
                            {isMuted ? (
                              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" /></svg>
                            ) : (
                              <svg className="w-3.5 h-3.5 fill-current text-limeNeon" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" /></svg>
                            )}
                          </button>
                          <span className="font-mono text-[9px] text-white/80 tabular-nums">
                            {formatSec(currentTime)} / {formatSec(duration)}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <label
                            className="cursor-pointer font-mono text-[9px] text-limeNeon/90 hover:text-limeNeon flex items-center gap-1 px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 border border-white/20 transition-all"
                            title="Swap Video File"
                          >
                            <span>Swap Video</span>
                            <input
                              type="file"
                              accept="video/mp4,video/*"
                              className="hidden"
                              onChange={(e) => handleFileUpload(e, index)}
                            />
                          </label>

                          <button
                            onClick={() => handleResetVideo(index)}
                            className="text-white/40 hover:text-red-400 font-mono text-[9px] p-0.5 transition-colors cursor-pointer"
                            title="Reset slot"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content & Hook Breakdown */}
                <div className="mt-4 space-y-2.5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-display font-bold text-base text-ivory line-clamp-1">{proj.title}</h3>
                      <button
                        onClick={() => openEditor(index)}
                        className="text-white/40 hover:text-limeNeon font-mono text-[10px] px-1.5 py-0.5 rounded border border-white/10 hover:border-limeNeon/40 transition-colors cursor-pointer"
                        title="Edit Project Details or Set Video Link"
                      >
                        ⚙ Edit
                      </button>
                    </div>

                    <div className="mt-1.5 p-2.5 rounded-xl bg-white/[0.03] border border-white/10 font-mono text-[11px] text-white/80 leading-relaxed">
                      <span className="text-limeNeon font-bold">HOOK:</span> "{proj.hook}"
                    </div>
                  </div>

                  <div className="pt-1 flex flex-wrap gap-1.5 font-mono text-[10px]">
                    {proj.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-white/70">
                        ✓ {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Modal: Edit Project & Set Video Source */}
        {editingIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="w-full max-w-lg rounded-3xl bg-[#0e0e18] border border-white/15 p-6 sm:p-8 space-y-5 shadow-2xl relative">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="font-display font-bold text-xl text-ivory">
                    Edit Brand Project &amp; Video
                  </h3>
                  <p className="font-mono text-xs text-white/50">
                    Slot {editingIndex + 1} // {projects[editingIndex].brand}
                  </p>
                </div>
                <button
                  onClick={() => setEditingIndex(null)}
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-white/70 flex items-center justify-center text-sm cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                {/* File Upload Option */}
                <div>
                  <label className="block font-mono text-[11px] text-limeNeon uppercase mb-1.5 font-bold">
                    Option 1: Choose Video from Your Files (Saved Permanently)
                  </label>
                  <label className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border-2 border-dashed border-violetNeon/50 hover:border-violetNeon flex items-center justify-center gap-2 cursor-pointer transition-all text-sm text-ivory">
                    <svg className="w-5 h-5 text-limeNeon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span>Click to Select MP4 Video File from Computer</span>
                    <input
                      type="file"
                      accept="video/mp4,video/*"
                      className="hidden"
                      onChange={(e) => {
                        handleFileUpload(e, editingIndex);
                        setEditingIndex(null);
                      }}
                    />
                  </label>
                  <p className="font-mono text-[10px] text-white/40 mt-1">
                    * The video will be saved directly in your browser's storage so it shows every time you open the website.
                  </p>
                </div>

                {/* Direct Video URL Option */}
                <div>
                  <label className="block font-mono text-[11px] text-white/60 uppercase mb-1.5">
                    Option 2: Direct Video URL (or relative path like /videos/my_clip.mp4)
                  </label>
                  <input
                    type="text"
                    placeholder="https://.../video.mp4 or /videos/reel.mp4"
                    value={customUrlInput}
                    onChange={(e) => setCustomUrlInput(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-ivory placeholder:text-white/30 focus:outline-none focus:border-violetNeon font-mono"
                  />
                </div>

                {/* Brand Name */}
                <div>
                  <label className="block font-mono text-[11px] text-white/60 uppercase mb-1.5">
                    Brand Name
                  </label>
                  <input
                    type="text"
                    value={customBrandInput}
                    onChange={(e) => setCustomBrandInput(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-ivory focus:outline-none focus:border-violetNeon"
                  />
                </div>

                {/* Title */}
                <div>
                  <label className="block font-mono text-[11px] text-white/60 uppercase mb-1.5">
                    Project Title
                  </label>
                  <input
                    type="text"
                    value={customTitleInput}
                    onChange={(e) => setCustomTitleInput(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-ivory focus:outline-none focus:border-violetNeon"
                  />
                </div>

                {/* Hook Text */}
                <div>
                  <label className="block font-mono text-[11px] text-white/60 uppercase mb-1.5">
                    Viral Hook Description
                  </label>
                  <textarea
                    rows={2}
                    value={customHookInput}
                    onChange={(e) => setCustomHookInput(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-ivory focus:outline-none focus:border-violetNeon"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingIndex(null)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-sm text-white/70 font-mono transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveModalSettings}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violetNeon to-roseNeon text-white font-display font-bold text-sm tracking-wide shadow-lg hover:brightness-110 transition-all cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Master NLE Timeline Scrubber */}
        <div className="mt-10 p-5 sm:p-6 rounded-2xl bg-obsidian/90 border border-white/10 shadow-inner">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsNlePlaying(!isNlePlaying)}
                data-cursor="⏯ TIMELINE"
                className="w-9 h-9 rounded-xl bg-violetNeon hover:bg-violet-500 text-white flex items-center justify-center transition-colors shadow-[0_0_15px_rgba(139,92,246,0.5)] cursor-pointer"
              >
                {isNlePlaying ? (
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
                ) : (
                  <svg className="w-4 h-4 fill-current translate-x-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                )}
              </button>
              <div>
                <div className="font-mono text-xs text-ivory font-semibold">MASTER_VIRAL_HOOKS_TIMELINE.prproj</div>
                <div className="font-mono text-[10px] text-white/45">SYNCED MULTI-TRACK NLE PLAYHEAD</div>
              </div>
            </div>

            <div className="flex items-center gap-4 font-mono text-xs">
              <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-limeNeon tabular-nums font-mono">
                {formatTC(nleTime)}
              </span>
              <span className="hidden sm:inline text-white/40">24.00 FPS • ACEScct COLOR</span>
            </div>
          </div>

          {/* Multi-Track Scrubber Area */}
          <div
            ref={nleTrackRef}
            onClick={(e) => handleNleScrub(e.clientX)}
            data-cursor="↔ SCRUB"
            className="relative select-none py-3 px-2 rounded-xl bg-black/70 border border-white/10 overflow-hidden cursor-ew-resize"
          >
            {/* Playhead Line */}
            <div
              className="absolute top-0 bottom-0 w-[2px] bg-limeNeon z-20 pointer-events-none shadow-[0_0_12px_#D4FF00]"
              style={{ left: `${((nleTime / 40) * 100).toFixed(1)}%` }}
            >
              <div className="w-3.5 h-3.5 -ml-[6px] rounded-sm bg-limeNeon rotate-45" />
            </div>

            {/* Ruler Ticks */}
            <div className="flex justify-between font-mono text-[9px] text-white/30 pb-2 border-b border-white/5 px-1">
              <span>00:00</span><span>00:05</span><span>00:10</span><span>00:15</span><span>00:20</span><span>00:25</span><span>00:30</span><span>00:35</span><span>00:40</span>
            </div>

            {/* Track 1: The Derma Co */}
            <div className="mt-2 flex items-center gap-2">
              <span className="w-24 font-mono text-[10px] text-cyan-300 shrink-0">V1 // DERMA_CO</span>
              <div className="flex-1 h-6 rounded bg-cyanNeon/20 border border-cyanNeon/40 flex items-center px-2 font-mono text-[10px] text-cyan-200 truncate">
                THE_DERMA_CO_10_VITAMIN_C_SERUM_4K_9x16.mp4
              </div>
            </div>

            {/* Track 2: Lumera */}
            <div className="mt-1.5 flex items-center gap-2">
              <span className="w-24 font-mono text-[10px] text-rose-300 shrink-0">V2 // LUMERA</span>
              <div className="w-1/6" />
              <div className="flex-1 h-6 rounded bg-roseNeon/20 border border-roseNeon/40 flex items-center px-2 font-mono text-[10px] text-rose-200 truncate">
                LUMERA_LUXURY_JEWELRY_MOTION_LOOKBOOK.mp4
              </div>
              <div className="w-1/12" />
            </div>

            {/* Track 3: Backdrop India */}
            <div className="mt-1.5 flex items-center gap-2">
              <span className="w-24 font-mono text-[10px] text-violet-300 shrink-0">V3 // BACKDROP</span>
              <div className="flex-1 h-6 rounded bg-violetNeon/20 border border-violetNeon/40 flex items-center px-2 font-mono text-[10px] text-violet-200 truncate">
                BACKDROP_INDIA_COMMERCIAL_RHYTHM_EDIT.mp4
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
