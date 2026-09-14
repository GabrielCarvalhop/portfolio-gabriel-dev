'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Layers3,
  MousePointer2,
  Plus,
  Pause,
  Play,
  Code2,
} from 'lucide-react';
import { DeveloperBackdrop } from '@/components/developer-backdrop';

const stages = ['Estrutura', 'Interface', 'Produto'];
const stageNotes = [
  'Hierarquia, espaços e relações.',
  'Forma, contraste e intenção.',
  'Interface + dados + experiência.',
];
export function Hero() {
  const [stage, setStage] = useState(2);
  const [paused, setPaused] = useState(false);
  return (
    <section id="home" className="hero container" data-inspect-label="Hero / composição">
      <DeveloperBackdrop paused={paused} />
      <div className="hero-copy">
        <div className="availability">
          <span /> Independente por escolha. Próximo do seu negócio.
        </div>
        <h1>
          Do primeiro
          <br />
          traço ao
          <br />
          <span>próximo produto.</span>
        </h1>
        <p>
          Design que faz sentido. Código que sustenta.
          <br className="desktop-break" /> Desenvolvo sites e sistemas sob medida, conectando a
          experiência de quem usa ao que o negócio precisa.
        </p>
        <div className="hero-actions">
          <Link className="button button-primary" href="/projetos">
            Explorar projetos <ArrowUpRight size={18} />
          </Link>
          <Link className="text-link" href="#sobre">
            Conheça meu trabalho <ArrowDown size={16} />
          </Link>
        </div>
        <div className="hero-role">
          <span className="small-cross">+</span> Gabriel Carvalho <span className="role-line" /> Web
          Developer & Product Builder
        </div>
        <div className="code-console" aria-hidden="true">
          <div className="code-console-bar">
            <Code2 size={14} />
            <span>hero.tsx</span>
            <span>React · TypeScript</span>
          </div>
          <div className="code-console-source" key={stage}>
            <code>
              <span className="code-function">setStage</span>(
              <span className="code-value">{stage}</span>);{' '}
              <span className="code-comment">
                {'// '}
                {stages[stage].toLowerCase()}
              </span>
              <i className="code-caret" />
            </code>
            <code className="code-comment">
              {'// '}
              {stageNotes[stage]}
            </code>
          </div>
        </div>
      </div>
      <div className={`hero-art stage-${stage}`} data-depth>
        <div className="construction-grid" aria-hidden="true" />
        <span className="art-coordinate mono">IDEIA → INTERFACE → PRODUTO</span>
        <div className="art-corner corner-one" aria-hidden="true">
          <Plus size={14} />
        </div>
        <div className="art-corner corner-two" aria-hidden="true">
          <Plus size={14} />
        </div>
        <div className="wire-layer" aria-hidden="true">
          <div>
            <span>NAVEGAÇÃO</span>
          </div>
          <div>
            <span>CONTEÚDO</span>
            <i />
            <i />
            <i />
          </div>
          <div>
            <span>AÇÃO</span>
            <i />
          </div>
          <span>layout / 12 col</span>
        </div>
        <div className="plane-marker" aria-hidden="true">
          <i />
          {stages[stage]}
        </div>
        <div className="product-window" aria-hidden="true">
          <div className="window-bar">
            <span className="window-dots">
              <i />
              <i />
              <i />
            </span>
            <span>produto / visão geral</span>
            <span className="window-mark">↗</span>
          </div>
          <div className="window-body">
            <aside>
              <span className="mini-logo">
                a<span>.</span>
              </span>
              <div className="side-icon selected" />
              <div className="side-icon" />
              <div className="side-icon" />
              <div className="side-icon" />
              <span className="side-bottom">GC</span>
            </aside>
            <div className="window-content">
              <div className="dashboard-heading">
                <div>
                  <small>SEU NEGÓCIO, EM MOVIMENTO</small>
                  <h3>Uma visão. Tudo conectado.</h3>
                </div>
                <span className="mini-avatar">G</span>
              </div>
              <div className="mini-metrics">
                <div>
                  <span>Vendas</span>
                  <strong>
                    R$ 4.280<span>,00</span>
                  </strong>
                  <small>Dados ilustrativos</small>
                </div>
                <div>
                  <span>Pedidos</span>
                  <strong>32</strong>
                  <small>Visão da operação</small>
                </div>
              </div>
              <div className="chart-title">
                <span>Movimento da semana</span>
                <small>7 dias</small>
              </div>
              <div className="mini-chart">
                {[34, 52, 42, 73, 58, 86, 100].map((height, index) => (
                  <div key={index}>
                    <i style={{ height: `${height}%` }} />
                    <span>{['S', 'T', 'Q', 'Q', 'S', 'S', 'D'][index]}</span>
                  </div>
                ))}
              </div>
              <div className="window-bottom">
                <span>
                  <i /> Tudo no seu lugar.
                </span>
                <span>Ver operação ↗</span>
              </div>
            </div>
          </div>
        </div>
        <div className="floating-spec" aria-hidden="true">
          <Layers3 size={19} />
          <div>
            <strong>Feito para o contexto.</strong>
            <span>Interface + dados + experiência</span>
          </div>
          <Check size={15} />
        </div>
        <div className="cursor-label" aria-hidden="true">
          <MousePointer2 size={24} fill="currentColor" />
          <span>Gabriel / builder</span>
        </div>
        <div className="art-caption">
          <span className="mono">UMA IDEIA, TRÊS CAMADAS</span>
          <div className="stage-controls" role="group" aria-label="Camadas da composição">
            {stages.map((label, index) => (
              <button key={label} aria-pressed={stage === index} onClick={() => setStage(index)}>
                {label}
              </button>
            ))}
          </div>
        </div>
        <p className="stage-explanation" key={stage}>
          {stageNotes[stage]}
        </p>
        <span className="sr-only" role="status">
          Camada selecionada: {stages[stage]}. Composição ilustrativa de uma interface, sem dados
          reais.
        </span>
      </div>
      <div className="hero-bottom">
        <span>ESTRATÉGIA NO INÍCIO. CUIDADO ATÉ O FIM.</span>
        <button
          className="background-toggle"
          onClick={() => setPaused((value) => !value)}
          aria-pressed={paused}
        >
          {paused ? <Play size={13} /> : <Pause size={13} />}
          {paused ? 'Retomar fundo' : 'Pausar fundo'}
        </button>
        <a href="#selecionados">
          Role para explorar <ArrowDown size={14} />
        </a>
      </div>
    </section>
  );
}
