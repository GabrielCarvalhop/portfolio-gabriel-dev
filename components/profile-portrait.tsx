'use client';

import Image from 'next/image';
import { useEffect, useRef, type CSSProperties } from 'react';
import './profile-portrait-motion.css';

// Deterministic positions keep the server and client output identical.
const fragments = Array.from({ length: 60 }, (_, index) => {
  const row = Math.floor(index / 6);
  const column = index % 6;
  return {
    '--tile-delay': `${260 + row * 83 + ((column * 37 + row * 19) % 160)}ms`,
    '--pixel-x': `${18 + ((index * 23) % 64)}%`,
    '--pixel-y': `${12 + ((index * 31) % 70)}%`,
  } as CSSProperties;
});
const copy = ['Por trás de cada projeto', 'Gabriel Carvalho.', 'Desenvolvedor & Product Builder'];
const glyphs = '<>/{}[]01:;_';

export function ProfilePortrait() {
  const card = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = card.current;
    if (!element) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let disposed = false;
    let started = false;
    let visible = false;
    let ready = false;
    let finishTimer: ReturnType<typeof setTimeout> | undefined;
    let decodeTimer: ReturnType<typeof setInterval> | undefined;
    let loadTimer: ReturnType<typeof setTimeout> | undefined;
    const image = element.querySelector('img');
    const clearTimers = () => {
      clearTimeout(finishTimer);
      clearTimeout(loadTimer);
      clearInterval(decodeTimer);
    };
    const finish = () => {
      started = true;
      clearTimers();
      observer?.disconnect();
      element.dataset.render = 'complete';
      element.querySelectorAll('[data-cipher]').forEach((node) => {
        node.textContent = '';
      });
    };
    const start = () => {
      if (!visible || !ready || started || disposed || reduced.matches) return;
      started = true;
      clearTimeout(loadTimer);
      observer?.disconnect();
      element.dataset.render = 'running';
      const begin = performance.now();
      const labels = element.querySelectorAll<HTMLElement>('[data-cipher]');
      // Only the short decoding tail changes text; the image itself stays in CSS.
      decodeTimer = setInterval(() => {
        const elapsed = performance.now() - begin;
        labels.forEach((label, index) => {
          const progress = (elapsed - (1430 + index * 170)) / 370;
          if (progress < 0 || progress >= 1) {
            label.textContent = '';
            return;
          }
          label.textContent = Array.from(copy[index], (char, position) => {
            if (char === ' ') return char;
            return position < copy[index].length * progress
              ? char
              : glyphs[(position * 7 + Math.floor(elapsed / 55)) % glyphs.length];
          }).join('');
        });
      }, 55);
      finishTimer = setTimeout(finish, 2300);
    };
    const loaded = () => {
      if (!image || disposed) return;
      image
        .decode()
        .catch(() => undefined)
        .then(() => {
          if (disposed) return;
          ready = image.naturalWidth > 0;
          if (ready) start();
          else finish();
        });
    };
    const onPreference = () => {
      if (reduced.matches) finish();
    };
    const onVisibility = () => {
      if (document.hidden && started) finish();
    };
    if (reduced.matches || !('IntersectionObserver' in window)) return;
    element.dataset.render = 'waiting';
    image?.addEventListener('load', loaded);
    image?.addEventListener('error', finish);
    if (image?.complete) loaded();
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        visible = entry.isIntersecting && entry.intersectionRatio >= 0.35;
        if (!visible) {
          clearTimeout(loadTimer);
          return;
        }
        // Hidden reveal layers can defer native lazy loading. Request the image
        // only once the portrait is meaningfully visible, before starting the scan.
        if (image) image.loading = 'eager';
        start();
        // A slow/failed image must never leave the caption hidden indefinitely.
        if (!ready) loadTimer = setTimeout(finish, 2500);
      },
      { threshold: [0, 0.35], rootMargin: '-70px 0px 0px' },
    );
    observer.observe(element);
    reduced.addEventListener('change', onPreference);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      disposed = true;
      clearTimers();
      observer?.disconnect();
      image?.removeEventListener('load', loaded);
      image?.removeEventListener('error', finish);
      reduced.removeEventListener('change', onPreference);
      document.removeEventListener('visibilitychange', onVisibility);
      delete element.dataset.render;
    };
  }, []);

  return (
    <figure className="profile-portrait portrait-assembly" ref={card}>
      <div className="profile-portrait-image">
        <Image
          src="/images/profile/gabriel-carvalho.png"
          alt="Retrato de Gabriel Carvalho"
          fill
          sizes="(max-width: 767px) 150vw, (max-width: 1023px) 70vw, 960px"
          quality={90}
        />
      </div>
      <div className="portrait-render-effects" aria-hidden="true">
        <div className="portrait-tiles">
          {fragments.map((style, index) => (
            <i key={index} style={style} />
          ))}
        </div>
        <svg className="portrait-wire" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
          <path
            pathLength="1"
            d="M8 12H34L52 28H90M8 12V43L30 63V90M34 12V36L68 62H94M8 43H45L68 62V90M30 63H68M52 28V74L82 90"
          />
          {[
            [8, 12],
            [34, 12],
            [52, 28],
            [8, 43],
            [30, 63],
            [68, 62],
            [82, 90],
          ].map(([x, y]) => (
            <rect key={`${x}-${y}`} x={x - 0.5} y={y - 0.5} width="1" height="1" />
          ))}
        </svg>
        <span className="portrait-code code-a">{'init(profile);'}</span>
        <span className="portrait-code code-b">{'decode → texture'}</span>
        <span className="portrait-code code-c">{'compose();'}</span>
        <div className="portrait-scan" />
        <div className="portrait-render-edge" />
      </div>
      <figcaption>
        <span
          className="profile-portrait-label portrait-decode"
          style={{ '--copy-delay': '1430ms' } as CSSProperties}
        >
          <span className="portrait-copy">Por trás de cada projeto</span>
          <span className="portrait-cipher" data-cipher aria-hidden="true" />
        </span>
        <strong className="portrait-decode" style={{ '--copy-delay': '1600ms' } as CSSProperties}>
          <span className="portrait-copy">
            Gabriel Carvalho<span>.</span>
          </span>
          <span className="portrait-cipher" data-cipher aria-hidden="true" />
        </strong>
        <span className="portrait-decode" style={{ '--copy-delay': '1770ms' } as CSSProperties}>
          <span className="portrait-copy">Desenvolvedor & Product Builder</span>
          <span className="portrait-cipher" data-cipher aria-hidden="true" />
        </span>
      </figcaption>
      <span className="portrait-hover-edge" aria-hidden="true" />
    </figure>
  );
}
