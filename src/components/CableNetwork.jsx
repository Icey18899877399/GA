export default function CableNetwork() {
  return (
    <div className="card strip-deepsea p-6">
      <div className="text-center">
        <p className="section-label section-label-deepsea justify-center">海底光缆</p>
        <h3 className="mt-2 text-xl font-semibold text-ink">全球海底光缆网络</h3>
      </div>
      <div className="relative mt-6 overflow-hidden rounded-card border border-border bg-deepsea-light/20 p-4">
        <svg viewBox="0 0 900 260" className="mx-auto block h-[220px] w-full">
          {/* Cable paths */}
          <path d="M 80 140 C 260 60 360 220 540 140 C 700 90 820 170 860 140"
            fill="none" stroke="#4DBBD5" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
          <line x1="80" y1="140" x2="280" y2="96" stroke="#4DBBD5" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
          <line x1="280" y1="96" x2="520" y2="136" stroke="#4DBBD5" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
          <line x1="520" y1="136" x2="820" y2="124" stroke="#4DBBD5" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
          {/* Nodes */}
          {[[80,140],[280,96],[520,136],[820,124]].map(([cx,cy], i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r="8" fill="#4DBBD5" opacity="0.15" />
              <circle cx={cx} cy={cy} r="4" fill="#4DBBD5" />
            </g>
          ))}
          {/* Subtle grid dots */}
          {[[160,70],[310,34],[420,200],[690,60],[760,216],[500,40],[230,190]].map(([cx,cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="1.5" fill="#8A8A87" opacity="0.25" />
          ))}
        </svg>
      </div>
    </div>
  )
}
