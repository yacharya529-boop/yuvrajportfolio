import React, { useState } from 'react';

interface ContactSectionProps {
  selectedTier?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ selectedTier }) => {
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    projectType: selectedTier || 'AI Video Commercial (Kling / Higgsfield)',
    details: '',
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('yacharya529@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const clientName = formData.name.trim() || 'Client';
    const clientContact = formData.contact.trim() || 'Not provided';
    const projectType = formData.projectType;
    const projectDetails = formData.details.trim();

    const subject = encodeURIComponent(`New Project Brief: ${clientName} — ${projectType}`);
    const bodyText =
      `Hi Yuvraj,\n\n` +
      `You have received a new project inquiry from your portfolio:\n\n` +
      `• Brand / Client: ${clientName}\n` +
      `• Contact: ${clientContact}\n` +
      `• Project Type: ${projectType}\n` +
      `• Project Details:\n${projectDetails}\n\n` +
      `— Sent via Yuvraj Acharya Portfolio`;
    const bodyEncoded = encodeURIComponent(bodyText);

    const mailtoUrl = `mailto:yacharya529@gmail.com?subject=${subject}&body=${bodyEncoded}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=yacharya529@gmail.com&su=${subject}&body=${bodyEncoded}`;

    try {
      await fetch('https://formsubmit.co/ajax/yacharya529@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `Portfolio Brief: ${clientName} (${projectType})`,
          Client_Name: clientName,
          Client_Contact: clientContact,
          Project_Type: projectType,
          Details: projectDetails,
        }),
      });
    } catch {
      // Fallback opens email client
    }

    setSubmittedName(clientName);
    setSubmitted(true);
    setIsSubmitting(false);

    // Open mail client as seamless fallback
    window.open(gmailUrl, '_blank');
  };

  return (
    <section id="contact" data-section-name="SCN 07 // CONTACT" className="cinema-page-section">
      <div className="cinema-page-card p-6 sm:p-12 lg:p-16 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Direct Pitch & Quick Channels */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 font-mono text-xs text-emerald-300 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>READY TO ROLL CAMERA</span>
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-ivory mt-4 tracking-tight leading-[1.08]">
              Let's Produce Your Next{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violetNeon via-roseNeon to-limeNeon">
                Viral Campaign.
              </span>
            </h2>

            <p className="text-white/65 text-base sm:text-lg mt-4 max-w-xl leading-relaxed">
              Whether you need AI-powered product commercials for a D2C launch or high-retention reels that scale your brand, connect directly across your preferred channel.
            </p>

            {/* Direct Connect Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              {/* WhatsApp Direct Connect with +91 9251150086 */}
              <a
                href={`https://wa.me/919251150086?text=${encodeURIComponent('Hi Yuvraj, I need high retention video editing for my brand')}`}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="💬 WHATSAPP DIRECT"
                className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-400/30 transition-all group shadow-lg"
              >
                <span className="w-11 h-11 rounded-xl bg-emerald-500/25 border border-emerald-400/40 flex items-center justify-center text-emerald-300 group-hover:scale-105 transition-transform shrink-0">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 012.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.42 0-2.82-.37-4.04-1.08l-.29-.17-3.12.82.83-3.04-.19-.3a8.17 8.17 0 01-1.25-4.47c0-4.54 3.7-8.24 8.24-8.24m4.52 11.53c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05 0 1.21.88 2.38 1 2.55.12.17 1.74 2.66 4.21 3.73.59.25 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.29z" />
                  </svg>
                </span>
                <div className="text-left">
                  <div className="font-mono text-[10px] text-emerald-400 uppercase font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                    <span>WhatsApp Direct (+91 92511 50086)</span>
                  </div>
                  <div className="font-sans font-bold text-sm sm:text-base text-ivory group-hover:text-emerald-300 transition-colors">
                    Chat on WhatsApp →
                  </div>
                </div>
              </a>

              {/* Instagram DM Direct Connect */}
              <a
                href="https://www.instagram.com/yuvraj.acharya"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="↗ INSTAGRAM DM"
                className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-400/30 transition-all group"
              >
                <span className="w-10 h-10 rounded-xl bg-rose-500/25 border border-rose-400/40 flex items-center justify-center text-rose-300 group-hover:scale-105 transition-transform">
                  <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </span>
                <div className="text-left">
                  <div className="font-mono text-[10px] text-rose-300 uppercase font-semibold">Direct Message</div>
                  <div className="font-sans font-bold text-sm text-ivory group-hover:text-rose-200 transition-colors">
                    @yuvraj.acharya ↗
                  </div>
                </div>
              </a>

              {/* Clipboard Email Copy */}
              <button
                onClick={handleCopyEmail}
                data-cursor="✦ COPY EMAIL"
                className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 transition-all group cursor-pointer"
              >
                <span className="w-10 h-10 rounded-xl bg-violetNeon/20 border border-violetNeon/40 flex items-center justify-center text-violet-300 group-hover:scale-105 transition-transform">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <div className="text-left">
                  <div className="font-mono text-[10px] text-white/45 uppercase">Email Address</div>
                  <div className="font-sans font-semibold text-sm text-ivory group-hover:text-limeNeon transition-colors">
                    {copied ? '✓ Copied to Clipboard!' : 'yacharya529@gmail.com'}
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Right Column: Quick Project Brief Generator */}
          <div className="lg:col-span-5">
            <form onSubmit={handleSubmit} className="p-6 sm:p-7 rounded-2xl bg-black/50 border border-white/10 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="font-mono text-xs uppercase tracking-wider text-violet-300">[ QUICK PROJECT BRIEF ]</span>
                <span className="font-mono text-[10px] text-limeNeon">DIRECT TO INBOX</span>
              </div>

              <div>
                <label className="block font-mono text-[11px] text-white/60 uppercase mb-1.5">Your Name / Brand</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aryan — D2C Founder"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-ivory placeholder:text-white/30 focus:outline-none focus:border-violetNeon transition-colors"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] text-white/60 uppercase mb-1.5">Email / WhatsApp / Instagram</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. aryan@brand.com or @aryan"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-ivory placeholder:text-white/30 focus:outline-none focus:border-violetNeon transition-colors"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] text-white/60 uppercase mb-1.5">Project Type</label>
                <select
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#11111a] border border-white/10 text-sm text-ivory focus:outline-none focus:border-violetNeon transition-colors"
                >
                  <option value="AI Video Commercial (Kling / Higgsfield)">AI Video Commercial (Kling / Higgsfield)</option>
                  <option value="High-Retention Instagram Reel / YouTube Short">High-Retention Instagram Reel / YouTube Short</option>
                  <option value="D2C Brand Commercial Ad Creative">D2C Brand Commercial Ad Creative</option>
                  <option value="Motion Design & DaVinci ACES Color Grading">Motion Design &amp; DaVinci ACES Color Grading</option>
                  <option value="Full Monthly Video Editing Retainer">Full Monthly Video Editing Retainer</option>
                  <option value="Custom Creative Production">Custom Creative Production</option>
                </select>
              </div>

              <div>
                <label className="block font-mono text-[11px] text-white/60 uppercase mb-1.5">Project Deliverables &amp; Details</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Tell me about your product, expected timeline, and target audience..."
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-ivory placeholder:text-white/30 focus:outline-none focus:border-violetNeon transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                data-cursor="✦ SEND BRIEF"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violetNeon via-fuchsia-500 to-roseNeon text-white font-display font-bold text-sm tracking-wide shadow-[0_10px_30px_rgba(139,92,246,0.4)] hover:brightness-110 transition-all cursor-pointer"
              >
                {isSubmitting ? 'Sending Brief to Inbox...' : 'Send Project Brief →'}
              </button>

              {submitted && (
                <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-400/30 font-mono text-xs text-emerald-300 space-y-2 text-center">
                  <div>✓ Brief from "{submittedName}" recorded &amp; prepared!</div>
                  <div className="flex items-center justify-center gap-3 pt-1">
                    <a
                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=yacharya529@gmail.com&su=Project%20Brief%20from%20${encodeURIComponent(submittedName)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-limeNeon hover:text-white"
                    >
                      Open in Gmail ↗
                    </a>
                    <span className="text-white/30">|</span>
                    <a
                      href={`mailto:yacharya529@gmail.com?subject=Project%20Brief%20from%20${encodeURIComponent(submittedName)}`}
                      className="underline text-cyan-300 hover:text-white"
                    >
                      Open Email App ↗
                    </a>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-white/45">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-limeNeon" />
            <span>© 2026 YUVRAJ ACHARYA • ALL RIGHTS RESERVED</span>
          </div>
          <div className="flex items-center gap-4">
            <span>RENDERED AT 24FPS</span>
            <span>•</span>
            <a href="#hero" data-cursor="↑ TOP" className="text-ivory hover:text-limeNeon transition-colors">
              BACK TO TOP ↑
            </a>
          </div>
        </footer>
      </div>
    </section>
  );
};
