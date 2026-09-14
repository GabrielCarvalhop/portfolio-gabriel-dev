'use client';

import { useState } from 'react';
import { ProcessGlyph } from '@/components/process-glyph';
import {
  ArrowRight,
  ArrowUpRight,
  Braces,
  Check,
  Database,
  GitBranch,
  Layers3,
  Monitor,
  Network,
} from 'lucide-react';

type StackGroup = { title: string; label: string; items: string[] };
const layers = [
  {
    icon: Monitor,
    code: 'interface',
    title: 'Da intenção à interação.',
    description:
      'Componentes, estados e navegação transformam o que o produto precisa em uma experiência que faz sentido para quem usa.',
    flow: ['Componentes', 'Estados', 'Experiência'],
  },
  {
    icon: Database,
    code: 'server',
    title: 'A lógica por trás de cada ação.',
    description:
      'Regras de negócio, APIs e persistência conectam a interface à operação. Cada dado tem um caminho e uma responsabilidade.',
    flow: ['Requisição', 'Regra de negócio', 'Dados'],
  },
];

export function StackWorkbench({
  groups,
  linkedTechnologies,
}: {
  groups: StackGroup[];
  linkedTechnologies: string[];
}) {
  const [active, setActive] = useState(0);
  const layer = layers[active];
  return (
    <div className="stack-workbench" data-active={active}>
      <div className="stack-grid">
        {groups.map((group, index) => {
          const Icon = layers[index].icon;
          return (
            <div className={`stack-group ${active === index ? 'is-active' : ''}`} key={group.label}>
              <button
                className="stack-layer-button"
                aria-pressed={active === index}
                aria-controls="stack-explanation"
                onClick={() => setActive(index)}
              >
                <Icon size={22} strokeWidth={1.4} aria-hidden="true" />
                <span>{group.label}</span>
                <span className="layer-port" aria-hidden="true" />
              </button>
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>
                    {linkedTechnologies.includes(item) ? (
                      <a
                        href={`/projetos?tech=${encodeURIComponent(item)}`}
                        aria-label={`${item}: ver projetos com esta tecnologia`}
                      >
                        <span>{item}</span>
                        <span className="stack-project-hint">
                          Ver projetos <ArrowUpRight size={14} />
                        </span>
                      </a>
                    ) : (
                      <span className="stack-static">{item}</span>
                    )}
                  </li>
                ))}
              </ul>
              <span className="layer-identifier" aria-hidden="true">
                &lt;{layers[index].code} /&gt;
              </span>
            </div>
          );
        })}
      </div>
      <div
        className="stack-explanation"
        id="stack-explanation"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="layer-description" key={active}>
          <h4>{layer.title}</h4>
          <p>{layer.description}</p>
        </div>
        <div className="layer-flow" aria-label={`Fluxo: ${layer.flow.join(', ')}`}>
          {layer.flow.map((label, index) => (
            <span key={label}>
              {index > 0 && <ArrowRight size={16} aria-hidden="true" />}
              <span>{label}</span>
            </span>
          ))}
        </div>
      </div>
      <p className="workbench-hint">
        Selecione uma camada para explorar. Nas tecnologias com seta, veja os projetos relacionados.
      </p>
    </div>
  );
}

const artifacts = [
  {
    name: 'Mapa do problema',
    icon: Network,
    detail: 'Um ponto de partida compartilhado.',
    items: [
      ['Contexto', 'Onde o produto vai existir'],
      ['Pessoas', 'Para quem estamos construindo'],
      ['Objetivo', 'O que precisa mudar'],
      ['Prioridades', 'O que vem primeiro'],
    ],
  },
  {
    name: 'Arquitetura do produto',
    icon: Layers3,
    detail: 'Partes que se conectam antes da implementação.',
    items: [
      ['Interface', 'Páginas, componentes e estados'],
      ['Aplicação', 'Fluxos e regras de negócio'],
      ['Dados', 'Modelos e relações'],
    ],
  },
  {
    name: 'Interface em construção',
    icon: Braces,
    detail: 'Pequenos ciclos de implementação e validação.',
    items: [
      ['Componentes', 'Estrutura e comportamento'],
      ['Interações', 'Feedback em cada ação'],
      ['Integrações', 'Interface e operação conectadas'],
    ],
  },
  {
    name: 'Checklist de entrega',
    icon: Check,
    detail: 'O que verificar antes do próximo ciclo.',
    items: [
      ['Experiência', 'Fluxos, teclado e dispositivos'],
      ['Performance', 'Carregamento e estabilidade'],
      ['Publicação', 'Configuração e validação'],
      ['Evolução', 'Ajustes e próximos passos'],
    ],
  },
];

export function ProcessWorkbench({ steps }: { steps: string[][] }) {
  const [active, setActive] = useState(0);
  const [replay, setReplay] = useState(0);
  const artifact = artifacts[active];
  const Icon = artifact.icon;
  return (
    <div className="process-workbench">
      <ol className="process-list process-card-grid" data-arrive>
        {steps.map(([title, description], index) => (
          <li key={title} className={active === index ? 'is-active' : ''}>
            <h3>
              <button
                aria-pressed={active === index}
                aria-controls="process-artifact"
                onClick={() => {
                  setActive(index);
                  setReplay((value) => value + 1);
                }}
              >
                <ProcessGlyph phase={index} key={active === index ? replay : 'idle'} />
                <span className="process-card-title">{title}</span>
                <span className="process-card-rail" aria-hidden="true" />
                <ArrowUpRight size={18} aria-hidden="true" />
              </button>
            </h3>
            <p>{description}</p>
          </li>
        ))}
      </ol>
      <div
        className="process-artifact"
        id="process-artifact"
        aria-live="polite"
        aria-atomic="true"
        data-phase={active}
      >
        <div className="artifact-toolbar">
          <span>Exemplo de entregável</span>
          <span>{steps[active][0]}</span>
        </div>
        <div className="artifact-sheet" key={active}>
          <div className="artifact-heading">
            <Icon size={32} strokeWidth={1.2} aria-hidden="true" />
            <h4>{artifact.name}</h4>
          </div>
          <p>{artifact.detail}</p>
          <p className="mobile-process-description">{steps[active][1]}</p>
          <dl>
            {artifact.items.map(([label, description]) => (
              <div key={label}>
                <dt>
                  <span aria-hidden="true" />
                  {label}
                </dt>
                <dd>{description}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="artifact-footer">
          <GitBranch size={15} aria-hidden="true" />
          <span>Entender. Construir. Aprender. Repetir.</span>
          <span className="artifact-progress" aria-hidden="true">
            {steps.map((_, index) => (
              <i key={index} data-complete={index <= active} />
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}
