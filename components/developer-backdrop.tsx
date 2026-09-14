'use client';

import { useEffect, useRef } from 'react';

const routes = [
  'M-80 180 H180 L280 280 H640 L800 120 H1440',
  'M-80 700 H240 L380 560 H690 L870 740 H1440',
  'M460 -80 V80 L640 260 V480 L820 660 V980',
  'M1040 -80 V170 L880 330 V570 L1070 760 H1440',
  'M-80 380 H80 L240 220 H420 L640 440 H1100 L1280 260 H1440',
  'M240 980 V820 L460 600 H820 L1030 390 H1440',
];

/** SVG paths keep the scene sharp without a canvas render loop. */
export function DeveloperBackdrop({ paused }: { paused: boolean }) {
  const root = useRef<HTMLDivElement>(null);
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
    <div
      ref={root}
      className="developer-backdrop"
      data-running="false"
      data-paused={paused}
      aria-hidden="true"
    >
      <div className="developer-matrix" />
      <div className="developer-horizon" />
      <svg
        className="developer-circuit"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <g className="circuit-wires">
          {routes.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
        <g className="circuit-signals">
          {routes.map((d, index) => (
            <path key={d} d={d} pathLength="1000" style={{ animationDelay: `${index * -2.7}s` }} />
          ))}
        </g>
        <g className="circuit-nodes">
          {[
            [280, 280],
            [690, 560],
            [640, 440],
            [880, 330],
            [820, 600],
            [1030, 390],
          ].map(([cx, cy]) => (
            <g key={`${cx}-${cy}`}>
              <circle cx={cx} cy={cy} r="5" />
              <circle cx={cx} cy={cy} r="1.5" fill="currentColor" />
            </g>
          ))}
        </g>
        <g className="circuit-source">
          <text x="930" y="145">
            {'{ }'}
          </text>
          <text x="1100" y="800">
            {'</>'}
          </text>
        </g>
      </svg>
    </div>
  );
}
