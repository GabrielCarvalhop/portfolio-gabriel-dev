'use client';

import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

const lanes = [
  'M-100 40H420L780 230H1100',
  'M-100 560H460L820 370H1100',
  'M650-100V50L960 230H1100',
  'M690 700V550L980 370H1100',
  'M1550 30H1330L1160 230H1100',
  'M1550 590H1330L1160 370H1100',
];

export function ContactAtmosphere() {
  const root = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    let visible = false;
    const update = () => {
      element.dataset.running = String(visible && !document.hidden);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    observer.observe(element);
    document.addEventListener('visibilitychange', update);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', update);
    };
  }, []);

  return (
    <>
      <div
        className="contact-atmosphere"
        ref={root}
        data-running="false"
        data-paused={paused}
        aria-hidden="true"
      >
        <svg viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice" fill="none">
          <g className="data-lanes">
            {lanes.map((d) => (
              <path key={d} d={d} />
            ))}
          </g>
          <g className="data-packets">
            {lanes.map((d, i) => (
              <path key={d} d={d} pathLength="1000" style={{ animationDelay: `${i * -1.3}s` }} />
            ))}
          </g>
          {Array.from({ length: 6 }, (_, i) => (
            <g key={i} className="data-gate" style={{ animationDelay: `${i * -3}s` }}>
              <path d="M760 35H1320L1435 150V450L1320 565H760L645 450V150Z" />
              <path
                className="gate-corners"
                d="M760 35H815M1265 35H1320L1435 150V195M1435 405V450L1320 565H1265M815 565H760L645 450V405M645 195V150L760 35"
              />
            </g>
          ))}
          <g className="data-core">
            <path d="M1080 265H1120L1145 290V310L1120 335H1080L1055 310V290Z" />
            <path d="M1090 290L1080 300L1090 310M1110 290L1120 300L1110 310M1104 285L1096 315" />
          </g>
        </svg>
      </div>
      <button
        className="contact-motion-toggle"
        onClick={() => setPaused((value) => !value)}
        aria-pressed={paused}
      >
        {paused ? <Play size={13} /> : <Pause size={13} />}
        {paused ? 'Retomar animação' : 'Pausar animação'}
      </button>
    </>
  );
}
