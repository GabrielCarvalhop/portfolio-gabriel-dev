'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { BrandMark } from '@/components/brand-mark';

const links = [
  { href: '/', label: 'Home' },
  { href: '/projetos', label: 'Projetos' },
  { href: '/#sobre', label: 'Sobre' },
  { href: '/#stack', label: 'Stack' },
  { href: '/#contato', label: 'Contato' },
];
export function Header({ seoEditor = false }: { seoEditor?: boolean }) {
  const navigation = seoEditor ? [...links, { href: '/configuracoes/seo', label: 'SEO' }] : links;
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState('');
  const toggle = useRef<HTMLButtonElement>(null);
  const mobileNav = useRef<HTMLElement>(null);
  const header = useRef<HTMLElement>(null);
  useEffect(() => {
    const update = () => {
      if (header.current) header.current.dataset.condensed = String(window.scrollY > 70);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  useEffect(() => {
    if (pathname !== '/') return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setSection(entry.target.id === 'home' ? '' : entry.target.id);
        });
      },
      { rootMargin: '-15% 0px -65% 0px' },
    );
    ['home', 'selecionados', 'sobre', 'stack', 'contato'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const background = Array.from(
      document.querySelectorAll<HTMLElement>('main, footer, .skip-link, .construction-note'),
    );
    const previousInert = background.map((element) => element.inert);
    background.forEach((element) => {
      element.inert = true;
    });
    mobileNav.current?.querySelector('a')?.focus();
    const desktop = window.matchMedia('(min-width: 768px)');
    const onResize = () => {
      if (desktop.matches) {
        setOpen(false);
        header.current?.querySelector<HTMLElement>('.brand')?.focus();
      }
    };
    desktop.addEventListener('change', onResize);
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        toggle.current?.focus();
      }
      if (event.key === 'Tab') {
        const nodes = [
          toggle.current,
          ...Array.from(mobileNav.current?.querySelectorAll<HTMLAnchorElement>('a') || []),
        ].filter(Boolean) as HTMLElement[];
        const current = nodes.indexOf(document.activeElement as HTMLElement);
        if (event.shiftKey && current === 0) {
          event.preventDefault();
          nodes.at(-1)?.focus();
        }
        if (!event.shiftKey && current === nodes.length - 1) {
          event.preventDefault();
          nodes[0]?.focus();
        }
      }
    }
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      background.forEach((element, index) => {
        element.inert = previousInert[index];
      });
      desktop.removeEventListener('change', onResize);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);
  const active = (href: string) =>
    href === '/configuracoes/seo'
      ? pathname === href
      : href === '/projetos'
        ? pathname.startsWith('/projetos') || (pathname === '/' && section === 'selecionados')
        : pathname === '/' && (href === '/' ? !section : href === `/#${section}`);
  return (
    <header className="header" ref={header}>
      <div className="reading-progress" aria-hidden="true" />
      <div className="container header-inner">
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          <span className="monogram" aria-hidden="true">
            <BrandMark />
          </span>
          <span className="brand-name">
            Gabriel Carvalho<span>Desenvolvedor & Product Builder</span>
          </span>
          <span className="sr-only">Página inicial</span>
        </Link>
        <nav className="desktop-nav" aria-label="Navegação principal">
          {navigation.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active(link.href) ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link className="header-cta" href="/#contato">
          Vamos conversar <ArrowUpRight size={15} />
        </Link>
        <button
          ref={toggle}
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <nav
        ref={mobileNav}
        id="mobile-navigation"
        className="mobile-nav"
        aria-label="Navegação móvel"
        hidden={!open}
        inert={!open}
      >
        {navigation.map((link, index) => (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active(link.href) ? 'page' : undefined}
            onClick={() => {
              setOpen(false);
              toggle.current?.focus();
            }}
            style={{ '--menu-index': index } as React.CSSProperties}
          >
            {link.label}
            <ArrowUpRight />
          </Link>
        ))}
        <p>
          Design com intenção.
          <br />
          Desenvolvimento com direção.
        </p>
      </nav>
    </header>
  );
}
