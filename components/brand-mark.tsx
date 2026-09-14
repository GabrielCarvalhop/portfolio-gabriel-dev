/** Geometric GC signature. Keep app/icon.svg in sync with these paths. */
export function BrandMark({
  width = '100%',
  height = '100%',
}: {
  width?: number | string;
  height?: number | string;
}) {
  return (
    <svg
      className="gc-signature"
      width={width}
      height={height}
      viewBox="0 0 100 80"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M44 23H25L14 34V50L25 61H44V43H33M86 23H69L58 34V50L69 61H86"
        stroke="#f1f2ed"
        strokeWidth="7"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}
