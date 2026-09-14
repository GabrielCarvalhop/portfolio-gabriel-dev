/** Four finite, illustrative sequences. Controls and text stay outside the artwork. */
export function ProcessGlyph({ phase }: { phase: number }) {
  return (
    <svg
      className={`process-glyph glyph-${phase}`}
      viewBox="0 0 144 90"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {phase === 0 && (
        <>
          <circle className="glyph-guide" cx="72" cy="45" r="32" />
          <circle className="glyph-guide" cx="72" cy="45" r="21" strokeDasharray="2 5" />
          <path className="glyph-guide" d="M28 45 H116 M72 5 V85" />
          <g className="discovery-sweep">
            <path
              d="M72 45 L72 13 A32 32 0 0 1 104 45 Z"
              fill="currentColor"
              fillOpacity=".12"
              stroke="none"
            />
            <path d="M72 45 V13" />
          </g>
          <circle className="discovery-point point-a" cx="86" cy="27" r="3" />
          <circle className="discovery-point point-b" cx="55" cy="44" r="3" />
          <circle className="discovery-point point-c" cx="83" cy="61" r="3" />
          <path className="discovery-target" d="M80 21 H92 V33 M92 21 H80 V33" />
        </>
      )}
      {phase === 1 && (
        <>
          <path className="glyph-guide" d="M24 65 H55 V24 H89 V65 H120" />
          <path className="structure-route" pathLength="1" d="M24 65 H55 V24 H89 V65 H120" />
          <rect className="structure-node node-a" x="14" y="55" width="20" height="20" rx="2" />
          <rect className="structure-node node-b" x="61" y="14" width="22" height="20" rx="2" />
          <rect className="structure-node node-c" x="110" y="55" width="20" height="20" rx="2" />
          <path
            className="glyph-guide"
            d="M19 61 H29 M19 67 H25 M66 21 H78 M66 27 H73 M115 61 H125 M115 67 H121"
          />
        </>
      )}
      {phase === 2 && (
        <>
          <path
            className="build-braces"
            d="M34 16 H27 V36 L20 45 L27 54 V74 H34 M110 16 H117 V36 L124 45 L117 54 V74 H110"
          />
          {[0, 1, 2].map((row) => (
            <g className={`build-module module-${row}`} key={row}>
              <rect x="45" y={18 + row * 20} width="54" height="14" rx="2" />
              <path
                className="glyph-guide"
                d={`M52 ${25 + row * 20} H57 M63 ${25 + row * 20} H91`}
              />
            </g>
          ))}
        </>
      )}
      {phase === 3 && (
        <>
          <circle className="glyph-guide" cx="72" cy="45" r="30" strokeDasharray="3 5" />
          <g className="delivery-orbit">
            <path d="M43 37 A30 30 0 0 1 94 24 M89 18 L96 24 L90 30 M101 53 A30 30 0 0 1 50 66 M55 72 L48 66 L54 60" />
            <circle cx="72" cy="15" r="3" fill="currentColor" stroke="none" />
          </g>
          <path className="delivery-check" pathLength="1" d="M61 45 L69 53 L84 37" />
          <path className="glyph-guide" d="M23 45 H33 M111 45 H121" />
        </>
      )}
    </svg>
  );
}
