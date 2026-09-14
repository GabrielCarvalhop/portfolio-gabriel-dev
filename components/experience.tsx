'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';

/** Progressive behavior only: no content relies on this component to become visible. */
export function Experience() {
  const pathname = usePathname();
  const [inspect, setInspect] = useState(false);
  const returnFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    let frame = 0;
    let target: HTMLElement | null = null;
    let point = { x: 0, y: 0 };
    const reset = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      target?.style.removeProperty('--pointer-x');
      target?.style.removeProperty('--pointer-y');
      target?.removeAttribute('data-tracking');
      target = null;
    };
    const move = (event: PointerEvent) => {
      if (reduced.matches || !finePointer.matches || event.pointerType === 'touch') return;
      const next =
        event.target instanceof Element ? event.target.closest<HTMLElement>('[data-depth]') : null;
      if (target !== next) {
        reset();
        target = next;
      }
      if (!target) return;
      point = { x: event.clientX, y: event.clientY };
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        if (!target) return;
        const rect = target.getBoundingClientRect();
        target.style.setProperty(
          '--pointer-x',
          String(Math.max(-1, Math.min(1, ((point.x - rect.left) / rect.width - 0.5) * 2))),
        );
        target.style.setProperty(
          '--pointer-y',
          String(Math.max(-1, Math.min(1, ((point.y - rect.top) / rect.height - 0.5) * 2))),
        );
        target.dataset.tracking = 'true';
      });
    };
    document.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', reset);
    window.addEventListener('scroll', reset, { passive: true });
    window.addEventListener('blur', reset);
    reduced.addEventListener('change', reset);
    finePointer.addEventListener('change', reset);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 },
    );
    document.querySelectorAll('[data-arrive]').forEach((el) => observer.observe(el));
    return () => {
      reset();
      observer.disconnect();
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', reset);
      window.removeEventListener('scroll', reset);
      window.removeEventListener('blur', reset);
      reduced.removeEventListener('change', reset);
      finePointer.removeEventListener('change', reset);
    };
  }, [pathname]);

  useEffect(() => {
    function toggle(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;
      const button = event.target.closest<HTMLElement>('[data-inspect-toggle]');
      if (button) {
        returnFocus.current = button;
        setInspect((value) => !value);
      }
    }
    document.addEventListener('click', toggle);
    return () => document.removeEventListener('click', toggle);
  }, []);

  useEffect(() => {
    document.documentElement.toggleAttribute('data-inspect', inspect);
    document.querySelector('[data-inspect-toggle]')?.setAttribute('aria-pressed', String(inspect));
    const escape = (event: KeyboardEvent) => {
      if (
        event.key === 'Escape' &&
        inspect &&
        !document.querySelector('.menu-toggle[aria-expanded="true"]')
      ) {
        setInspect(false);
        returnFocus.current?.focus({ preventScroll: true });
      }
    };
    window.addEventListener('keydown', escape);
    return () => {
      window.removeEventListener('keydown', escape);
      document.documentElement.removeAttribute('data-inspect');
    };
  }, [inspect, pathname]);

  return inspect ? (
    <aside className="construction-note" aria-label="Modo construção">
      <div>
        <span className="mono">POR TRÁS DA INTERFACE</span>
        <p>As linhas revelam os blocos desta construção. Continue explorando.</p>
      </div>
      <button
        aria-label="Sair do modo construção"
        onClick={() => {
          setInspect(false);
          returnFocus.current?.focus({ preventScroll: true });
        }}
      >
        <X size={18} />
      </button>
      <span role="status" className="sr-only">
        Modo construção ativado. Pressione Escape para sair.
      </span>
    </aside>
  ) : null;
}
