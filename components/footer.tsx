import Link from 'next/link';
import { ArrowUp, ArrowUpRight, ScanLine } from 'lucide-react';
import { site } from '@/data/site';
import { BrandMark } from '@/components/brand-mark';
export function Footer() {
  return (
    <footer className="closing-footer" id="rodape" data-arrive>
      <div className="container">
        <div className="closing-main">
          <div className="closing-identity">
            <Link href="/" className="closing-brand">
              <span className="closing-mark" aria-hidden="true">
                <BrandMark />
              </span>
              <span>
                Gabriel Carvalho<small>Developer / Product Builder</small>
              </span>
            </Link>
            <p>
              Design com intenção.
              <br />
              Código em cada detalhe.
            </p>
            <span className="closing-built">
              <span aria-hidden="true">&lt;/&gt;</span> Construído com Next.js
            </span>
          </div>
          <nav className="closing-nav" aria-label="Navegação do rodapé">
            <Link href="/projetos">
              Projetos <ArrowUpRight size={16} />
            </Link>
            <Link href="/#sobre">
              Sobre mim <ArrowUpRight size={16} />
            </Link>
            <Link href="/#stack">
              Minha stack <ArrowUpRight size={16} />
            </Link>
            {site.contacts.map((contact) => (
              <a href={contact.href} key={contact.label} target="_blank" rel="noopener noreferrer">
                {contact.label}
                <ArrowUpRight size={16} />
              </a>
            ))}
          </nav>
          <button
            className="closing-inspect"
            data-inspect-toggle
            data-depth
            aria-pressed="false"
            aria-labelledby="footer-inspect-action"
            aria-describedby="footer-inspect-description"
          >
            <span className="closing-diagram" aria-hidden="true">
              <svg viewBox="0 0 120 140" fill="none">
                <g className="closing-layer layer-back">
                  <path d="m14 45 55-25 37 21-55 25Z" />
                  <path d="M14 45v45l37 22 55-25V41M51 66v46" />
                </g>
                <g className="closing-layer layer-front">
                  <path d="m14 30 55-25 37 21-55 25Z" />
                  <path d="m28 29 18 10m6-20 19 10m7-21 14 8" />
                </g>
                <path className="closing-trace" pathLength="1" d="M51 112v15h54m-91-82v74h21" />
                <circle cx="106" cy="127" r="3" className="closing-terminal" />
              </svg>
            </span>
            <span className="closing-inspect-copy">
              <span className="closing-inspect-title">Além da superfície.</span>
              <span className="closing-inspect-description" id="footer-inspect-description">
                Explore as camadas
                <br />
                desta interface.
              </span>
              <span className="closing-inspect-action" id="footer-inspect-action">
                <ScanLine size={16} />
                <span className="inspect-off">Ver a construção</span>
                <span className="inspect-on">Sair da construção</span>
              </span>
            </span>
            <ArrowUpRight className="closing-inspect-arrow" size={20} aria-hidden="true" />
          </button>
        </div>
        <div className="closing-base">
          <span>© {new Date().getFullYear()} Gabriel Carvalho.</span>
          <a href="#top" className="closing-top">
            De volta ao início{' '}
            <span>
              <ArrowUp size={17} />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
