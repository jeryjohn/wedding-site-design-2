"use client";
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { CONFIG } from "@/constants/data";

const LocationMap = dynamic(() => import("@/components/LocationMap"), {
  ssr: false,
  loading: () => <div className="w-full h-[300px] flex items-center justify-center bg-[#e1edf5] text-[#4a5d6e] text-sm font-sans">Loading map...</div>
});

/* SVG corner ornament — elegant floral scroll */
const CornerOrnament = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={`corner-ornament ${className}`} style={{ position: 'absolute', width: '50px', height: '50px', pointerEvents: 'none' }}>
    <path d="M5 75 Q 5 40 25 25 Q 35 18 45 20 Q 38 28 32 35 Q 25 45 28 55 Q 30 62 38 60 Q 44 58 48 52 Q 52 45 50 38 Q 48 30 55 22 Q 62 15 72 10" stroke="#b59453" strokeWidth="1.2" strokeLinecap="round" fill="none" />
    <path d="M5 55 Q 8 42 18 35 Q 25 30 30 32 Q 24 38 22 45 Q 20 52 25 52 Q 30 52 35 45" stroke="#b59453" strokeWidth="1" strokeLinecap="round" fill="none" />
    <circle cx="72" cy="10" r="2.5" fill="#b59453" opacity="0.5" />
    <circle cx="38" cy="60" r="2" fill="#b59453" opacity="0.4" />
    <circle cx="5" cy="75" r="2" fill="#b59453" opacity="0.4" />
  </svg>
);

/* Decorative gold divider with center ornament */
const GoldDivider = ({ className }: { className?: string }) => (
  <div className={`flex items-center justify-center gap-3 ${className || ''}`}>
    <span className="gold-line flex-1 max-w-[80px]"></span>
    <svg viewBox="0 0 24 24" className="w-[14px] h-[14px] text-[#b59453]" fill="currentColor">
      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
    </svg>
    <span className="gold-line flex-1 max-w-[80px]"></span>
  </div>
);

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [introVisible, setIntroVisible] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50 && !hasScrolled) setHasScrolled(true);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasScrolled]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    sectionRefs.current.forEach((el) => { if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  const openInvitation = () => {
    if (opened) return;
    setOpened(true);
    setTimeout(() => {
      setIntroVisible(false);
      window.scrollTo({ top: 0, behavior: "auto" });
    }, 1000);
  };

  const handleShare = async () => {
    const text = `You are cordially invited to the Betrothal ceremony of Anju and Anish on Thursday, 23 July 2026 at 11:30 AM at ${CONFIG.venueName}, ${CONFIG.venueAddress}.`;
    const url = window.location.origin;
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Anish & Anju Betrothal',
          text: `${text}\n\n${url}`,
        });
      } else if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(`${text}\n\n${url}`);
        alert('Invitation details copied to clipboard!');
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = `${text}\n\n${url}`;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Invitation details copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${CONFIG.mapQuery}`;

  return (
    <main className="relative min-h-screen font-eb bg-watercolor overflow-x-hidden">

      {/* ===== INTRO MODAL ===== */}
      {introVisible && (
        <div
          className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-all duration-1000 ease-in-out cursor-pointer
            ${opened ? "opacity-0 scale-105 pointer-events-none blur-md" : "opacity-100 scale-100"}`}
          style={{ background: 'linear-gradient(180deg, #f4f8fa 0%, #e1edf5 50%, #d2e4f0 100%)' }}
          onClick={openInvitation}
        >
          <div className="relative z-10 flex flex-col items-center px-6">
            {/* Cross */}
            <svg className="w-[28px] h-[28px] text-[#b59453] mb-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
              <path d="M12 2V22M7 7H17" />
            </svg>

            <div className="text-[#b59453] tracking-[0.35em] text-[11px] font-sans opacity-90 mb-8 text-center uppercase">
              You are cordially invited
            </div>

            <div className="invitation-card p-10 flex flex-col items-center justify-center min-w-[280px] max-w-[360px]">
              <CornerOrnament className="tl" />
              <CornerOrnament className="tr" />
              <CornerOrnament className="bl" />
              <CornerOrnament className="br" />

              <div className="font-serif italic text-[18px] text-[#1e3545] tracking-[0.02em] text-center mb-8 px-4 leading-normal">
                Betrothal of<br />Anish &amp; Anju
              </div>

              <button
                className={`relative w-[76px] h-[76px] rounded-full flex items-center justify-center cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]
                  bg-[radial-gradient(circle_at_35%_30%,_#dfcb9f,_#b59453_60%,_#8c7035_100%)] shadow-[0_6px_16px_rgba(0,0,0,0.2),_inset_0_2px_4px_rgba(255,255,255,0.4),_inset_0_-3px_6px_rgba(0,0,0,0.25)]
                  hover:scale-110 active:scale-95 ${opened ? "scale-[3] opacity-0 shadow-none" : ""}`}
                onClick={openInvitation}
                aria-label="Open the invitation"
              >
                <svg viewBox="0 0 40 40" fill="none" className={`w-[36px] h-[36px] transition-opacity duration-300 ${opened ? "opacity-0" : "opacity-100"}`}>
                  <text x="20" y="26" textAnchor="middle" className="font-serif italic text-[18px] fill-[#3e2f14]">
                    A&amp;A
                  </text>
                </svg>
              </button>
            </div>

            <div className="mt-8 text-[#b59453]/80 text-[11px] tracking-[0.2em] font-sans text-center uppercase animate-pulse">
              Tap anywhere to open
            </div>
          </div>
        </div>
      )}

      {/* ===== INVITATION CONTENT ===== */}
      <div id="invitation" className={!opened ? "h-screen overflow-hidden opacity-0" : "opacity-100 transition-opacity duration-1000 delay-300"}>

        {/* Main Invitation Card Container */}
        <div className="max-w-[520px] mx-auto px-4 py-10">
          <div className="invitation-card relative overflow-hidden">
            {/* Elegant double rectangle border (Original unmodified borders restored) */}
            <div className="absolute inset-0 pointer-events-none z-10" style={{ padding: '16px' }}>
              <svg viewBox="0 0 400 800" preserveAspectRatio="none" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Outer border */}
                <rect x="15" y="15" width="370" height="770" stroke="#b59453" strokeWidth="1.2" opacity="0.65" />
                {/* Inner border */}
                <rect x="22" y="22" width="356" height="756" stroke="#b59453" strokeWidth="0.65" opacity="0.4" />
              </svg>
            </div>

            {/* Corner flowers (Blue watercolor corner flowers restored) */}
            <img
              src="/blue_corner_flowers.png"
              alt=""
              className="absolute top-0 left-0 w-36 h-36 sm:w-44 sm:h-44 pointer-events-none z-20 mix-blend-multiply"
              aria-hidden="true"
            />
            <img
              src="/blue_corner_flowers.png"
              alt=""
              className="absolute top-0 right-0 w-36 h-36 sm:w-44 sm:h-44 pointer-events-none z-20 mix-blend-multiply scale-x-[-1]"
              aria-hidden="true"
            />
            <img
              src="/blue_corner_flowers.png"
              alt=""
              className="absolute bottom-0 left-0 w-36 h-36 sm:w-44 sm:h-44 pointer-events-none z-20 mix-blend-multiply scale-y-[-1]"
              aria-hidden="true"
            />
            <img
              src="/blue_corner_flowers.png"
              alt=""
              className="absolute bottom-0 right-0 w-36 h-36 sm:w-44 sm:h-44 pointer-events-none z-20 mix-blend-multiply rotate-180"
              aria-hidden="true"
            />

            {/* Soft faded couple blessing silhouette printed onto the paper background at the bottom */}
            <div
              className="absolute bottom-0 left-0 right-0 w-full h-[320px] pointer-events-none z-0 overflow-hidden"
              style={{
                WebkitMaskImage: 'radial-gradient(ellipse at 50% 70%, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 80%)',
                maskImage: 'radial-gradient(ellipse at 50% 70%, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 80%)',
                opacity: 0.16,
                filter: 'sepia(15%) contrast(110%) brightness(102%) blur(0.3px)',
                mixBlendMode: 'multiply'
              }}
            >
              <img
                src="/couple_blessing.png"
                alt=""
                className="w-full h-full object-cover object-bottom"
                aria-hidden="true"
              />
            </div>

            {/* Inner padding — increased to keep text clear of the larger corner flowers */}
            <div className="px-10 pt-20 pb-16 sm:px-14 relative z-10">

              {/* Cross at top */}
              <div className="flex justify-center mb-6">
                <svg className="w-[30px] h-[30px] text-[#b59453]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
                  <path d="M12 2V22M7 7H17" />
                </svg>
              </div>

              <GoldDivider className="mb-8" />

              {/* Header text */}
              <div className="text-center mb-2">
                <div className="font-sans text-[10px] tracking-[0.35em] uppercase text-[#b59453] mb-1">Together with our families</div>
                <div className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#4a5d6e] mb-1">We joyfully invite you to</div>
                <div className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#4a5d6e]">celebrate the betrothal of</div>
              </div>

              {/* Bride name */}
              <div className="text-center mt-8">
                <h1 className="font-script text-[clamp(42px,11vw,56px)] text-[#1e3545] leading-[1.1]">{CONFIG.brideName}</h1>
                <div className="font-sans text-[10px] tracking-[0.22em] uppercase text-[#b59453] mt-2">
                  Daughter of {CONFIG.brideParents}
                </div>
              </div>

              {/* Ampersand */}
              <div className="text-center my-4">
                <span className="font-script text-[48px] text-[#b59453] leading-none">&amp;</span>
              </div>

              {/* Groom name */}
              <div className="text-center">
                <h1 className="font-script text-[clamp(42px,11vw,56px)] text-[#1e3545] leading-[1.1]">{CONFIG.groomName}</h1>
                <div className="font-sans text-[10px] tracking-[0.22em] uppercase text-[#b59453] mt-2">
                  Son of {CONFIG.groomParents}
                </div>
              </div>

              {/* Bible verse */}
              <div className="mt-10 text-center max-w-[340px] mx-auto">
                <GoldDivider className="mb-5" />
                <p className="font-serif italic text-[15px] text-[#1e3545] leading-[1.7]">
                  &ldquo;The Lord has made everything beautiful in his time.&rdquo;
                </p>
                <div className="font-sans text-[10px] tracking-[0.18em] uppercase text-[#b59453] mt-2">Ecclesiastes 3:11</div>
                <GoldDivider className="mt-5" />
              </div>

              {/* Date section */}
              <div className="mt-10 text-center">
                <div className="font-sans text-[12px] tracking-[0.3em] uppercase text-[#b59453] font-medium">Thursday</div>
                <div className="flex items-center justify-center gap-4 my-3">
                  <span className="font-sans text-[14px] tracking-[0.2em] uppercase text-[#4c6d85]">July</span>
                  <span className="font-serif text-[52px] font-light text-[#1e3545] leading-none border-x-[1.5px] border-[#b59453] px-5">23</span>
                  <span className="font-sans text-[14px] tracking-[0.2em] uppercase text-[#4c6d85]">2026</span>
                </div>
                <div className="font-sans text-[12px] tracking-[0.25em] uppercase text-[#b59453]">At 11:30 AM</div>
              </div>

              {/* Venue */}
              <div className="mt-10 text-center">
                <GoldDivider className="mb-5" />
                <svg className="w-[18px] h-[18px] text-[#b59453] mx-auto mb-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
                </svg>
                <div className="font-serif text-[20px] font-medium text-[#1e3545]">{CONFIG.venueName}</div>
                <div className="font-serif italic text-[14px] text-[#4a5d6e] mt-1">{CONFIG.venueAddress}</div>
              </div>

              {/* Closing message (Ephesians 4:1–3 Kept Unchanged) */}
              <div className="mt-10 text-center">
                <GoldDivider className="mb-5" />
                <p className="font-serif italic text-[15px] text-[#1e3545] leading-[1.8]">
                  &ldquo;&hellip;walk in a manner worthy of the calling to which you have been called, with all humility and gentleness, with patience, bearing with one another in love, eager to maintain the unity of the Spirit in the bond of peace.&rdquo;
                </p>
                <div className="font-sans text-[10px] tracking-[0.18em] uppercase text-[#b59453] mt-3">Ephesians 4:1–3</div>
              </div>

              {/* Dynamic scroll cue */}
              <div className={`mt-8 transition-opacity duration-700 ${hasScrolled ? 'opacity-0 pointer-events-none' : 'opacity-60 animate-bounce'}`}>
                <div className="flex flex-col items-center justify-center">
                  <span className="text-[#b59453] text-[9px] uppercase tracking-[0.2em] mb-1 font-sans font-medium">Scroll for more</span>
                  <svg className="w-4 h-4 text-[#b59453]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ===== LOCATION SECTION ===== */}
        <div className="max-w-[520px] mx-auto px-4 pb-6">
          <section className="reveal invitation-card p-8 sm:p-10" ref={(el) => { sectionRefs.current[0] = el; }}>
            <div className="text-center font-sans text-[10px] tracking-[0.3em] uppercase text-[#b59453] mb-2">Find your way</div>
            <h2 className="text-center text-[32px] font-medium text-[#1e3545] font-serif mb-1">Location</h2>
            <GoldDivider className="mb-8" />

            <div className="relative rounded-2xl overflow-hidden shadow-md border border-[#dfcb9f]/30">
              <LocationMap />
              <a href={mapUrl} target="_blank" rel="noopener" className="absolute top-3 left-3 bg-white/95 p-[8px_14px] rounded-full font-sans text-[11px] font-medium text-[#1e3545] shadow-md flex items-center gap-1.5 z-[400] hover:scale-105 transition-transform no-underline">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-[#b59453]">
                  <path d="M14 3l7 7-7 7M21 10H3" />
                </svg>
                Open in Maps
              </a>

              <div className="absolute left-3 right-3 bottom-3 bg-white/95 rounded-xl p-4 shadow-lg z-[400]">
                <div className="text-[18px] font-medium text-[#1e3545] font-serif leading-tight">{CONFIG.venueName}</div>
                <div className="text-[13px] text-[#4a5d6e] mt-1 font-serif italic">{CONFIG.venueAddress}</div>
                <a href={mapUrl} target="_blank" rel="noopener" className="gold-btn mt-3 w-full">
                  Get Directions
                </a>
              </div>
            </div>
          </section>
        </div>

        {/* ===== SHARE / CLOSING ===== */}
        <div className="max-w-[520px] mx-auto px-4 pb-12">
          <section className="reveal text-center py-10" ref={(el) => { sectionRefs.current[1] = el; }}>
            <div className="font-script text-[36px] text-[#4c6d85] mb-2">With love</div>
            <div className="font-serif text-[28px] font-medium text-[#1e3545]">Anish &amp; Anju</div>
            <button onClick={handleShare} className="gold-btn mt-8 mx-auto flex items-center justify-center gap-2">
              <svg className="w-[16px] h-[16px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Share Invitation
            </button>
          </section>
        </div>

      </div>
    </main>
  );
}
