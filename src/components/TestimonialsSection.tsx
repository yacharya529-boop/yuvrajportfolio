import React from 'react';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  metric: string;
  metricLabel: string;
  badge: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Yuvraj took our Meta ad thumbstop rate from 21% to over 68%. Our blended ROAS surged to 4.2x within two weeks of launching the generative AI spots. He doesn't just edit—he engineers retention.",
    name: 'Aryan Shah',
    role: 'Founder & CMO',
    company: 'Lumera D2C',
    metric: '4.2x',
    metricLabel: 'Meta Blended ROAS Lift',
    badge: 'LUXURY BEAUTY',
  },
  {
    quote:
      "Yuvraj's real estate montage edits completely transformed our property walkthroughs. The speed-ramped transitions, cinematic drone tracking, and viral hook pacing generated over 14 private showings in the first 48 hours.",
    name: 'Chris & Kristi Team',
    role: 'Principal Realtors',
    company: 'Austin Luxury Properties',
    metric: '14+',
    metricLabel: 'Private Showings in 48h',
    badge: 'LUXURY REAL ESTATE',
  },
  {
    quote:
      'His understanding of talking head retention and kinetic typography is lethal. He proved that good visuals need good movement in 2026—transforming static designs into scroll-stopping motion hooks that doubled our average watch time.',
    name: 'Kabir Mehta',
    role: 'Motion Design Lead',
    company: 'Creator Motion Studio',
    metric: '+310%',
    metricLabel: 'Hook Retention Lift',
    badge: 'TALKING HEAD EDITS',
  },
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" data-section-name="SCN 05 // TESTIMONIALS" className="cinema-page-section">
      <div className="cinema-page-card p-6 sm:p-10 lg:p-14">
        {/* Section Header */}
        <div className="max-w-2xl mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-limeNeon/15 border border-limeNeon/30 font-mono text-xs text-limeNeon uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-limeNeon animate-pulse" />
            <span>● VERIFIED SOCIAL PROOF</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-ivory mt-3 tracking-tight">
            Client Results &amp; Reviews
          </h2>
          <p className="text-white/60 text-sm sm:text-base mt-2">
            Real outcomes from high-growth D2C brands, creative directors, and performance marketers partnering with Yuvraj Acharya.
          </p>
        </div>

        {/* Testimonials 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item, idx) => (
            <div
              key={idx}
              className="p-7 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-limeNeon/50 transition-all flex flex-col justify-between group shadow-xl relative overflow-hidden"
              data-cursor={`★ REVIEW BY ${item.name}`}
            >
              <div className="space-y-4">
                {/* Top Badge & Metric */}
                <div className="flex items-center justify-between gap-2 pb-4 border-b border-white/10">
                  <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/70">
                    {item.badge}
                  </span>
                  <div className="text-right">
                    <span className="font-display font-black text-xl text-limeNeon tabular-nums">
                      {item.metric}
                    </span>
                    <div className="font-mono text-[9px] text-white/40 uppercase">{item.metricLabel}</div>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1 text-amber-300 text-sm">
                  {'★★★★★'}
                </div>

                {/* Quote */}
                <p className="text-white/80 text-sm leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>

              {/* Author Meta */}
              <div className="pt-6 mt-6 border-t border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violetNeon to-roseNeon flex items-center justify-center font-display font-bold text-white text-sm shadow-md">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-ivory group-hover:text-limeNeon transition-colors">
                    {item.name}
                  </h3>
                  <div className="font-mono text-[11px] text-white/50">
                    {item.role} · <span className="text-white/80">{item.company}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
