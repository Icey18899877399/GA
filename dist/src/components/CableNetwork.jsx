export default function CableNetwork() {
  return (
    <div className="mx-auto w-full max-w-4xl rounded-[34px] border border-cyan-400/40 bg-[#020818] p-6 shadow-[0_0_80px_rgba(0,243,255,0.15)] backdrop-blur-xl">
      <div className="text-center text-white">
        <p className="text-2xl font-semibold tracking-[0.24em]">海底光缆网络</p>
      </div>
      <div className="relative mt-8 overflow-hidden rounded-[28px] border border-cyan-400/40 bg-[#010a1d] py-10 px-6 shadow-[0_0_40px_rgba(0,243,255,0.2)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,243,255,0.12),_transparent_25%),radial-gradient(circle_at_40%_70%,_rgba(255,255,255,0.08),_transparent_18%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(0,243,255,0.06),transparent_20%)]" />
        <svg viewBox="0 0 900 260" className="relative z-10 mx-auto block h-[260px] w-full">
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path d="M 80 140 C 260 60 360 220 540 140 C 700 90 820 170 860 140" fill="none" stroke="#FF4B2B" strokeWidth="6" strokeLinecap="round" filter="url(#glow)" opacity="0.95" />
          <line x1="80" y1="140" x2="280" y2="96" stroke="#FF4B2B" strokeWidth="4" strokeLinecap="round" filter="url(#glow)" />
          <line x1="280" y1="96" x2="520" y2="136" stroke="#FF4B2B" strokeWidth="4" strokeLinecap="round" filter="url(#glow)" />
          <line x1="520" y1="136" x2="820" y2="124" stroke="#FF4B2B" strokeWidth="4" strokeLinecap="round" filter="url(#glow)" />
          <circle cx="80" cy="140" r="12" fill="#00F3FF" filter="url(#glow)" />
          <circle cx="280" cy="96" r="12" fill="#00F3FF" filter="url(#glow)" />
          <circle cx="520" cy="136" r="12" fill="#00F3FF" filter="url(#glow)" />
          <circle cx="820" cy="124" r="12" fill="#00F3FF" filter="url(#glow)" />
          <g className="opacity-70">
            <circle cx="160" cy="70" r="2" fill="#ffffff" />
            <circle cx="310" cy="34" r="2" fill="#ffffff" />
            <circle cx="420" cy="200" r="2" fill="#ffffff" />
            <circle cx="690" cy="60" r="2" fill="#ffffff" />
            <circle cx="760" cy="216" r="2" fill="#ffffff" />
            <circle cx="500" cy="40" r="2" fill="#ffffff" />
            <circle cx="230" cy="190" r="2" fill="#ffffff" />
          </g>
        </svg>
      </div>
    </div>
  )
}
