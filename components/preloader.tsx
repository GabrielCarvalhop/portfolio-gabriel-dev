'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

/** Plays once per browser session; safe to skip entirely (reduced motion, repeat loads). */
const SEEN_KEY = 'gc-intro-seen';
/** Dev replays it on every reload, otherwise it is unwatchable while working on it. */
const REPLAY_ALWAYS = process.env.NODE_ENV === 'development';

const LINES = [
  '> iniciando sistema',
  '> montando estrutura',
  '> renderizando interface',
  '> compilando produto',
  '> conectando experiência',
];
const CHECKS = ['estrutura', 'interface', 'produto'];
const SUCCESS_TEXT = 'BUILD SUCCESSFUL';

/** Survives the StrictMode remount, so the session gate below runs once per page load, not once per mount. */
let introStarted = false;

const BASE_DELAY = 150;
const STEP = 105;
const lineDelay = (index: number) => BASE_DELAY + index * STEP;
const successIndex = LINES.length + 1 + CHECKS.length;
const promptIndex = successIndex + 1;

/**
 * Monotonic but uneven: compiling moves in bursts and plateaus, never backwards.
 * Read as [elapsed fraction, completed fraction] and interpolated per frame.
 */
const PROGRESS_CURVE: [number, number][] = [
  [0, 0],
  [0.12, 0.17],
  [0.26, 0.21],
  [0.44, 0.48],
  [0.55, 0.53],
  [0.73, 0.86],
  [0.86, 0.9],
  [1, 1],
];
const PROGRESS_DURATION = lineDelay(successIndex);

function progressAt(t: number) {
  for (let i = 1; i < PROGRESS_CURVE.length; i += 1) {
    const [x1, y1] = PROGRESS_CURVE[i];
    if (t <= x1) {
      const [x0, y0] = PROGRESS_CURVE[i - 1];
      return y0 + ((y1 - y0) * (t - x0)) / (x1 - x0);
    }
  }
  return 1;
}

const HOLD_END = lineDelay(promptIndex) + 650;
/** Matches the panel transition in preloader.css: 140ms delay + 720ms travel. */
const EXIT_DURATION = 860;
const SCRAMBLE_CHARS = '01#/_-+<>[]•';

/**
 * Terminal-style decode: locks characters left to right instead of a plain fade-in.
 * Starts from the settled text so a throttled tab still shows the real word.
 */
function useScramble(text: string, startAt: number) {
  const [display, setDisplay] = useState(text);
  useEffect(() => {
    const frames = 9;
    let frame = 0;
    let interval: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        frame += 1;
        const settled = Math.round((frame / frames) * text.length);
        setDisplay(
          text
            .split('')
            .map((char, index) =>
              char === ' '
                ? ' '
                : index < settled
                  ? char
                  : SCRAMBLE_CHARS[(Math.random() * SCRAMBLE_CHARS.length) | 0],
            )
            .join(''),
        );
        if (frame >= frames) {
          setDisplay(text);
          clearInterval(interval);
        }
      }, 26);
    }, startAt);
    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [text, startAt]);
  return display;
}

/** Fragments that converge into the mark as it draws; positions are fixed for deterministic SSR. */
const PIXELS: [number, number][] = [
  [-46, -30],
  [40, -38],
  [-58, 6],
  [54, 2],
  [-30, 40],
  [36, 46],
  [-14, -50],
  [18, 52],
  [-64, -8],
  [60, -14],
  [-8, 58],
  [8, -60],
];

type Phase = 'boot' | 'exiting' | 'done';

export function Preloader() {
  const [phase, setPhase] = useState<Phase>('boot');
  const counter = useRef<HTMLElement>(null);
  const success = useScramble(SUCCESS_TEXT, lineDelay(successIndex));

  useLayoutEffect(() => {
    if (!introStarted) {
      let skip = false;
      try {
        skip =
          window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
          (!REPLAY_ALWAYS && sessionStorage.getItem(SEEN_KEY) === '1');
      } catch {
        skip = false;
      }
      if (skip) {
        // Browser-only gate: SSR always renders the boot phase, so this has to correct
        // it client-side before paint. A lazy useState initializer would run during SSR
        // too (no window) and mismatch hydration, so this can't move out of the effect.
        setPhase('done');
        return;
      }
      try {
        sessionStorage.setItem(SEEN_KEY, '1');
      } catch {
        /* private browsing: replaying the intro once more is an acceptable fallback */
      }
      introStarted = true;
    }
    document.body.style.overflow = 'hidden';
    const timer = setTimeout(() => setPhase('exiting'), HOLD_END);
    return () => clearTimeout(timer);
  }, []);

  // Counts per frame straight into the DOM: stepping between fixed values reads as a
  // stalled counter, and putting it in state would re-render the whole overlay each frame.
  useEffect(() => {
    if (phase !== 'boot') return;
    const node = counter.current;
    if (!node) return;
    const start = performance.now();
    let frame = requestAnimationFrame(function tick(now) {
      const elapsed = Math.min(1, (now - start) / PROGRESS_DURATION);
      node.textContent = String(Math.round(progressAt(elapsed) * 100));
      if (elapsed < 1) frame = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(frame);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'exiting') return;
    const timer = setTimeout(() => {
      setPhase('done');
      document.body.style.overflow = '';
    }, EXIT_DURATION);
    return () => clearTimeout(timer);
  }, [phase]);

  useEffect(() => () => {
    document.body.style.overflow = '';
  }, []);

  if (phase === 'done') return null;

  return (
    <div className="preloader" data-phase={phase} aria-hidden="true">
      <div className="preloader-panel panel-top" />
      <div className="preloader-panel panel-bottom" />
      <div className="preloader-grid" />
      <div className="preloader-scanline" />
      <span className="preloader-coordinate mono">ESTRUTURA → INTERFACE → PRODUTO</span>
      <div className="preloader-content">
        <div className="preloader-mark">
          <svg viewBox="0 0 100 80" fill="none" aria-hidden="true">
            <path
              className="preloader-mark-path"
              d="M44 23H25L14 34V50L25 61H44V43H33M86 23H69L58 34V50L69 61H86"
              stroke="#f1f2ed"
              strokeWidth="7"
              strokeLinecap="square"
              strokeLinejoin="miter"
              pathLength="240"
            />
          </svg>
          <span className="preloader-pixels">
            {PIXELS.map(([x, y], index) => (
              <i
                key={`${x}-${y}`}
                style={{ '--x': `${x}px`, '--y': `${y}px`, '--i': index } as React.CSSProperties}
              />
            ))}
          </span>
        </div>
        <span className="preloader-readout mono">
          <b ref={counter}>0</b>
          <small>%</small>
        </span>
        <div className="preloader-terminal mono">
          {LINES.map((line, index) => (
            <div className="preloader-line" style={{ '--i': index } as React.CSSProperties} key={line}>
              {line}
            </div>
          ))}
          <div
            className="preloader-line preloader-gap"
            style={{ '--i': LINES.length } as React.CSSProperties}
          >
            {'> build --production'}
          </div>
          {CHECKS.map((label, index) => (
            <div
              className="preloader-line preloader-check"
              style={{ '--i': LINES.length + 1 + index } as React.CSSProperties}
              key={label}
            >
              <i className="preloader-tick" /> {label}
            </div>
          ))}
          <div
            className="preloader-line preloader-success"
            style={{ '--i': successIndex } as React.CSSProperties}
          >
            {success}
          </div>
          <div
            className="preloader-line preloader-prompt"
            style={{ '--i': promptIndex } as React.CSSProperties}
          >
            gabriel@portfolio:~$ <i className="preloader-caret" />
          </div>
        </div>
      </div>
      <span className="sr-only" role="status">
        Carregando o portfólio de Gabriel Carvalho.
      </span>
    </div>
  );
}
