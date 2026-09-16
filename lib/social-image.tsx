import { ImageResponse } from 'next/og';
import { BrandMark } from '@/components/brand-mark';
export function socialImage(title: string, detail = 'Developer & Product Builder') {
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        background: '#090b0e',
        color: '#f4f6f8',
        padding: '62px 72px',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <BrandMark width={76} height={61} />
        <span style={{ fontSize: 20, color: '#929ba5' }}>DESIGN + CÓDIGO + PRODUTO</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 25 }}>
        <div
          style={{
            fontSize: title.length > 65 ? 40 : title.length > 38 ? 54 : 72,
            fontWeight: 600,
            letterSpacing: '-1.5px',
            lineHeight: 1.05,
            maxWidth: 1020,
            wordBreak: 'break-all',
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: detail.length > 160 ? 21 : 27,
            lineHeight: 1.35,
            color: '#929ba5',
            maxWidth: 1020,
            wordBreak: 'break-all',
          }}
        >
          {detail}
        </div>
      </div>
      <div style={{ display: 'flex', height: 2, background: '#252c35' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18 }}>
        <span>Do primeiro traço ao próximo produto.</span>
        <span style={{ color: '#5b8cff' }}>GABRIEL CARVALHO ↗</span>
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
