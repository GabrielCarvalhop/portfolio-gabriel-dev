import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
export default function NotFound() {
  return (
    <main id="main" className="container not-found">
      <span className="error-code">
        404<span>_</span>
      </span>
      <h1>
        Este caminho ainda
        <br />
        não foi construído.
      </h1>
      <p>Você pode voltar ao início ou conhecer os projetos.</p>
      <div className="hero-actions">
        <Link className="button button-primary" href="/">
          Voltar ao início <ArrowUpRight size={18} />
        </Link>
        <Link className="text-link" href="/projetos">
          Explorar projetos
        </Link>
      </div>
    </main>
  );
}
