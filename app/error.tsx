'use client';
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main id="main" className="container not-found">
      <span className="mono">UMA PAUSA INESPERADA</span>
      <h1>
        Não foi possível
        <br />
        carregar esta página.
      </h1>
      <p>Tente novamente para continuar explorando os projetos.</p>
      <button className="button button-primary" onClick={reset}>
        Tentar novamente
      </button>
    </main>
  );
}
