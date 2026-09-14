import { Braces, Database, Layers3 } from 'lucide-react';
import { BrandMark } from '@/components/brand-mark';

export function ProfileBlueprint() {
  return (
    <figure
      className="profile-blueprint"
      data-arrive
      data-depth
      aria-label="Design, código e produto conectados no trabalho de Gabriel Carvalho"
    >
      <div className="blueprint-frame" aria-hidden="true">
        <svg className="blueprint-traces" viewBox="0 0 460 460" fill="none">
          <path
            className="blueprint-track"
            d="M75 78 H155 L230 155 V230 M385 78 H305 L230 155 M230 230 V305 L110 370 M230 305 L350 370"
          />
          <path
            className="blueprint-signal"
            pathLength="1"
            d="M75 78 H155 L230 155 V230 M385 78 H305 L230 155 M230 230 V305 L110 370 M230 305 L350 370"
          />
          <circle cx="230" cy="230" r="92" />
          <circle cx="230" cy="230" r="112" strokeDasharray="2 10" />
          <path d="M15 45 V15 H45 M415 15 H445 V45 M445 415 V445 H415 M45 445 H15 V415" />
        </svg>
        <span className="blueprint-node node-design">
          <Layers3 size={20} />
          Design
        </span>
        <span className="blueprint-node node-code">
          <Braces size={20} />
          Código
        </span>
        <span className="blueprint-core monogram">
          <BrandMark />
        </span>
        <span className="blueprint-node node-ui">
          <span className="blueprint-code">&lt;ui /&gt;</span>Interfaces
        </span>
        <span className="blueprint-node node-data">
          <Database size={20} />
          Sistemas
        </span>
        <span className="blueprint-cross cross-a">+</span>
        <span className="blueprint-cross cross-b">+</span>
      </div>
      <figcaption>
        <span>Design + engenharia</span>
        <span>Um produto por inteiro.</span>
      </figcaption>
    </figure>
  );
}
